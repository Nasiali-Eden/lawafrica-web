import { Link, useParams } from 'react-router-dom';
import { ebooks } from '../data/ebooks.js';

export default function Ebook() {
  const { id } = useParams();
  const e = ebooks.find(x => x.code === id);

  if (!e) {
    return (
      <div className="page wrap" style={{ paddingBlock: '48px 96px' }}>
        <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: '0 0 10px' }}>eBook not found</h1>
        <p style={{ color: 'var(--color-neutral-700)', marginBottom: 22 }}>We have no eBook with that reference. It may have been withdrawn.</p>
        <Link className="btn btn-primary" to="/ebooks" style={{ textDecoration: 'none' }}>Browse all eBooks</Link>
      </div>
    );
  }

  const facts = [['Format', e.format], ['Language', e.language], ['Edition', e.edition && `Edition ${e.edition}`], ['Publisher', 'LawAfrica']].filter(([, v]) => v);
  const related = ebooks.filter(x => x.id !== e.id).slice(0, 4);

  return (
    <div className="page wrap" style={{ paddingBlock: '28px 72px' }}>
      <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 22 }}>
        <Link to="/ebooks" style={{ color: 'inherit' }}>Home / eBooks</Link> / <span style={{ color: 'var(--color-text)' }}>{e.title}</span>
      </div>
      <div className="stack ebook-detail">
        <div className="ebook-cover ebook-cover-lg"><img src={e.cover} alt="" /></div>
        <div>
          <span className="ebook-fmt">eBook · {e.format || 'digital'}</span>
          <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 30px*var(--tf,1)*var(--tz,1))', lineHeight: 1.06, margin: '12px 0 8px' }} translate="no">{e.title}</h1>
          {e.authors.length > 0 && <p style={{ fontSize: 'calc(var(--t-base) + 5px*var(--tf,1))', color: 'var(--color-neutral-700)', margin: '0 0 20px' }} translate="no">{e.authors.join(', ')}</p>}
          {e.description && <p style={{ fontSize: 'calc(var(--t-base) + 3px*var(--tf,1))', lineHeight: 1.75, maxWidth: '62ch', margin: '0 0 24px' }}>{e.description}</p>}
          <dl className="ebook-facts">
            {facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        </div>
        <aside className="ebook-buy">
          <div className="ebook-buy-price" translate="no">{e.price}</div>
          <div className="ebook-buy-note">VAT included · instant access after purchase</div>
          <a className="btn" href={e.url} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 46, width: '100%' }}>Buy on the digital store ↗</a>
          <p>eBooks are bought and read through the digital store, with its own cart and sign-in.</p>
        </aside>
      </div>

      <h2 className="section-title" style={{ margin: '56px 0 18px' }}>More eBooks</h2>
      <ul className="ebook-grid">
        {related.map(r => (
          <li key={r.id}>
            <Link to={`/ebooks/${r.id}`} className="ebook-card">
              <span className="ebook-cover"><img src={r.cover} alt="" loading="lazy" /></span>
              <span className="ebook-title" translate="no">{r.title}</span>
              <span className="ebook-foot"><span className="ebook-fmt">{r.format || 'eBook'}</span><span className="ebook-price" translate="no">{r.price}</span></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
