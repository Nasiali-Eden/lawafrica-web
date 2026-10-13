# eBooks — data structure

File: `src/data/ebooks.generated.json`. Written by `scripts/sync-ebooks.mjs`.
Read by `src/data/ebooks.js`. See [INTEGRATION.md](../INTEGRATION.md).

```json
{
  "source": "https://digital.lawafrica.com/products",
  "fetchedAt": "ISO timestamp",
  "ebooks": [ { "...": "one record per digital title" } ]
}
```

## Record

| Field | Type | From | Notes |
| --- | --- | --- | --- |
| `id` | number | listing link | The digital store's product id. |
| `code` | string | `id` as text | The URL key: `/ebooks/:id`. |
| `title` | string | listing | |
| `price` | string | listing | Display, e.g. `KES 1,500`. VAT included. |
| `unit` | number | listing | Numeric price. |
| `cover` | string | listing | Image on Snapplify's image host. |
| `category` | string | detail page | e.g. `Law`. |
| `format` | string | detail page | e.g. `PDF`. |
| `language` | string | detail page | |
| `edition` | string | detail page | A number, e.g. `1`. |
| `description` | string | detail page | Empty on a few titles. |
| `authors` | string[] | detail page, `Copyright` | Copyright holders other than LawAfrica. |
| `url` | string | — | The title on the digital store. The "Buy" target. |

## Rules

- Product ids are checked for duplicates on every run.
- ISBNs appear in the source and are dropped. They are out of scope.
- The sync reads HTML, not an API. It stops with an error if a product card
  cannot be parsed or no products are found.
