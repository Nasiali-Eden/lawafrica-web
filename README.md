# lawafrica-web — `init`

A Vite + React implementation of the LawAfrica website.

> **This is the `init` branch: the initial deployment that goes live.** It is a
> reduced cut of the full redesign on `redesign`. What is different here:
>
> - **No sign-in.** The whole auth surface is gone — `/signin`, `/signup`, the
>   account strip, `AuthContext`. Old URLs redirect to `/`.
> - **Law Reports is not a page here.** LLR runs on its own platform. The
>   top-level nav item goes straight out to `llr.lawafrica.com`; `/llr` is a
>   description page inside Products that hands over to it. The in-site judgment
>   search and case reader are gone, and `/reports*` redirects to `/llr`.
> - **Products is Books, eBooks, LLR** — in that order.
> - **Catalogue is its own page**, not the books listing. It describes the
>   printed 2026 catalogue (53pp), lists its titles, and carries the ordering
>   and trade terms. Cover photography is placeheld and the downloadable PDF is
>   deliberately not linked yet.
> - **A title is Print *or* Digital**, never both, so `/books` and `/ebooks` are
>   a clean partition of the list rather than two views of it.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

No backend. Auth and the basket are client state; case gating, sign-in and checkout are prototype behaviour.

## Connecting it to the live site

The live site (www.lawafrica.com) is Botble CMS on Laravel, and its eCommerce
API is public. What it can and cannot supply — and what that means for books,
articles, events and insights — is written up in
[docs/INTEGRATION.md](docs/INTEGRATION.md).

## Stack

- Vite 5 + React 18
- react-router-dom 6 (real URLs — the HTML prototype used a single `screen` state variable)
- No CSS framework. Design tokens in `src/styles/tokens.css`, a small component layer in `src/styles/components.css`, everything else inline.

## Layout

