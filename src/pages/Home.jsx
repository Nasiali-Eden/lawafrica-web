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
import { caseList } from '../data/cases.js';
import { allArticles } from '../data/articles.js';

const deskCases = caseList.slice(0, 3);
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

  return (
    <div className="page">
      {/* Hero */}
      <section style={{ minHeight: 530, display: 'flex', alignItems: 'flex-end', color: 'var(--color-bg)' }}>
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
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 49px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, letterSpacing: 'var(--ls-heading,-.02em)', margin: '0 0 18px', color: '#fff', textWrap: 'pretty', maxWidth: '16ch' }}>{current.title}</h1>
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

      {/* 01 · The desk */}
      <section style={{ maxWidth: 1180, margin: '-46px auto 0', padding: '0 24px', position: 'relative', zIndex: 5 }}>
        <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-divider)', borderRadius: 4, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '20px 26px 16px', borderBottom: '1px solid var(--color-divider)', flexWrap: 'wrap' }}>
            <SectionNum n="01" />
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', margin: 0 }}>The desk</h2>
            <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Start with the task you came for, not with our menu.</span>
          </div>
          <div className="stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr .82fr' }}>
            <div style={{ padding: '22px 26px 26px', borderRight: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>Find a title</div>
              <div className="field"><label>Title, author or keyword</label><input className="input" placeholder="e.g. law of contract" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 12 }}>
                <div className="field"><label>Jurisdiction</label><select className="input"><option>All jurisdictions</option><option>Kenya</option><option>Tanzania</option><option>Uganda</option></select></div>
                <div className="field"><label>Practice area</label><select className="input"><option>All areas</option><option>Commercial</option><option>Constitutional</option><option>Land &amp; conveyancing</option></select></div>
              </div>
              <button className="btn" onClick={() => navigate('/books')} style={{ background: 'var(--color-accent)', color: '#fff', alignSelf: 'flex-start', paddingInline: 26, marginTop: 2 }}>Search the catalogue</button>
            </div>
            <div style={{ padding: '22px 26px 26px', borderRight: '1px solid var(--color-divider)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>Search the Law Reports</div>
              <div className="field"><label>Party name, keyword or catchword</label><input className="input" placeholder="e.g. structural interdict" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 12 }}>
                <div className="field"><label>Citation</label><input className="input" placeholder="[2021] KESC 34" /></div>
                <div className="field"><label>Court</label><select className="input"><option>All courts</option><option>Supreme Court</option><option>Court of Appeal</option><option>High Court</option></select></div>
              </div>
              <button className="btn btn-primary" onClick={() => window.open(LLR_URL, '_blank', 'noopener')} style={{ alignSelf: 'flex-start', paddingInline: 26, marginTop: 2 }}>Search judgments</button>
            </div>
            <div style={{ padding: '22px 26px 26px', background: 'var(--color-surface)', borderRadius: '0 0 4px 0' }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>On the desk this week</div>
              {deskCases.map(c => (
                <button key={c.id} onClick={() => window.open(LLR_URL, '_blank', 'noopener')} style={{ width: '100%', textAlign: 'left', background: 'none', border: 0, borderTop: '1px solid var(--color-divider)', padding: '11px 0', cursor: 'pointer', font: 'inherit', display: 'block' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.25, display: 'block', marginBottom: 3 }}>{c.name}</span>
                  <span style={{ fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)' }}>{c.cite} · {c.shortCourt}</span>
                </button>
              ))}
            </div>
          </div>
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

      {/* 04 · Law Reports */}
      <section style={{ marginTop: 56, background: 'var(--ground-brand)', color: 'var(--on-brand-body)', borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--on-brand-eyebrow)', marginBottom: 16 }}>03 · LawAfrica Law Reports</div>
            <h2 style={{ fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 16px', color: 'var(--on-brand)', lineHeight: 1.15 }}>Twenty-five years of reported judgments, searchable in one place.</h2>
            <p style={{ color: 'var(--on-brand-body)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, maxWidth: 480, marginBottom: 24 }}>Court of Appeal, High Court and specialised tribunal decisions from Kenya, Tanzania and Uganda — headnoted, catchworded and cross-cited by our editorial team.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn" href={LLR_URL} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--on-brand)', color: 'var(--ground-brand)', padding: '12px 22px', textDecoration: 'none' }}>Search case law</a>
              <Link className="btn btn-primary" to="/llr" style={{ color: 'var(--on-brand)', borderColor: 'rgba(255,255,255,.4)', padding: '12px 22px', textDecoration: 'none' }}>About LLR</Link>
            </div>
          </div>
          <div style={{ border: '1px solid rgba(255,255,255,.18)', borderRadius: 4, padding: 24, background: 'rgba(255,255,255,.03)' }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--on-brand-muted)', marginBottom: 14 }}>Recently reported</div>
            {deskCases.map(c => (
              <button key={c.id} onClick={() => window.open(LLR_URL, '_blank', 'noopener')} style={{ width: '100%', textAlign: 'left', display: 'block', background: 'none', border: 0, borderBottom: '1px solid rgba(255,255,255,.12)', padding: '12px 0', cursor: 'pointer', font: 'inherit' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--on-brand)', marginBottom: 3, display: 'block', lineHeight: 1.25 }}>{c.name}</span>
                <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--on-brand-muted)', fontFamily: 'ui-monospace,Menlo,monospace' }}>{c.cite} · {c.shortCourt}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 05 · What we publish — the one section on Home that is neither a grid
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

      {/* 06 · Why LawAfrica */}
      <section style={{ borderTop: '1px solid var(--color-divider)', borderBottom: '1px solid var(--color-divider)', background: 'var(--color-surface)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 24px' }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 26 }}>05 · Why LawAfrica</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 1, background: 'var(--color-divider)' }}>
            {proof.map(s => (
              <div key={s.label} style={{ background: 'var(--color-surface)', padding: '4px 22px 4px 0' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', lineHeight: 1, fontWeight: 'var(--fw-heading,400)', fontVariantNumeric: 'tabular-nums', marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', fontFamily: 'var(--font-heading)', marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>{s.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 · Legal insights */}
      <section style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 26 }}>
          <SectionNum n="06" />
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

      {/* 07 · Feedback */}
      <section style={{ borderTop: '1px solid var(--color-divider)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '56px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 48, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 16 }}>
                <SectionNum n="07" />
                <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>Tell us what to fix</h2>
              </div>
              <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', maxWidth: 460, margin: 0 }}>Wrong edition, broken link, a search that didn't find what it should — this site is worked on continually, and every note goes straight to the desk that owns it.</p>
            </div>
            <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 24, background: 'var(--color-surface)' }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>Quick feedback</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {['Great', 'Okay', 'Not great'].map(f => (
                  <button key={f} type="button" className="tag tag-outline" style={{ cursor: 'pointer', padding: '6px 14px', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))' }}>{f}</button>
                ))}
              </div>
              <textarea className="input" placeholder="What should we know?" style={{ minHeight: 64, marginBottom: 10 }} />
              <div style={{ display: 'flex', gap: 8 }}>
                <input className="input" placeholder="Email (optional)" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }} />
                <button className="btn btn-primary" style={{ minHeight: 40, whiteSpace: 'nowrap' }}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 · Help and contact — elongated. This was three squat cards in a
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
