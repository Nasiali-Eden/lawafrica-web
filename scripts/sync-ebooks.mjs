// Rebuilds the eBook data from the digital store.
//
//   npm run sync:ebooks            write src/data/ebooks.generated.json
//   npm run sync:ebooks -- --check report the differences, write nothing
//
// eBooks are not in the print catalogue's API. They are sold from
// digital.lawafrica.com, a separate storefront whose covers and files are
// served by Snapplify (lawafricapublishingltd). That storefront has no JSON
// API, so this reads its public pages: the paginated listing for every title,
// then each title's detail page for category, format, edition, description
// and copyright holders.
//
// ISBNs appear in the source (in image names and on detail pages) and are
// deliberately not kept: ISBN is out of scope for this site.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://digital.lawafrica.com';
const OUT = fileURLToPath(new URL('../src/data/ebooks.generated.json', import.meta.url));
const CHECK = process.argv.includes('--check');

async function getText(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.text();
    } catch (err) {
      if (attempt === 3) throw new Error(`${url}: ${err.message}`);
      await new Promise(r => setTimeout(r, 500 * attempt));
    }
  }
}

const decode = s => s
  .replace(/&amp;/g, '&').replace(/&#0?39;|&apos;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const text = html => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const money = s => Number(s.replace(/[^0-9.]/g, ''));

// --- listing -------------------------------------------------------------
function parseListing(html) {
  const rows = [];
  for (const card of html.split('<div class="product-card">').slice(1)) {
    const id = card.match(/\/products\/(\d+)"/)?.[1];
    const title = card.match(/class="product-title">([\s\S]*?)<\/h3>/)?.[1];
    const price = card.match(/class="product-price">([\s\S]*?)<\/span>/)?.[1];
    const cover = card.match(/<img src="([^"]+)"/)?.[1] || '';
    if (!id || !title || !price) throw new Error('unparseable product card: ' + card.slice(0, 200));
    rows.push({ id: Number(id), title: text(title), unit: money(text(price)), cover });
  }
  return rows;
}

const first = await getText(`${ORIGIN}/products`);
const lastPage = Math.max(...[...first.matchAll(/products\?page=(\d+)/g)].map(m => Number(m[1])), 1);
const listing = parseListing(first);
for (let page = 2; page <= lastPage; page++) listing.push(...parseListing(await getText(`${ORIGIN}/products?page=${page}`)));

// --- detail --------------------------------------------------------------
function field(body, label) {
  const m = body.match(new RegExp(label + ':[ \t]*\n?[ \t]*([^\n]*)'));
  return m ? m[1].trim() : '';
}

async function detail(row) {
  const html = await getText(`${ORIGIN}/products/${row.id}`);
  // flatten to lines so "Label: value" pairs can be read off
  const flat = decode(html.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<\/(div|li|p|h\d|span|tr)>/g, '\n').replace(/<[^>]*>/g, ' '))
    .replace(/[ \t]+/g, ' ').replace(/\n\s*/g, '\n');
  const desc = flat.match(/\nDescription\n([\s\S]*?)\n(Additional Information|Related Products)/)?.[1];
  const copyright = field(flat, 'Copyright');
  return {
    ...row,
    code: String(row.id),
    price: 'KES ' + row.unit.toLocaleString('en-KE', { minimumFractionDigits: row.unit % 1 ? 2 : 0 }),
    category: field(flat, 'Category'),
    format: field(flat, 'Format'),
    language: field(flat, 'Language'),
    edition: field(flat, 'Edition'),
    description: desc ? desc.replace(/\s+/g, ' ').trim() : '',
    authors: copyright.split(';').map(s => s.trim()).filter(a => a && !/^lawafrica( publishing)?$/i.test(a)),
    url: `${ORIGIN}/products/${row.id}`
  };
}

const ebooks = new Array(listing.length);
let next = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (next < listing.length) {
    const i = next++;
    ebooks[i] = await detail(listing[i]);
  }
}));

const ids = ebooks.map(e => e.id);
if (new Set(ids).size !== ids.length) throw new Error('duplicate product ids in listing');
if (!ebooks.length) throw new Error('no products found — the storefront markup may have changed');

let previous = [];
try { previous = JSON.parse(await readFile(OUT, 'utf8')).ebooks; } catch { /* first run */ }
const was = new Map(previous.map(e => [e.id, e]));
const now = new Map(ebooks.map(e => [e.id, e]));
const added = ebooks.filter(e => !was.has(e.id));
const removed = previous.filter(e => !now.has(e.id));
const changed = ebooks.filter(e => {
  const o = was.get(e.id);
  return o && ['title', 'unit', 'cover', 'description', 'edition'].some(k => o[k] !== e[k]);
});

console.log(`Digital store: ${ebooks.length} titles over ${lastPage} pages`);
console.log(`  with a description  ${ebooks.filter(e => e.description).length}`);
console.log(`  with named authors  ${ebooks.filter(e => e.authors.length).length}`);
console.log(`  categories          ${[...new Set(ebooks.map(e => e.category).filter(Boolean))].join(', ') || '(none)'}`);
console.log(`Against ${previous.length} in the data file: +${added.length} new, -${removed.length} gone, ${changed.length} changed`);

if (CHECK) {
  console.log('--check: nothing written.');
} else {
  await writeFile(OUT, JSON.stringify({ source: ORIGIN + '/products', fetchedAt: new Date().toISOString(), ebooks }, null, 2) + '\n');
  console.log('Wrote ' + OUT);
}
