# What is missing, and how to fix it

A working list for the `init` branch: what is real, what is placeholder, what is
broken, and what each one needs before this can go live.

Audited **17 September 2026** against the built site. Every figure below was read
off the running app, not estimated.

---

## The state of it, at a glance

| Area | Real | Placeholder | Broken |
| --- | --- | --- | --- |
| Hero | rotation, timing, legibility | all 4 slides' copy + images | — |
| Books — catalogue | 9 cards, filters, search, format split | all 9 titles, prices, authors | — |
| Books — detail | page design, per-title routing | bibliographic table | — |
| Insights — articles | 12 listed, routing works | 10 of 12 have no body | — |
| Insights — events | 4 listed, routing works | all 4 | no upstream source |
| Imagery | the `.plate` treatment | all 11 files are stock | — |

---

## 0. ~~Fix first: every book URL shows the same book~~ — DONE

> Fixed on 17 Sep 2026. Each code now renders its own record, an unknown code
> returns a "Title not found" page, and the price, edition and stock line come
> from the record rather than being hardcoded. The section below is kept as the
> account of what was wrong.

**This was a bug, not missing content, and it made the catalogue non-functional.**

`/books/:code` ignores its own URL parameter. `Book.jsx` reads a single hardcoded
`book` object and a hardcoded `'CON-25'`, so every title in the catalogue opens
the same page:

```
/books/CON-25      -> "The Law of Contract in Kenya"   KES 6,500
/books/CST-24      -> "The Law of Contract in Kenya"   KES 6,500
/books/LND-25      -> "The Law of Contract in Kenya"   KES 6,500
/books/NONSENSE-1  -> "The Law of Contract in Kenya"   KES 6,500
```

Every card on `/books` and `/ebooks`, every "related title", and the hero's
"See the title" slide all lead to the wrong product.

**The fix** — look the code up in the `books` array and render that record;
fall back to a not-found state instead of silently showing the first title.
`src/data/books.js` already carries `code, title, author, edline, price, juris,
format, stock` per title, which covers the masthead, the price and the buy box.
The bibliographic table and table of contents stay generic until real data
arrives (§2).

This needs nothing from LawAfrica and can be done immediately.

---

## 1. The hero section

### What is there

Four slides in `src/data/home.js`, rotating on a 5s timer, over
`plate-hero-1..4.jpg`.

| Slide | Kicker | Links to |
| --- | --- | --- |
| 1 | Current news updates | a judgment on the LLR platform |
| 2 | Upcoming events | `/insights?feed=Events` |
| 3 | New releases | `/books/CON-25` |
| 4 | Spotlight of the week | `/books/CST-24` |

### What is missing

- **Every headline is invented.** "The Supreme Court on eviction, housing and
  the remedies a court may fashion" is not a real LawAfrica item.
- **Every image is stock photography.** No LawAfrica photography anywhere.
- Slides 3 and 4 point at book pages that currently render the wrong book (§0).

### How to handle it

The hero is the one place where placeholder content is most costly — it is the
first thing anyone sees, and a wrong headline reads as a live claim. It is also
the cheapest to fix, because it is four short records.

**What I need per slide:** a kicker (the label above the headline), a headline,
one line of supporting detail, a call-to-action label, and where it goes.

**What the mechanism already handles**, so you do not have to think about it:
headlines of different lengths (space is reserved for the longest, so the desk
below never moves), legibility over any photograph (measured under the actual
glyph pixels — all three hero bands clear WCAG AA), and every band being the
same 720px depth.

**Images:** drop files into `public/assets/` and name them `hero-1.jpg` …
`hero-4.jpg`. Landscape, at least 1600px wide. The `.plate` treatment desaturates
and washes them, so they do not need to be perfect — but they do need to be
LawAfrica's own.

**A reasonable set of four**, if you want a starting shape: a new release, an
upcoming event, a Law Reports item, and one institutional or corporate message.
That is what the current four are standing in for.

---

## 2. The books section

### What is there

Nine titles in `src/data/books.js`, carrying `code, title, author, edline, price,
juris, format, stock`. The catalogue works: filters, search by title/author/code,
sort, and a clean Print/Digital split across `/books` and `/ebooks`.

### What is missing

- **All nine titles are invented.** "Prof. A. Mwangi", "KES 6,500" and
  "CON-25" are not real. The live site has **211 real products**.
- **No ISBNs.** Nothing in the data carries one.
- **No synopsis.** The product page's "What this book covers" is written copy,
  not per-title data.
- **One shared bibliographic table and contents list**, used for every title.
- **One shared cover image** (`plate-cover.jpg`) behind every jacket.
- The digital list has 2 titles against 7 print; live, the ratio is the other way
  round — 97 eBooks to 17 print.

### How to handle it

There are two halves, and they can move independently.

**The spine — title, price, stock, cover — can come from the live API today.**
`/api/v1/ecommerce/products` is public and returns all 211 with id, slug, name,
price, stock status and a cover URL. No credentials, no server change.

