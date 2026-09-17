import { useSearchParams, Link } from 'react-router-dom';
import { allArticles } from '../data/articles.js';
import { events } from '../data/events.js';
import Plate from '../components/Plate.jsx';

const TABS = ['All', 'Articles', 'Blog', 'Case notes', 'Events', 'Press'];

export default function Insights() {
  const [params, setParams] = useSearchParams();
  const feed = params.get('feed') || 'All';
  const showLead = feed === 'All';
  const showEvents = feed === 'All' || feed === 'Events';
  const showFeed = feed !== 'Events';
  const feedItems = feed === 'All' ? allArticles : allArticles.filter(a => a.kind === feed);
  const leadMain = allArticles[0];
  const leadSecond = allArticles[1];

  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 24px 64px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 18 }}>
        <div>
          <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: '0 0 10px' }}>Insights &amp; events</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--color-neutral-700)', maxWidth: 660, margin: 0 }}>One newsroom for everything we publish outside the catalogue — legal updates, case notes, the editors' blog, press announcements and the events diary. Nothing off-topic, nothing stale.</p>
        </div>
        <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '16px 18px', maxWidth: 320 }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>Monthly digest</div>
          <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 10px' }}>New judgments, new editions and upcoming events, once a month.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input className="input" placeholder="you@firm.co.ke" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }} />
            <button className="btn btn-primary" style={{ minHeight: 40, whiteSpace: 'nowrap' }}>Subscribe</button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
        {TABS.map(t => (
          <button key={t} className={t === feed ? 'tag tag-accent' : 'tag tag-neutral'} onClick={() => setParams(t === 'All' ? {} : { feed: t })} style={{ padding: '7px 15px', cursor: 'pointer', border: '1px solid var(--color-divider)', font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>{t}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', fontVariantNumeric: 'tabular-nums' }}>{feedItems.length} pieces · updated weekly</span>
      </div>
      <hr className="hr" style={{ margin: '12px 0 30px' }} />

      {showLead && (
        <section className="stack" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 38, paddingBottom: 40, marginBottom: 40, borderBottom: '1px solid var(--color-text)' }}>
          <article>
            <Plate src={leadMain.img} aspectRatio="16/9" style={{ marginBottom: 18 }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{leadMain.pillar}</span>
              <span style={{ width: 22, height: 1, background: 'var(--color-accent)' }} />
              <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{leadMain.read}</span>
            </div>
            <Link to={`/insights/article/${leadMain.id}`} style={{ display: 'block', textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              <h2 className="lead-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 23px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.15, margin: '0 0 12px', textWrap: 'pretty' }}>{leadMain.title}</h2>
            </Link>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', margin: '0 0 14px', maxWidth: '60ch' }}>{leadMain.dek}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link className="btn btn-primary" to={`/insights/article/${leadMain.id}`} style={{ minHeight: 40, textDecoration: 'none' }}>Read the piece →</Link>
              <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{leadMain.author} · {leadMain.date}</span>
            </div>
          </article>
          <article style={{ borderLeft: '1px solid var(--color-divider)', paddingLeft: 34 }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 14 }}>Also this week</div>
            <Plate src={leadSecond.img} aspectRatio="4/3" style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 8 }}>{leadSecond.pillar}</div>
            <Link to={`/insights/article/${leadSecond.id}`} style={{ display: 'block', textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
              <h2 className="lead-title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.15, margin: '0 0 10px', textWrap: 'pretty' }}>{leadSecond.title}</h2>
            </Link>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 12px' }}>{leadSecond.dek}</p>
            <Link className="btn btn-secondary" to={`/insights/article/${leadSecond.id}`} style={{ minHeight: 38, textDecoration: 'none' }}>Read the piece →</Link>
            <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', marginTop: 12 }}>{leadSecond.author} · {leadSecond.date}</div>
          </article>
        </section>
      )}

      {showEvents && (
        <section style={{ marginBottom: 44 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 20 }}>
            <h2 className="section-title" style={{ margin: 0 }}>Events diary</h2>
            <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
            <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Webinars, launches, CPD workshops and academic forums</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: '0 34px' }}>
            {events.map(e => (
              <article key={e.id} style={{ display: 'grid', gridTemplateColumns: '74px 1fr', gap: 20, padding: '22px 0', borderTop: '1px solid var(--color-divider)', alignItems: 'start' }}>
                <div style={{ border: '1px solid var(--color-accent)', borderRadius: 4, padding: '9px 4px 10px', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', lineHeight: 1, color: 'var(--color-accent-700)' }}>{e.d}</div>
                  <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-700)', marginTop: 4 }}>{e.mo}</div>
                  <div style={{ fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)' }}>{e.yr}</div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 6 }}>{e.kind}</div>
                  <Link to={`/insights/event/${e.id}`} style={{ display: 'block', textAlign: 'left', background: 'none', border: 0, padding: 0, cursor: 'pointer', marginBottom: 6, textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.25, margin: 0 }}>{e.title}</h3>
                  </Link>
                  <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', marginBottom: 8 }}>{e.where}</div>
                  <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 12px' }}>{e.body}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <Link className="btn btn-primary" to={`/insights/event/${e.id}`} style={{ minHeight: 40, textDecoration: 'none' }}>{e.cta}</Link>
                    <Link className="btn btn-ghost" to={`/insights/event/${e.id}`} style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none' }}>Details</Link>
                    <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{e.spots}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {showFeed && (
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 24 }}>
            <h2 className="section-title" style={{ margin: 0 }}>Latest writing</h2>
            <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 32 }}>
            {feedItems.map(a => (
              <article key={a.id} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Link to={`/insights/article/${a.id}`} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'block' }}>
                  <Plate src={a.img} aspectRatio="16/10" />
                </Link>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 7 }}>
                    <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>{a.pillar}</span>
                    <span className="tag tag-outline" style={{ fontSize: 'var(--t-base)', padding: '2px 8px', whiteSpace: 'nowrap' }}>{a.kind}</span>
                  </div>
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
      )}
    </div>
  );
}
