// Rebuilds the article data from the live LawAfrica blog.
//
//   npm run sync:articles            write src/data/articles.generated.json
//   npm run sync:articles -- --check report the differences, write nothing
//
// There is no posts API on the live site (/api/v1/posts is a 404), so this
// reads the public pages: the sitemap for the list of posts, then each post's
// page for its title, standfirst, cover, author, category, date and body.
// No login is used.
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ORIGIN = 'https://www.lawafrica.com';
const OUT = fileURLToPath(new URL('../src/data/articles.generated.json', import.meta.url));
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
  .replace(/&amp;/g, '&').replace(/&#0?39;|&apos;|&rsquo;/g, "'").replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const meta = (html, prop) => {
  const m = html.match(new RegExp(`<meta property="${prop}" content="([^"]*)"`));
  return m ? decode(m[1]).trim() : '';
};

// --- the list of posts, from the sitemap index ------------------------------
const index = await getText(`${ORIGIN}/sitemap.xml`);
const sitemaps = [...index.matchAll(/<loc>([^<]*blog-posts[^<]*)<\/loc>/g)].map(m => m[1]);
if (!sitemaps.length) throw new Error('no blog-posts sitemap found in /sitemap.xml');

const listed = [];
for (const url of sitemaps) {
  const xml = await getText(url);
  for (const block of xml.split('<url>').slice(1)) {
    const loc = block.match(/<loc>([^<]*)<\/loc>/)?.[1];
    if (loc) listed.push({ url: loc, lastmod: block.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1] || '' });
  }
}

// --- one post ---------------------------------------------------------------
const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

async function post({ url, lastmod }) {
  const html = await getText(url);
  const slug = url.replace(/^.*\//, '');
  const title = meta(html, 'og:title');
  if (!title) throw new Error('no og:title on ' + url);

  const metaBlock = html.match(/<div class="blog-post-meta">([\s\S]*?)<\/ul>/)?.[1] || '';
  const author = decode(metaBlock.match(/By\s*<strong>([^<]*)<\/strong>/)?.[1] || '').trim();
  const category = decode(metaBlock.match(/class="post-tag[^"]*">([^<]*)</)?.[1] || '').trim();
  const dateText = metaBlock.match(/<\/i>\s*([A-Z][a-z]{2} \d{1,2}, \d{4})/)?.[1] || '';
  const minutes = Number(metaBlock.match(/(\d+)\s*minutes? read/)?.[1] || 0);

  let iso = '';
  const d = dateText.match(/([A-Z][a-z]{2}) (\d{1,2}), (\d{4})/);
  if (d) iso = new Date(Date.UTC(Number(d[3]), MONTHS[d[1]], Number(d[2]))).toISOString().slice(0, 10);

  // the body is the ck-content block; flatten block ends to line breaks, strip
  // tags, and drop the empty and repeated lines the editor leaves behind
  const bodyHtml = html.match(/<div class="ck-content">([\s\S]*?)<div class="blog__details-bottom">/)?.[1] || '';
  const body = decode(bodyHtml
    .replace(/<\/(p|div|li|h\d)>|<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, ' '))
    .split('\n').map(l => l.replace(/\s+/g, ' ').trim()).filter(Boolean)
    .filter((l, i, a) => l !== a[i - 1]);

  const tags = [...html.matchAll(/<a title="([^"]*)" href="[^"]*\/tag\/[^"]*"/g)].map(m => decode(m[1]));

  return {
    id: slug,
    title,
    dek: meta(html, 'og:description'),
    cover: meta(html, 'og:image'),
    author,
    category,
    date: iso,
    dateLabel: dateText,
    minutes,
    tags,
    body,
    url,
    lastmod
  };
}

const articles = [];
for (const item of listed) articles.push(await post(item));
if (!articles.length) throw new Error('no posts found — the blog markup may have changed');

const ids = articles.map(a => a.id);
if (new Set(ids).size !== ids.length) throw new Error('duplicate post slugs');
articles.sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.lastmod.localeCompare(a.lastmod));

let previous = [];
try { previous = JSON.parse(await readFile(OUT, 'utf8')).articles; } catch { /* first run */ }
const was = new Map(previous.map(a => [a.id, a]));
const now = new Map(articles.map(a => [a.id, a]));
const added = articles.filter(a => !was.has(a.id));
const removed = previous.filter(a => !now.has(a.id));
const changed = articles.filter(a => {
  const o = was.get(a.id);
  return o && ['title', 'dek', 'cover', 'author', 'category'].some(k => o[k] !== a[k]) || (o && o.body.join() !== a.body.join());
});

console.log(`Blog: ${articles.length} posts`);
console.log(`  with a body      ${articles.filter(a => a.body.length).length}`);
console.log(`  with an author   ${articles.filter(a => a.author).length}`);
console.log(`  categories       ${[...new Set(articles.map(a => a.category).filter(Boolean))].join(', ') || '(none)'}`);
console.log(`Against ${previous.length} in the data file: +${added.length} new, -${removed.length} gone, ${changed.length} changed`);

if (CHECK) {
  console.log('--check: nothing written.');
} else {
  await writeFile(OUT, JSON.stringify({ source: ORIGIN, fetchedAt: new Date().toISOString(), articles }, null, 2) + '\n');
  console.log('Wrote ' + OUT);
}
