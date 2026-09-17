import { Link, useNavigate } from 'react-router-dom';
import { LLR_URL } from './LLR.jsx';
import { useHero } from '../state/HeroContext.jsx';
import BookTile from '../components/BookTile.jsx';
import CardCarousel from '../components/CardCarousel.jsx';
import Plate from '../components/Plate.jsx';
import { featured, jurisdictions, areas } from '../data/books.js';
import { proof } from '../data/home.js';
import { publishingLines } from '../data/publishing.js';
import { contacts } from '../data/footer.js';
import { allArticles } from '../data/articles.js';

const articles = allArticles.slice(0, 3);

function SectionNum({ n }) {
  return <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-accent-700)' }}>{n}</span>;
}

export default function Home() {
  const { current, dots, listLayout } = useHero();
  const navigate = useNavigate();

  // Judgments live on the LLR platform now, so a slide about a case hands off
  // there instead of opening an in-site reader.
  const heroAct = () => (current.caseId ? window.open(LLR_URL, '_blank', 'noopener') : navigate(current.to));

  // The slides' headlines run to different lengths. Left alone the hero grows
  // and shrinks with each one, and everything below it — the desk card most
  // visibly — jumps. Reserving the tallest headline keeps the band, and so the
  // desk, still. The longest slide takes four lines at the display step's 1.05
  // leading; the margin is in the reservation so the block below never shifts.
  const headlineBox = { minHeight: 'calc(4 * 1.05em + 18px)' };

  return (
    <div className="page">
      {/* Hero */}
      <section className="hero-copy" style={{ minHeight: 530, display: 'flex', alignItems: 'flex-end', color: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: listLayout === 'horizontal' ? '96px 24px 130px' : '96px 24px 64px', width: '100%' }}>
          {/* minmax(0,…) on both tracks: the headline and the button row have a
              min-content width wider than their share of a phone, and a bare fr
              would let that stretch the track past the screen. */}
          <div className="stack" style={{ display: 'grid', gridTemplateColumns: listLayout === 'vertical' ? 'minmax(0,1.25fr) minmax(0,.75fr)' : 'minmax(0,1fr)', gap: 56, alignItems: 'end' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <span style={{ width: 52, height: 2, background: 'var(--gold-400)' }} />
                <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--gold-400)' }}>{current.kicker}</span>
              </div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 49px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, letterSpacing: 'var(--ls-heading,-.02em)', margin: '0 0 18px', color: '#fff', textWrap: 'pretty', maxWidth: '16ch', ...headlineBox }}>{current.title}</h1>
              <div style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', letterSpacing: 0, color: 'rgba(246,245,244,.78)', marginBottom: 26 }}>{current.meta}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button className="btn" onClick={heroAct} style={{ background: 'var(--color-bg)', color: 'var(--ground-brand)', padding: '13px 26px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>{current.cta}</button>
                <button className="btn" onClick={() => window.open(LLR_URL, '_blank', 'noopener')} style={{ border: '1px solid rgba(255,255,255,.5)', color: 'var(--color-bg)', background: 'transparent', padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Search the Law Reports</button>
              </div>
            </div>
            {listLayout === 'vertical' && (
              <div style={{ borderTop: '1px solid rgba(255,255,255,.28)', paddingTop: 14 }}>
                <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(246,245,244,.6)', marginBottom: 6 }}>This week at LawAfrica</div>
                {dots.map(d => (
                  <button key={d.num} onClick={d.go} style={{ width: '100%', display: 'grid', gridTemplateColumns: '30px 1fr', gap: 12, alignItems: 'baseline', background: 'none', border: 0, borderTop: `1px solid ${d.active ? 'var(--gold-400)' : 'rgba(255,255,255,.28)'}`, padding: '11px 0', cursor: 'pointer', font: 'inherit', textAlign: 'left', color: 'var(--color-bg)', opacity: d.active ? 1 : .55, transition: 'opacity .3s ease,border-color .3s ease' }}>
                    <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--gold-400)' }}>{d.num}</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.25 }}>{d.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {listLayout === 'horizontal' && (
            <div style={{ marginTop: 34 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'rgba(246,245,244,.6)', marginBottom: 10 }}>This week at LawAfrica</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 28 }}>
                {dots.map(d => (
                  <button key={d.num} onClick={d.go} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8, background: 'none', border: 0, borderTop: `2px solid ${d.active ? 'var(--gold-400)' : 'rgba(255,255,255,.28)'}`, padding: '12px 0 6px', cursor: 'pointer', font: 'inherit', textAlign: 'left', color: '#fff', opacity: d.active ? 1 : .65, transition: 'opacity .3s ease,border-color .3s ease' }}>
                    <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--gold-400)' }}>{d.num}</span>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.25 }}>{d.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 01 · The desk — finding a book, and nothing else. It carried a Law
           Reports search and a "this week" judgment list as well, both of which
           belong to the LLR platform now; without them the card is one row and
           a great deal shorter. */}
      <section className="desk">
        <div className="desk-card">
          <div className="desk-head">
            <SectionNum n="01" />
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

      {/* 02 · Browse legal books */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '60px 24px 10px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
          <SectionNum n="02" />
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Browse legal books</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          <Link className="btn btn-ghost" to="/books">All 480 titles →</Link>
        </div>
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
          </div>
        </div>
      </section>

      {/* 03 · What we publish — the one section on Home that is neither a grid
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

      {/* 04 · Why LawAfrica — a figure ledger. The four proofs used to sit in a
           tinted strip that the white ground swallowed; they are now set as
           oversized numerals in the feature face, each over a rule, so the
           section carries weight without another dark band immediately after
           the carousel. */}
      <section className="proof-band">
        <div className="wrap">
          <div className="proof-head">
            <div>
              <span className="chip-light">04 &middot; Why LawAfrica</span>
              <h2 className="contact-title" style={{ margin: '16px 0 0' }}>
                The reference
                <span>practitioners keep</span>
              </h2>
            </div>
            <p>
              A quarter of a century of primary law, commentary and reporting for
              six African jurisdictions &mdash; edited in house, and relied on by the
              bench, the bar and the universities across the region.
            </p>
          </div>

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
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 26 }}>
          <SectionNum n="05" />
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Legal insights</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          <Link className="btn btn-ghost" to="/insights">All insights →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 28 }}>
          {articles.map(a => (
            <article key={a.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to={`/insights/article/${a.id}`} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'block' }}>
                <Plate src={a.img} aspectRatio="16/10" />
              </Link>
              <div>
                <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 7 }}>{a.pillar}</div>
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

          <div className="contact-routes">
            {contacts.map(c => (
              <div key={c.email} className="contact-route">
                <span className="route-kicker">{c.kicker}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                  <div className="route-links">
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
