// Rebuilds the book data from the live LawAfrica catalogue.
//
//   npm run sync:books            write src/data/books.generated.json
//   npm run sync:books -- --check report the differences, write nothing
//
// The source is the public Botble API (no login):
//   /api/v1/ecommerce/products              every product, 24 per page
//   /api/v1/ecommerce/products?categories[]=<id>   which ids sit in a category
//
// What it writes is exactly what that API returns, and nothing else. Fields
// the API does not carry (author, edition, jurisdiction, synopsis) are not
// invented here; they are written as empty strings so the front end can leave
// them out. See docs/INTEGRATION.md §4 and §8.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://www.lawafrica.com';
const API = ORIGIN + '/api/v1/ecommerce';
const OUT = fileURLToPath(new URL('../src/data/books.generated.json', import.meta.url));
const CHECK = process.argv.includes('--check');

// Law Books is category 3. Law Ebooks (category 7) is deliberately left out:
// eBooks are sold from the digital store and synced by sync-ebooks.mjs, so the
// print catalogue must not carry them.
const PRINT_CATEGORY = 3;
const EBOOK_CATEGORY = 7;

async function getJson(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return await res.json();
    } catch (err) {
      if (attempt === 3) throw new Error(`${url}: ${err.message}`);
      await new Promise(r => setTimeout(r, 500 * attempt));
    }
  }
}

// per_page is ignored by the API, so walk the pages.
async function allProducts(query = '') {
  const first = await getJson(`${API}/products?page=1${query}`);
  const rows = [...first.data];
  for (let page = 2; page <= first.meta.last_page; page++) {
    rows.push(...(await getJson(`${API}/products?page=${page}${query}`)).data);
  }
  if (rows.length !== first.meta.total) {
    throw new Error(`expected ${first.meta.total} products, read ${rows.length}`);
  }
  return rows;
}

const display = p => p.price_formatted.replace(/\.00\s*$/, '').trim();
const cover = url => (url ? url.replace(/-\d+x\d+(\.\w+)$/, '$1') : '');

const categories = (await getJson(`${API}/product-categories`)).data;
const inPrint = new Set((await allProducts(`&categories[]=${PRINT_CATEGORY}`)).map(p => p.id));
const isEbook = new Set((await allProducts(`&categories[]=${EBOOK_CATEGORY}`)).map(p => p.id));

const products = (await allProducts()).filter(p => !isEbook.has(p.id));
const books = products.map(p => ({
  id: p.id,
  code: p.slug,
  title: p.name,
  price: display(p),
  unit: p.price,
  stock: p.stock_status_label,
  format: 'Print',
  // A title in neither category is still sold in the bookshop; it is listed
  // and flagged so the category can be fixed upstream.
  categorised: inPrint.has(p.id),
  cover: cover(p.image_url),
  author: '',
  edline: '',
  juris: ''
}));

const dupes = books.map(b => b.code).filter((c, i, a) => a.indexOf(c) !== i);
if (dupes.length) throw new Error('duplicate slugs: ' + dupes.join(', '));

let previous = [];
try { previous = JSON.parse(await readFile(OUT, 'utf8')).books; } catch { /* first run */ }
const was = new Map(previous.map(b => [b.code, b]));
const now = new Map(books.map(b => [b.code, b]));
const added = books.filter(b => !was.has(b.code));
const removed = previous.filter(b => !now.has(b.code));
const changed = books.filter(b => {
  const o = was.get(b.code);
  return o && ['title', 'price', 'stock', 'format', 'cover'].some(k => o[k] !== b[k]);
});

console.log(`Backend: ${isEbook.size + books.length} products, ${isEbook.size} of them eBooks (excluded)`);
console.log(`  Print (Law Books)    ${books.filter(b => b.categorised).length}`);
console.log(`  In neither category  ${books.filter(b => !b.categorised).length}  (listed as print)`);
console.log(`  Written to the data file: ${books.length}`);
console.log(`Against ${previous.length} in the data file: +${added.length} new, -${removed.length} gone, ${changed.length} changed`);
for (const b of added.slice(0, 10)) console.log('  + ' + b.code);
for (const b of removed.slice(0, 10)) console.log('  - ' + b.code);
for (const b of changed.slice(0, 10)) console.log('  ~ ' + b.code);

if (CHECK) {
  console.log('--check: nothing written.');
} else {
  await writeFile(OUT, JSON.stringify({ source: API, fetchedAt: new Date().toISOString(), books }, null, 2) + '\n');
  console.log('Wrote ' + OUT);
}
