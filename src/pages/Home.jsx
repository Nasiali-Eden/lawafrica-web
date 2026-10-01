import { Link, useNavigate } from 'react-router-dom';
import BookTile from '../components/BookTile.jsx';
import CardCarousel from '../components/CardCarousel.jsx';
import ContactRoutes from '../components/ContactRoutes.jsx';
import Plate from '../components/Plate.jsx';
import { featured, jurisdictions, areas } from '../data/books.js';
import { ACCOUNT_URL, hero, proof } from '../data/home.js';
import { publishingLines } from '../data/publishing.js';
import { allArticles, pillarInk } from '../data/articles.js';

const articles = allArticles.slice(0, 3);

// Centred section head, set like "Trusted Authority": chip, a one-line
// two-tone title, supporting text beneath.
function SectionHead({ eyebrow, lead, tail, children }) {
  return (
    <div className="section-head">
      <span className="feature-chip">{eyebrow}</span>
      <h2 className="feature-title">{lead} <span>{tail}</span></h2>
      <p>{children}</p>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Hero — one photograph, one statement. No rotation, so no slide
           picker beside it and no reserved headline height: with a single
           headline the band cannot change depth, and the desk below cannot
           be pushed around. */}
      <section className="hero-copy" style={{ minHeight: 530, display: 'flex', alignItems: 'flex-end', color: 'var(--color-text)' }}>
        <div className="wrap" style={{ paddingBlock: '96px 72px', width: '100%' }}>
          <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <span style={{ width: 52, height: 2, background: 'var(--color-accent)' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-accent-700)' }}>{hero.eyebrow}</span>
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 40px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.08, letterSpacing: 'var(--ls-heading,-.02em)', margin: '0 0 22px', color: 'var(--color-text)', textWrap: 'balance' }}>
            {hero.titleLead}
            <span style={{ display: 'block', color: 'var(--color-accent-700)' }}>{hero.titleTail}</span>
          </h1>

          <p style={{ fontSize: 'calc(var(--t-base) + 5px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-text)', margin: '0 0 30px' }}>
            {hero.body}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => navigate('/books')} style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 26px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Explore legal resources</button>
            <a className="btn" href={ACCOUNT_URL} target="_blank" rel="noopener noreferrer" style={{ border: '1px solid var(--color-text)', color: 'var(--color-text)', background: 'transparent', padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', textDecoration: 'none' }}>Sign in &#8599;</a>
          </div>
          </div>
        </div>
      </section>

      {/* 01 · The desk — finding a book, and nothing else. It carried a Law
           Reports search and a "this week" judgment list as well, both of which
           belong to the LLR platform now; without them the card is one row and
           a great deal shorter. */}
      <section className="desk">
        <div className="desk-card">
          <div className="desk-head">
            <h2>Find a title</h2>
            <span>Start with the book you came for, not with our menu.</span>
          </div>
          <form className="desk-row" onSubmit={e => { e.preventDefault(); navigate('/books'); }}>
            <div className="field" style={{ gridArea: 'q' }}>
              <label htmlFor="desk-q">Title, author or keyword</label>
              <input id="desk-q" className="input" placeholder="e.g. law of contract" />
            </div>
            <div className="field" style={{ gridArea: 'j' }}>
              <label htmlFor="desk-j">Jurisdiction</label>
              <select id="desk-j" className="input">
                <option>All jurisdictions</option><option>Kenya</option><option>Tanzania</option><option>Uganda</option>
              </select>
            </div>
            <div className="field" style={{ gridArea: 'a' }}>
              <label htmlFor="desk-a">Practice area</label>
              <select id="desk-a" className="input">
                <option>All areas</option><option>Commercial</option><option>Constitutional</option><option>Land &amp; conveyancing</option>
              </select>
            </div>
            <button type="submit" className="btn" style={{ gridArea: 'go', background: 'var(--color-accent)', color: '#fff' }}>
              Search books
            </button>
          </form>
        </div>
      </section>

      {/* 02 · What we publish — the one section on Home that is neither a grid
           nor a two-column block, so the page changes gait here. The eBook
           message the old two-column block carried lives on as the "Digital"
           card rather than being dropped. */}
      <CardCarousel
        eyebrow="What we publish"
        titleTop="Trusted"
        titleBottom="Authority"
        intro="Twenty-five years of primary law, commentary and reporting for six African jurisdictions — in print, in loose-leaf and online."
        items={publishingLines}
      />

      {/* 03 · Browse legal books */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px 10px' }}>
        <SectionHead eyebrow="The catalogue" lead="Browse legal" tail="books">
          Filter by jurisdiction or practice area, or start with the newest and current editions.
        </SectionHead>
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40, marginTop: 24 }}>
          <div>
            <h4 style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>By jurisdiction</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 26 }}>
              {jurisdictions.map(j => (
                <Link key={j.name} to="/books" style={{ textAlign: 'left', background: 'none', border: 0, borderBottom: '1px solid var(--color-divider)', padding: '8px 0', cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', display: 'flex', justifyContent: 'space-between', textDecoration: 'none', color: 'inherit' }}>
                  <span>{j.name}</span><span style={{ color: 'var(--color-neutral-700)', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }}>{j.count}</span>
                </Link>
              ))}
            </div>
            <h4 style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>By practice area</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {areas.map(a => (
                <Link key={a.name} className="tag tag-neutral" to="/books" style={{ cursor: 'pointer', border: '1px solid transparent', textDecoration: 'none' }}>{a.name}</Link>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 14 }}>New and current editions</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 20 }}>
              {featured.map(b => <BookTile key={b.code} b={b} />)}
            </div>
            <div style={{ textAlign: 'center', marginTop: 24 }}><Link className="btn btn-ghost" to="/books">All 480 titles →</Link></div>
          </div>
        </div>
      </section>

      {/* 04 · Why LawAfrica — a figure ledger. The four proofs used to sit in a
           tinted strip that the white ground swallowed; they are now set as
           oversized numerals in the feature face, each over a rule, so the
           section carries weight without another dark band immediately after
           the carousel. */}
      <section className="proof-band">
        <div className="wrap">
          <SectionHead eyebrow="Why LawAfrica" lead="The reference" tail="practitioners keep">
            A quarter of a century of primary law, commentary and reporting for
            six African jurisdictions &mdash; edited in house, and relied on by the
            bench, the bar and the universities across the region.
          </SectionHead>

          <dl className="proof-ledger">
            {proof.map(s => (
              <div key={s.label}>
                <dt className="tnum">{s.num}</dt>
                <dd>
                  <span>{s.label}</span>
                  <span>{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 05 · Legal insights */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px' }}>
        <SectionHead eyebrow="From our editors" lead="Legal" tail="insights">
          Commentary, analysis and updates on the law from the people who publish it.
        </SectionHead>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 28 }}>
          {articles.map(a => (
            <article key={a.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to={`/insights/article/${a.id}`} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'block' }}>
                <Plate src={a.img} aspectRatio="16/10" />
              </Link>
              <div>
                <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: pillarInk(a.pillar), marginBottom: 7 }}>{a.pillar}</div>
                <Link to={`/insights/article/${a.id}`} style={{ display: 'block', textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', marginBottom: 8, textDecoration: 'none', color: 'inherit' }}>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.25, margin: 0 }}>{a.title}</h3>
                </Link>
                <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 8px' }}>{a.dek}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{a.meta}</span>
                  <Link to={`/insights/article/${a.id}`} className="tap-row" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-accent-700)', borderBottom: '1px solid var(--color-accent-300)', whiteSpace: 'nowrap', textDecoration: 'none' }}>Read more</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}><Link className="btn btn-ghost" to="/insights">All insights →</Link></div>
      </section>

      {/* 06 · Help and contact — elongated. This was three squat cards in a
           row, which made the page end abruptly; it now runs as a tall block,
           an intro rail against four contact routes stacked with real space
           between them, each carrying both an address and a number. */}
      <section className="contact-band">
        <div className="wrap contact-grid">
          <div className="contact-intro">
            <span className="chip-light">Get in touch</span>
            <h2 className="contact-title">
              Talk to
              <span>a publisher</span>
            </h2>
            <p>
              Four ways in, each answered by the people who do the work — not a
              queue. Tell us the jurisdiction and the matter and we will point you
              at the right title, set or subscription.
            </p>
            <dl className="contact-office">
              <div>
                <dt>Office</dt>
                <dd>Funzi Road, off Enterprise Road<br />Industrial Area, Nairobi, Kenya</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Monday to Friday, 8.30am – 5.00pm EAT</dd>
              </div>
              <div>
                <dt>Switchboard</dt>
                <dd><a href="tel:+254202495067">+254 20 249 5067</a></dd>
              </div>
            </dl>
            <Link className="btn btn-primary" to="/contact" style={{ alignSelf: 'flex-start', textDecoration: 'none' }}>Go to the contact page</Link>
          </div>

          <ContactRoutes />
        </div>
      </section>
    </div>
  );
}
