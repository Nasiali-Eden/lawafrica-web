# Integration

How the site gets its data, and how to refresh it. Nothing else.

The field-by-field shape of each data set lives in its own file:

- [Books](structure/books.md)
- [eBooks](structure/ebooks.md)
- [Articles](structure/articles.md)

## Sources

| Data | Source | Read by | Written to |
| --- | --- | --- | --- |
| Print books | `www.lawafrica.com/api/v1/ecommerce/products` (public JSON API) | `scripts/sync-books.mjs` | `src/data/books.generated.json` |
| eBooks | `digital.lawafrica.com/products` (public pages; covers served by Snapplify) | `scripts/sync-ebooks.mjs` | `src/data/ebooks.generated.json` |
| Articles | `www.lawafrica.com` sitemap and each post's page (no posts API) | `scripts/sync-articles.mjs` | `src/data/articles.generated.json` |

Books and eBooks are separate catalogues, and articles are separate again. They share no records, no code and no
page: `/books` reads only the first file, `/ebooks` only the second.

Neither source needs a login.

## Refresh

```
npm run sync            # all three
npm run sync:books      # print books only
npm run sync:ebooks     # eBooks only
npm run sync:articles   # articles only
```

Add `-- --check` to any of them to see what would change without writing.
Each run prints the counts and what was added, removed or changed since the
last run. Needs Node 18+ and a connection.

The generated files are committed. A refresh is a commit.

## How the pages read it

```
books.generated.json  ->  src/data/books.js   ->  /books, /books/:code
ebooks.generated.json ->  src/data/ebooks.js  ->  /ebooks, /ebooks/:id
articles.generated.json -> src/data/articles.js -> /insights, /insights/article/:id, home
```

`books.js` and `ebooks.js` only shape the records for the pages. They hold no
titles or prices. Never edit a `*.generated.json` file by hand; the next sync
overwrites it.

## Buying

- **Print:** added to this site's basket.
- **eBooks:** not added to the basket. "Buy" opens the title on the digital
  store (`digital.lawafrica.com/products/<id>`), which has its own cart.

## Known limits

- The print API has no author, edition, jurisdiction or description, so those
  fields are empty and the pages leave them out.
- 97 print products sit in no category upstream. They are listed anyway and
  flagged `categorised: false`.
- The digital store has no JSON API, so `sync-ebooks.mjs` reads its HTML. If
  that site's markup changes the script fails loudly rather than writing
  partial data.
- ISBNs are out of scope and are not stored.
- Events have no source upstream and stay in `src/data/events.js`.
- Article bodies are plain paragraphs, and the 12 live posts are mostly theme
  demo content. They are used as they are for now.
- Prices are never calculated here: print prices come from the bookshop API
  and eBook prices from the digital store.
- See [BACKEND-AUDIT.md](BACKEND-AUDIT.md) for the investigation of the live site.
