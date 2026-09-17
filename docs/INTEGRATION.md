# Integrating this front end with the live LawAfrica site

How books, articles, events and insights are stored on **www.lawafrica.com** today,
what can be read out of it programmatically, and what it would take to drive this
front end from it.

> **How this was established.** Public pages, the sitemap and the public JSON API
> only — no login was used and no admin area was touched. Everything below can be
> re-checked from a browser without credentials. Figures were taken on
> **17 September 2026** and will drift as stock changes.

---

## 1. The platform

The live site is **Botble CMS** running on Laravel, with the Botble eCommerce
plugin. Three independent signals agree:

| Signal | Value |
| --- | --- |
| Sitemap stylesheet | `/vendor/core/packages/sitemap/styles/sitemapindex.xsl` |
| Theme path | `/themes/apexa/` |
| Uploads | `/storage/…` (Laravel's `public/storage` symlink) |

This matters because Botble has a known schema, a known admin, and a REST API
that is **already switched on and publicly readable** — see §4.

`robots.txt` is `Disallow:` with an empty value, i.e. nothing is disallowed.

---

## 2. What content types exist

Read from `/sitemap.xml`, which indexes one file per type:

| Type | Sitemap | Live? | Relevant to us |
| --- | --- | --- | --- |
| Products (books) | `products-YYYY-MM.xml` ×3 | yes | **Books, eBooks** |
| Blog posts | `blog-posts-2024-12.xml` | yes | **Articles / Insights** |
| Blog categories / tags | `blog-categories.xml`, `blog-tags.xml` | yes | Article taxonomy |
| Product categories / tags / brands | `product-categories.xml`, … | yes | Book taxonomy |
| Pages | `pages.xml` | yes | About, Contact etc. |
| Careers | `careers.xml` | yes | Careers |
| Galleries, Services, Projects, Packages | — | yes | not used |

> **There is no events content type.** Nothing in the sitemap, the navigation or
> the API corresponds to events. See §6.

The live navigation is: Home · Bookshop · Ebooks · LLR · Articles · About Us ·
**Publish With Us** — which is close to what this front end already builds.

---

## 3. Inventory, as at 17 Sep 2026

| | Count |
| --- | --- |
| Products total | **211** |
| — in *Law Books* (`id 3`) | 17 |
| — in *Law Ebooks* (`id 7`) | 97 |
| — **in neither category** | **97** |
| Blog posts | 12 |
| Blog categories | 20 |
| Product categories | 2 |

Two things to notice before building anything on this:

- **Almost half the catalogue is uncategorised.** A Books/eBooks split driven by
  category would silently drop 97 of 211 titles.
- **The digital list is the larger one** — 97 eBooks against 17 print. This front
  end currently assumes the opposite (7 print, 2 digital in the static data).

---

## 4. The API

`/api/v1/ecommerce/products` responds **200 with JSON, unauthenticated**.

```
GET https://www.lawafrica.com/api/v1/ecommerce/products
GET https://www.lawafrica.com/api/v1/ecommerce/products?page=2
GET https://www.lawafrica.com/api/v1/ecommerce/products?categories[]=3
GET https://www.lawafrica.com/api/v1/ecommerce/product-categories
```

- Laravel pagination: `data`, `links`, `meta`. **24 per page, 9 pages, 211 total.**
- `per_page` is ignored.
- `categories[]` takes **numeric ids, not slugs** — `categories[]=law-ebooks`
  returns an empty set, `categories[]=7` returns 97.

### What a product record contains

```json
{
  "id": 649,
  "slug": "public-international-law",
  "name": "Public International Law",
  "price": 4060,
  "price_formatted": "KES 4,060.00 ",
  "original_price": 4060,
  "stock_status_label": "In stock",
  "image_url": "https://www.lawafrica.com/storage/products/public-international-law-1-150x150.jpg"
}
```

### What it does **not** contain

Checked across a full page of 24 records — these are empty or null on **every**
one:

`sku` · `description` · `content` · `quantity` · `weight` · `height` · `wide` ·
`length` · `reviews_avg` · `product_options`

`image_with_sizes` is populated on only 6 of 24.

**This is the central constraint.** The API is a catalogue *spine* — id, slug,
title, price, stock, thumbnail. It carries **no author, no ISBN, no edition, no
jurisdiction, no synopsis**, which are exactly the fields this front end's book
cards and title pages are built around. Those live in the product's page HTML
and in the admin, not in the API.

No per-product endpoint exists: `/products/649` 404s and `/products/{slug}` 500s.

---

## 5. URL and asset conventions

### Books

| | Pattern | Example |
| --- | --- | --- |
| Listing | `/products` | |
| Detail | `/products/{slug}` | `/products/public-international-law` |
| Category | `/product-categories/{slug}` | `/product-categories/law-ebooks` |
| Cover | `/storage/products/{image-slug}-{n}.jpg` | `…/public-international-law-1.jpg` |
| Cover thumb | `…-{n}-{W}x{H}.jpg` | `…-1-150x150.jpg` |

> **The image slug is not always the URL slug.** `/products/the-essence-of-pupillage`
> has its cover at `/storage/products/essence-of-pupillage-1.jpg`. Do not derive
> image paths from the product slug — take `image_url` from the API and strip the
> `-150x150` suffix for a larger rendition.

### Articles

| | Pattern | Example |
| --- | --- | --- |
| Listing | `/Articles` | note the **capital A** |
| Detail | `/{slug}` | `/mobile-courts-in-developing-a-child-responsive-justice-system-by-lumunye-timothy` |
| Category | `/{category-slug}` | `/legal`, `/technology` |
| Image | `/storage/news/{id}-{W}x{H}.jpg` | derivatives are pre-generated |
| Author avatar | `/storage/users/{uuid}.png` | |

Articles carry a full Open Graph block — `og:title`, `og:description`,
`og:image`, `og:url`, `og:type=article` — so a scrape can get clean metadata
without parsing the theme. There is no JSON-LD per article; the only structured
data on the site is one generic `WebSite` block.

> **Article slugs and category slugs share the root namespace.** Both
> `/legal` (a category) and `/5-productivity-hacks-for-busy-entrepreneurs` (a post)
> are one segment deep. Any router mapping this needs an explicit list of category
> slugs, or it will treat a category as a missing article.

---

## 6. Events, and the blog taxonomy

**Events do not exist on the live site.** There is no events content type, no
sitemap entry, no navigation item and no API resource. This front end's
`/insights/event/:id` route and its `src/data/events.js` have no upstream source.
There are three honest options:

1. Keep events as curated static content in `src/data/events.js` (what happens today).
2. Add an Events content type in Botble, and read it the same way as posts.
3. Model events as blog posts under a dedicated category (cheapest, no plugin work).

**The blog taxonomy is mostly not yours.** Of 20 blog categories, the ones in use
read as leftovers from the theme's demo content — `entrepreneurship`,
`e-commerce`, `technology`, `networking`, `productivity`, `operations`,
`small-business`, `business-strategy`, `industry-trends`. Only `legal` is
plausibly deliberate. Three of the 12 posts are demo articles about
entrepreneurship, not law. Any integration should filter, not import wholesale.

---

## 7. Three ways to connect this, and which to pick

### A. Read the public API, fill the gaps by hand — *recommended to start*

Pull the 211 products from `/api/v1/ecommerce/products`, then hold the fields the
API does not expose (author, ISBN, edition, jurisdiction, synopsis) in a small
editorial file keyed by product `id` or `slug`.

- Works today, no server change, no credentials.
- Prices, stock and titles stay current automatically.
- The editorial fields are maintained twice — once in Botble's admin, once here.

### B. Extend the API, then read only the API — *the right end state*

Add the missing fields to the products API resource in Botble (a small change in
the eCommerce plugin's transformer) so `sku`/ISBN, description, brand/author and
categories are returned. Then this front end needs no editorial file at all.

- One source of truth.
- Needs a developer with access to the Botble installation.
- Also the moment to decide whether Events becomes a real content type.

### C. Export and build statically

Export products and posts to CSV/JSON from the admin and commit them as
`src/data/*`. Suitable if the catalogue changes rarely and you want the site to
have no runtime dependency on the CMS.

- Simplest and fastest to render; nothing can break at request time.
- Prices and stock go stale between exports.

**Recommendation.** Start at **A** so the front end can go live against real
titles now, and treat **B** as the follow-up once someone can change the Botble
installation. **C** is the fallback if the API is ever taken off.

---

## 8. Field mapping

What this front end needs, against what the live site can supply.

### `src/data/books.js` — a book card and title page

| Our field | Live source | Available? |
| --- | --- | --- |
| `code` | product `id` or `slug` | ✅ API |
| `title` | `name` | ✅ API |
| `price` | `price_formatted` | ✅ API |
| `unit` | `price` | ✅ API |
| `stock` | `stock_status_label` | ✅ API |
| cover image | `image_url`, minus the `-150x150` suffix | ✅ API |
| `format` (`Print` / `Digital`) | product category id `3` / `7` | ⚠️ 97 of 211 are in neither |
| `author` | product page HTML / admin | ❌ not in the API |
| `edline` (edition, year) | product page HTML / admin | ❌ not in the API |
| `juris` (jurisdiction) | not modelled upstream | ❌ |
| ISBN | `sku` — null on every record | ❌ |
| synopsis | `description` / `content` — empty on every record | ❌ |

### `src/data/articles.js` — an article

| Our field | Live source | Available? |
| --- | --- | --- |
| `id` | post slug | ✅ |
| `title` | `og:title` | ✅ |
| standfirst | `og:description` | ✅ |
| image | `og:image` | ✅ |
| body | post page HTML | ⚠️ scrape, no API |
| author | byline in the slug/HTML, `/storage/users/{uuid}` avatar | ⚠️ |
| date | not in Open Graph; sitemap `lastmod` is the nearest | ⚠️ |
| category | root-level category slug | ⚠️ see §5 caveat |

There is **no posts API** — `/api/v1/posts` 404s. Articles are scrape-or-export
until someone enables one.

### `src/data/events.js`

No upstream source. See §6.

---

## 9. What is needed from LawAfrica

In rough order of how much it unblocks:

1. **A decision on §7** — A, B or C. Everything else follows from it.
2. **The editorial fields for the catalogue**, if A: author, ISBN, edition/year
   and jurisdiction per title. A spreadsheet keyed by product slug is ideal; it
   maps straight onto `src/data/books.js`.
3. **Category clean-up** — 97 of 211 products sit in neither Law Books nor Law
   Ebooks. Until that is fixed the print/digital split cannot be derived.
4. **A decision on events** — static, new content type, or a blog category.
5. **Hero images and copy** — the four slides in `src/data/home.js` are
   placeholder text over stock photography. Real images go in `public/assets/`.
6. **Blog clean-up** — decide which of the 20 categories and 12 posts are real,
   so the Insights feed does not import demo content about entrepreneurship.

---

## 10. Things to verify before relying on any of this

- The API is public **today**. Confirm that is intentional; if it is later put
  behind a key, route A and B both need a token.
- `per_page` is ignored, so a full catalogue read is 9 sequential requests.
  Cache it; do not fetch per page view.
- Product ids are not stable across a CMS migration. If an editorial file is
  keyed by `id`, a re-import upstream will break it — prefer `slug`, and accept
  that slugs change when a title is renamed.
- eBooks are to remain static for now, so nothing here needs to reach Snapplify.
  If that changes, `/ebooks` likely becomes a hand-off page like `/llr` rather
  than a catalogue.
