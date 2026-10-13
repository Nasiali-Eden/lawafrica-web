# Articles — data structure

File: `src/data/articles.generated.json`. Written by `scripts/sync-articles.mjs`.
Shaped for the pages by `src/data/articles.js`. See [INTEGRATION.md](../INTEGRATION.md).

```json
{
  "source": "https://www.lawafrica.com",
  "fetchedAt": "ISO timestamp",
  "articles": [ { "...": "one record per blog post" } ]
}
```

## Record

| Field | Type | From | Notes |
| --- | --- | --- | --- |
| `id` | string | post slug | The URL key: `/insights/article/:id`. Unique. |
| `title` | string | `og:title` | |
| `dek` | string | `og:description` | The standfirst. |
| `cover` | string | `og:image` | Full-size image. |
| `author` | string | byline | |
| `category` | string | post category | Shown as the "pillar" label. |
| `date` | string | byline | ISO `YYYY-MM-DD`. |
| `dateLabel` | string | byline | As printed, e.g. `Dec 08, 2024`. |
| `minutes` | number | byline | The site's own read time; the pages compute their own from the word count. |
| `tags` | string[] | post tags | |
| `body` | string[] | post body | One entry per paragraph. Plain text, no formatting or images. |
| `url` | string | sitemap | The post on the live site. |
| `lastmod` | string | sitemap | |

## Rules

- There is no posts API; the sync reads the sitemap and each post's page.
- Slugs are checked for duplicates on every run.
- Posts are sorted newest first.
- Today's twelve posts are mostly demo content from the site's theme
  (entrepreneurship, branding), not law. They are used as they are until real
  pieces are published.
