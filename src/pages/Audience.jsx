import { useSearchParams, Link } from 'react-router-dom';
import { audiences } from '../data/audiences.js';
import { featured } from '../data/books.js';
import BookTile from '../components/BookTile.jsx';

export default function Audience() {
  const [params, setParams] = useSearchParams();
  const isPro = params.get('aud') !== 'stu';
  const aud = audiences[isPro ? 'pro' : 'stu'];

  const tabStyle = active => ({ cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', padding: '9px 20px', border: 0, background: active ? 'var(--color-accent)' : 'transparent', color: '#fff', textDecoration: 'none' });

  return (
    <div className="page">
      <section style={{ minHeight: 420, display: 'flex', alignItems: 'center', color: 'var(--color-bg)' }}>
        <div style={{ maxWidth: 1180, margin: '0 auto', padding: '96px 24px 40px', width: '100%' }}>
          <div style={{ display: 'flex', gap: 0, marginBottom: 26, border: '1px solid rgba(255,255,255,.4)', borderRadius: 4, overflow: 'hidden', width: 'max-content' }}>
            <button onClick={() => setParams({ aud: 'pro' })} style={tabStyle(isPro)}>For Professionals</button>
            <button onClick={() => setParams({ aud: 'stu' })} style={{ ...tabStyle(!isPro), borderLeft: '1px solid rgba(255,255,255,.4)' }}>For Students</button>
          </div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 12px', lineHeight: 1.05, maxWidth: 760, color: '#fff' }}>{aud.h1}</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.65, color: 'rgba(246,245,244,.82)', maxWidth: 660 }}>{aud.dek}</p>
        </div>
      </section>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '44px 24px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: 20, marginBottom: 48 }}>
          {aud.cards.map(c => (
            <div key={c.title} className="card" style={{ padding: 24, gap: 10 }}>
              <div className="card-kicker">{c.kicker}</div>
              <div className="card-title" style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))' }}>{c.title}</div>
              <p className="card-body" style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65 }}>{c.body}</p>
              <Link className="btn btn-primary" to="/books" style={{ alignSelf: 'flex-start', marginTop: 6, textDecoration: 'none' }}>{c.cta}</Link>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 22 }}>
          <h2 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: 0 }}>{aud.listTitle}</h2>
          <span style={{ flex: 1, height: 1, background: 'var(--color-divider)' }} />
          <Link className="btn btn-ghost" to="/books">See all →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,190px),1fr))', gap: 24, marginBottom: 52 }}>
          {featured.map(b => <BookTile key={b.code} b={b} show={{ author: false, edline: true, price: true }} />)}
        </div>
        <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 30, background: 'var(--color-surface)', display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontWeight: 400, margin: '0 0 8px' }}>{aud.ctaTitle}</h3>
            <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)', margin: 0, maxWidth: 620 }}>{aud.ctaBody}</p>
          </div>
          <Link className="btn" to="/contact" style={{ background: 'var(--color-accent)', color: '#fff', padding: '13px 24px', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', whiteSpace: 'nowrap', textDecoration: 'none' }}>{aud.ctaBtn}</Link>
        </div>
      </div>
    </div>
  );
}