**The editorial fields cannot.** Author, ISBN, edition, jurisdiction and synopsis
are empty on every record the API returns — they exist only in the admin and in
the page HTML. So they have to come from you, as an export or a spreadsheet:

| Column | Example | Needed for |
| --- | --- | --- |
| `slug` | `public-international-law` | the join key — must match the live URL |
| `author` | `Prof. David Bakibinga` | card, masthead, filters |
| `isbn` | `9789966031259` | specification table, search |
| `edition` | `2nd edition · 2024` | card, masthead |
| `jurisdiction` | `Uganda` | the jurisdiction filter |
| `synopsis` | one paragraph | product page |

Twenty of these are already in `src/data/catalogue.js` — I read them out of the
2026 printed catalogue PDF, with real ISBNs and authors. That file is a working
sample of the shape, and could seed the first import.

**Covers.** Live covers are at `/storage/products/{image-slug}-1.jpg`. Note the
image slug is not always the URL slug — `/products/the-essence-of-pupillage` has
its cover at `essence-of-pupillage-1.jpg` — so take the cover URL from the API
rather than deriving it.

**Order of work:** fix §0, then import the spine from the API, then layer the
editorial spreadsheet over it. The site is presentable after the first two.

---

## 3. Insights and events

These are two different problems wearing one section heading.

### Articles — thin, but real in shape

12 articles listed, routing works, each opens its own page. But:

- **Only 2 of 12 have a body.** `wht` and `sectional` run to about 1,000 words.
  The other ten — `arbitration`, `editions`, `clickthrough`, `newtitles`,
  `kamau`, `coastal`, `copydesk`, `stillprint`, `board`, `archive` — render a
  240-word editorial stub instead of an article.
- An unknown id silently shows the first article rather than a not-found page.

**How to handle it.** The live site has 12 blog posts, and their Open Graph tags
give a clean title, standfirst and image without parsing the theme. But three of
those twelve are the CMS theme's demo content about entrepreneurship, not law.

So: pick the posts that are genuinely LawAfrica's, and supply the body text for
each. If there are fewer than ten real articles, **list fewer**. Ten stubs read
worse than four complete pieces — a visitor who clicks three in a row and finds
nothing will not click a fourth.

### Events — no source at all

Four events in `src/data/events.js` with speakers, agendas and audiences. All
invented.

**There is no events content type on the live site.** Not in the sitemap, not in
the navigation, not in the API. Nothing upstream to import.

Three ways to go, in increasing order of effort:

1. **Keep them static and curated.** Someone edits `src/data/events.js` when an
   event is announced. Fine at four events a year; painful at twenty.
2. **Model events as blog posts under an "Events" category.** No plugin work —
   Botble already has categories — and events then flow through the same
   pipeline as articles. Loses the structured fields (speakers, agenda, venue)
   unless they go in the body.
3. **Add a proper Events content type in Botble.** Structured, correct, and the
   only option that keeps speakers and agendas as data. Needs a developer with
   access to the installation.

**If there are no events to announce right now, the honest move is to drop the
events strand from this release** and let Insights be articles only. The route
and the design can stay in the code, unused, until there is something to put in
it. That is a decision for you, not a technical constraint.

---

## 4. Imagery, across all three

All eleven files in `public/assets/` are stock. Named by role, not subject:

```
plate-hero-1..4.jpg   the hero rotation
plate-wide.jpg        About hero, and a carousel card
plate-library.jpg     Law Reports imagery
plate-land.jpg        Practice hero
plate-article.jpg     article and carousel imagery
plate-event.jpg       event imagery
plate-cover.jpg       every book jacket
lawafrica-logo.png    the only real asset in the set
```

What would help most, in order: **four hero images**, then **real book covers**
(which the API can supply automatically), then photography for About and
Practice. Everything is washed and desaturated by the `.plate` treatment, so
consistency of subject matters more than polish.

---

## 5. What unblocks what

**I can do now, with nothing from you:**

- ~~Fix the book detail routing (§0).~~ Done.
- Import the 211-title spine from the public API — real titles, prices, stock and
  covers, replacing the nine invented ones.
- Reduce the article list to the pieces that have bodies, so nothing opens empty.
- Wire `src/data/catalogue.js`'s 20 real titles (with ISBNs) into the catalogue.

**I need from you:**

1. Four hero slides — kicker, headline, one line, CTA, destination — and four images.
2. The editorial spreadsheet for books: slug, author, ISBN, edition, jurisdiction,
   synopsis.
3. Which of the 12 live blog posts are really yours, and body text for the ones
   worth keeping.
4. A decision on events: static, blog category, new content type, or drop for now.
5. Whether the catalogue's Print/Digital split should follow the live categories —
   and if so, that 97 of 211 products are currently in neither.

**Decisions only you can make:**

- Whether to go live with real titles but generic synopses, or wait for the full
  editorial data. The first is achievable in a day; the second depends on item 2.
- Whether events ship in this release at all.
