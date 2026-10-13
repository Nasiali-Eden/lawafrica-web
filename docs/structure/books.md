# Books — data structure

File: `src/data/books.generated.json`. Written by `scripts/sync-books.mjs`.
Shaped for the pages by `src/data/books.js`. See [INTEGRATION.md](../INTEGRATION.md).

```json
{
  "source": "https://www.lawafrica.com/api/v1/ecommerce",
  "fetchedAt": "ISO timestamp",
  "books": [ { "...": "one record per print product" } ]
}
```

## Record

| Field | Type | From | Notes |
| --- | --- | --- | --- |
| `id` | number | `id` | Not stable across a CMS migration. |
| `code` | string | `slug` | The URL key: `/books/:code`. Unique. |
| `title` | string | `name` | |
| `price` | string | `price_formatted` | Display, e.g. `KES 4,060`. |
| `unit` | number | `price` | Numeric, used by the basket. |
| `stock` | string | `stock_status_label` | e.g. `In stock`. |
| `format` | `"Print"` | — | Always `Print`. eBooks are not in this file. |
| `categorised` | boolean | category 3 | `false` if the product is in no category upstream. |
| `cover` | string | `image_url` | The `-150x150` suffix is stripped for the full image. |
| `author` | string | — | Not in the API. Always empty. |
| `edline` | string | — | Edition and year. Not in the API. Always empty. |
| `juris` | string | — | Jurisdiction. Not in the API. Always empty. |

`books.js` adds two derived fields: `fmt` (same as `format`) and `stockColor`.

## Rules

- Law Ebooks (category 7) are excluded. They are in [ebooks](ebooks.md).
- `code` values are checked for duplicates on every run.
- The number of records read must equal the API's reported total.
