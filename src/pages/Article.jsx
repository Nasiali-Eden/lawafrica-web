import { useParams, Link } from 'react-router-dom';
import { allArticles, artBodies, pillarInk } from '../data/articles.js';
import Plate from '../components/Plate.jsx';

export default function Article() {
  const { id } = useParams();
  const art = allArticles.find(a => a.id === id) || allArticles[0];
  const body = artBodies[art.id] || {};
  const stand = body.stand || art.dek;
  const secs = body.secs || [];
  const keys = body.keys || [];
  const sources = body.sources || [];
  const hasSources = sources.length > 0;
  const live = !!art.live;
  const stub = !live;
  const initial = (art.author || 'L').replace(/^(Dr|Prof)\.?\s+/i, '').slice(0, 1);
  const more = allArticles.filter(a => a.id !== art.id).slice(0, 4);

  return (
    <div className="page">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '26px 24px 12px', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Link to="/insights" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-accent-700)', whiteSpace: 'nowrap', textDecoration: 'none' }}>Insights &amp; events</Link>
        <span>/</span><span>{art.kind}</span><span>/</span><span>{art.pillar}</span>
      </div>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 30px', borderBottom: '1px solid var(--color-text)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 44, height: 2, background: 'var(--color-accent)' }} />
          <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: pillarInk(art.pillar) }}>{art.pillar}</span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.05, letterSpacing: 'var(--ls-heading,-.02em)', margin: '0 0 18px', maxWidth: '24ch', textWrap: 'pretty' }}>{art.title}</h1>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--color-neutral-800)', margin: '0 0 22px', maxWidth: '62ch' }}>{stand}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--color-accent)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-accent-700)', flex: 'none' }}>{initial}</span>
            <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-text)' }}>{art.author}</span>
          </span>
          <span>{art.role}</span>
          <span style={{ color: 'var(--color-neutral-600)' }}>{art.date} · {art.read}</span>
          <span style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ minHeight: 34, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Save</button>
            <button className="btn btn-ghost" style={{ minHeight: 34, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Share</button>
            <button className="btn btn-ghost" style={{ minHeight: 34, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>Print</button>
          </span>
        </div>
      </div>

      <div className="stack" style={{ maxWidth: 1180, margin: '0 auto', padding: '30px 24px 72px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 268px', gap: 52, alignItems: 'start' }}>
        <article style={{ minWidth: 0 }}>
          <Plate src={art.img} aspectRatio="16/9" style={{ marginBottom: 30 }} />

          {stub && (
            <div style={{ borderLeft: '2px solid var(--color-accent)', background: 'var(--color-accent-100)', padding: '16px 18px', marginBottom: 26, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)' }}>
              This piece is listed in the prototype but not yet written out in full. The two lead pieces on the Insights index carry complete text.
            </div>
          )}

          {secs.map(sec => (
            <section key={sec.h} style={{ marginBottom: 30 }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 'var(--fw-heading,400)', lineHeight: 1.15, margin: '0 0 14px', paddingBottom: 9, borderBottom: '1px solid var(--color-divider)' }}>{sec.h}</h2>
              {sec.ps.map((p, i) => (
                <p key={i} style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.75, margin: '0 0 15px', color: 'var(--color-neutral-800)', textAlign: 'justify', hyphens: 'auto', maxWidth: '70ch' }}>{p.t}</p>
              ))}
            </section>
          ))}

          {hasSources && (
            <section style={{ borderTop: '1px solid var(--color-text)', paddingTop: 20, marginTop: 8 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 11 }}>Sources &amp; authorities</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sources.map((s, i) => (
                  <li key={i} style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10 }}><span style={{ color: 'var(--color-accent-700)' }}>·</span>{s.t}</li>
                ))}
              </ul>
              <p style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-600)', margin: '16px 0 0', maxWidth: '70ch' }}>Published for information. Nothing here is legal advice, and the position may have moved since publication — check the current text of the legislation and the reports before relying on it.</p>
            </section>
          )}
        </article>

        <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 22 }}>
          {live && (
            <div style={{ border: '1px solid var(--color-accent)', borderRadius: 4, padding: 18 }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 11 }}>In short</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                {keys.map((k, i) => (
                  <li key={i} style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-800)', display: 'grid', gridTemplateColumns: '14px 1fr', gap: 9 }}><span style={{ color: 'var(--color-accent-700)', fontSize: 'var(--t-base)', paddingTop: 3 }}>✦</span>{k.t}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 9 }}>More in {art.kind}</div>
            {more.map(a => (
              <Link key={a.id} to={`/insights/article/${a.id}`} style={{ width: '100%', textAlign: 'left', display: 'block', background: 'none', border: 0, borderTop: '1px solid var(--color-divider)', padding: '12px 0', cursor: 'pointer', font: 'inherit', textDecoration: 'none', color: 'inherit' }}>
                <span style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: pillarInk(a.pillar), display: 'block', marginBottom: 4 }}>{a.pillar}</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.25, display: 'block' }}>{a.title}</span>
              </Link>
            ))}
          </div>
          <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 18, background: 'var(--color-surface)' }}>
            <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-accent-700)', marginBottom: 8 }}>Monthly digest</div>
            <p style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', margin: '0 0 11px' }}>Pieces like this one, once a month.</p>
            <input className="input" placeholder="you@firm.co.ke" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', marginBottom: 8 }} />
            <button className="btn btn-primary btn-block" style={{ minHeight: 40, marginTop: 0 }}>Subscribe</button>
          </div>
        </aside>
      </div>
    </div>
  );
}