```
src/
  styles/tokens.css     every colour, type step, spacing and radius
  styles/components.css base type, .btn .card .tag .plate .table .field
  state/                Basket, Hero, Type, Overlay, Background contexts
  data/                 books, cases, articles, events, publishing, catalogue
                        (plain modules)
  components/           Header, Footer, Layout, HeroBand, PageHeroBand,
                        BookCard, BookTile, BookCover, Plate, FloatingControls,
                        CardCarousel (the publishing carousel),
                        useHeroCover (sizes a hero band to its content)
  pages/                one file per route
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — rotating hero band, task desk, featured titles, insights, Law Reports band |
| `/books` | Print catalogue with jurisdiction/practice-area/audience filters, search, sort |
| `/ebooks` | Digital catalogue — its own section, same component with `digital`. `/books?format=ebook` still resolves here |
| `/books/:code` | Title page — format switch, specification table, related titles |
| `/llr` | What LawAfrica Law Reports is, and the handover to `llr.lawafrica.com` |
| `/catalogue` | The printed 2026 catalogue described — titles, ordering and trade terms |
| `/practice` | Audience landing — practitioners and students |
| `/insights` | Newsroom — lead pieces, diary, filtered feed |
| `/insights/article/:id` | Article |
| `/insights/event/:id` | Event with programme |
| `/basket` | Basket |
| `/about`, `/contact`, `/publish`, `/institutions`, `/careers` | Company |

`/reports`, `/reports/*`, `/signin` and `/signup` are kept as redirects — they
existed in the previous build and may be bookmarked or indexed, so they resolve
rather than quietly rendering the home page under an old address. Anything else
unmatched renders `<Home />` via the `*` route — there is no 404 page.

## Design system

Classical, rethemed for LawAfrica: Cormorant Garamond over Lora, hairline rules,
bordered cards, outlined buttons, photographs matted in `.plate`.

**A second voice.** Feature sections — the publishing carousel and the contact
band — set their headline in `--font-display` (DM Serif Display, the heading
face of the *Advocate* pairing) rather than `--font-heading`. It is fixed on
purpose: `--font-heading` follows whatever pairing `TypeContext` is on, and this
one does not, so those sections keep reading differently from the ordinary `h2`s
around them. The face is already in the font link, so it costs nothing.

**Two moving things, one beat.** The hero band and the publishing carousel both
advance on **5s**. The carousel pauses while a pointer or the keyboard is inside
it, and neither runs under `prefers-reduced-motion`.

**The header retracts on the way down** and returns on the way up (`Layout`
tracks scroll direction; reveal has a lower threshold than hide, so a small
upward correction always brings it back). It never retracts within 180px of the
top, nor while the mobile drawer is open — the close button lives up there.

### Type — one floor, ten steps

Every size in the app is authored as `calc(var(--t-base) + Npx*var(--tf,1))`.
`--t-base` is the floor the whole ladder pivots on, so **raising that one number
in `tokens.css` lifts all ten steps together**. It is set there and nowhere else —
`TypeContext` never writes it, so the floor survives a font-pairing change.

The floor is **13px**, not the prototype's 11px: the readership skews older and
11px micro copy was the weakest point in the design. The ladder is
62 / 46 / 36 / 29 / 23 / 19 / 17 / 15 / 14 / 13px, body text is 17px, and no text
anywhere renders below 13px. Controls and inputs are 44px minimum, and inputs are
16px so iOS does not zoom the page on focus.

`--tf` is the per-pairing scale factor (0.88–1.0), applied to the distance above
the floor rather than to the size, so the small end never slides back down. The
h4-and-up steps carry a second factor, `--tz`, for the viewport — see Responsive.

### Colour

The three brand colours, used exactly:

| Role | Token | Value |
| --- | --- | --- |
| Primary — burgundy | `--color-accent` / `--ground-brand` | `#820024` |
| Primary — charcoal grey | `--ground-grey`, and the `--color-neutral-*` ramp | `#717073` |
| Complement — blue | `--azure-700` | `#0081C3` |

Each has a 100–900 ramp: light steps for tints, 700 as the brand value, 800+ for
shades. Gold (`--gold-300/-400`) is eyebrows and rules on dark grounds only.

**Contrast is a constraint here, not a preference** — the audience is older, so
every text/background pair in the app clears WCAG AA. Three consequences worth
knowing before you change a colour:

- **Links use `--azure-800` (`#006192`), not the brand blue.** `#0081C3` itself
  is only 3.9:1 on the page ground, which fails AA for body text. The brand blue
  is the UI/large step.
- **`--ground-grey` (`#717073`) carries white text only.** Nothing dimmer passes
  on it — gold on brand grey is 2.1:1. Bands on it use `--on-grey` / `--on-grey-body`
  and no muted tier. Where a band needs a gold eyebrow or a muted tier, it uses
  `--ground-slate` (`#39383a`) instead.
- **`--color-neutral-600` is `#646366`, slightly darker than the brand grey.**
  `#717073` is 4.1:1 on the panel tint, so it is not used for small text; it lives
  on as `--ground-grey`.

Burgundy is the forgiving ground: white, the `-200`/`-300` tints and gold all
clear AA on it, so it carries the footer and the Law Reports band.

### Dark grounds

Burgundy runs three depths, so a page can stack two brand planes without
reaching for a neutral. Both darker steps are *more* forgiving than the mid
burgundy, not less — white is 13.7:1 on `-deep` and 17.0:1 on `-deepest`, and
gold-400 clears AA on both — so anything that works on `--ground-brand` works
on these.

| Ground | Token | Value | Where |
| --- | --- | --- | --- |
| Burgundy | `--ground-brand` | `#820024` | Footer body, Home Law Reports band |
| Burgundy, deep | `--ground-brand-deep` | `#62001b` | Case-reader masthead, About digital band |
| Burgundy, deepest | `--ground-brand-deepest` | `#410012` | Top bar, footer legal strip, drawer scrim |
| Brand grey | `--ground-grey` | `#717073` | About stats strip |
| Slate | `--ground-slate` | `#39383a` | (held in reserve — nothing uses it now) |

The publishing carousel sits on `--ground-brand-deepest` and is the one band
with **no gold in it at all**: white headline over a grey second line, grey
chips and rails, and the maroon reserved for the highlighted card. Its track is
held inside the 1180px content column rather than bleeding to the viewport edge,
and the cards divide that column `--cols` ways — 4 on desktop, 3, then 2, then
1.15 on a phone so the next card peeks.

Two details worth keeping:

- The top bar's transparent state over a hero is `rgba(65,0,18,.4)` — the
  deepest burgundy at 40% — so its solid state uses the same colour and the
  strip does not change hue as you scroll off a hero.
- The footer sets its legal strip on the deepest burgundy rather than dividing
  it with a hairline rule: two burgundy planes read as a footer with a base,
  where a rule on a flat ground just reads as a line.

**A maroon button does not work on the darkened burgundy** — `#820024` on
`#62001b` is 1.3:1, so the control's own edge vanishes even though the label on
it stays legible. On those grounds use the light button (`--color-bg` ground,
`--ground-brand` label), as the Law Reports band does.

Hero bands are a photograph under a burgundy wash built from the exact brand
maroon (`rgba(130,0,36,…)` and the `#62001b` / `#410012` shades).

## Responsive

Breakpoints are **1000px**, **700px** and **560px**. The site is checked for
horizontal overflow, sub-13px text, contrast and tap-target size at 390 / 768 /
1280px, and is clean at all three.

Layout is authored as React inline styles, which a media query cannot reach —
an inline `grid-template-columns` outranks any normal rule. So the breakpoints
work through three levers, all in `components.css`:

1. **`--tz`, a viewport type-zoom.** Sizes from `--t-h4` up are authored as
   `calc(var(--t-base) + Npx*var(--tf,1)*var(--tz,1))`, so `--tz` shrinks
   headings on small screens while body and caption sizes stay exactly where the
   accessibility pass put them. Body copy is 17px on a phone, same as on a
   desktop. Nothing writes `--tz` at runtime, so a plain `:root` rule wins.
   The display step is too big even for `--tz`, so `h1` is sized against the
   viewport directly with `clamp()`.
2. **`.stack` / `.stack-sm` / `.stack-cols`** on the grid container. Their rules
   use `!important`, which is what beats the inline style. They collapse to
   `minmax(0,1fr)` — not `1fr`, which keeps an `auto` minimum and lets a wide
   child stretch the track past the viewport.
3. **Symmetric grids need no class.** They are authored as
   `repeat(auto-fit, minmax(min(100%, Npx), 1fr))`; the `min(100%, …)` lets a
   track collapse below its ideal width, so the row reflows on its own.

Beyond reflow, narrow viewports also get:

- a **drawer nav** — both navs are always rendered and CSS picks one (`.at-wide`
  / `.at-narrow`), so there is no resize listener and no flash of the wrong nav;
- **results before filters** on the catalogue and judgment search, and **title
  before cover** on a product page, via `order`;
- **44px tap rows** on standalone links (footer columns, contact strip, chips,
  breadcrumbs). Links inside running prose are left alone — a 44px min-height
  there would wreck the line spacing, and WCAG 2.5.8 exempts them;
- **ragged-right body text**; justified setting needs more words per line than a
  340px column gives it;
- the **preview harness stowed** behind a single round button.

Hero bands are absolutely positioned at a fixed height, which only works while
the hero text is shorter than that number — and it was not, even at 1280px,
where the hero's second button sat 32px past the band and rendered as an empty
outline (near-white text on the near-white ground). `useHeroCover` measures the
lowest text in the hero and sizes the band to clear it, keeping the fixed height
as a floor. Measuring rather than hard-coding also survives the things that
change that height at runtime: the Home band rotates through slides of different
lengths, and the type pairing can be switched live.

Apart from the hero bands, desktop is untouched: every rule above is inside a
`max-width` query. One consequence is that the desktop footer and contact-strip
links stay at their designed ~22px height, below the 24px WCAG 2.5.8 minimum.

## Preview harness

The floating pills bottom-right are a **design-preview harness**, not product UI:
a ten-way font-pairing switcher, a white/current background toggle, a hero overlay
toggle and a hero layout toggle. They are why `index.html` loads twenty font
families. `FloatingControls.jsx` plus `TypeContext` / `BackgroundContext` /
`OverlayContext` are the whole of it — deleting those four files and trimming the
font link removes it. `--font-heading` and `--font-body` have static defaults in
`components.css`, so the site still paints correctly without `TypeContext`; what
you lose is the per-pairing weight, tracking and scale it sets on `<html>`.

## Known gaps

- Photography is placeholder, greyscaled by `.plate`. Swap the `img` fields in
  `src/data/` and the `heroSlides` array in `src/data/home.js`.
- Two articles carry full text (`wht`, `sectional`); the other ten are listed with
  an editorial note in place of the body.
- `mitubell` is the only case with a full editorial summary; the rest fall back to
  headnote + note.
- The citator panel shows a count, not real citing-judgment data.
- The desktop footer and contact-strip links sit at ~22px, under the 24px WCAG
  2.5.8 minimum. Touch viewports are fixed; desktop was left as designed.
