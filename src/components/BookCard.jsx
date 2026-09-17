import { Link } from 'react-router-dom';
import BookCover from './BookCover.jsx';
import { useBasket } from '../state/BasketContext.jsx';

// Full catalogue card: cover, tags, title, author/edline, price + stock,
// and live add-to-basket / preview actions.
export default function BookCard({ b }) {
  const { addItem, added } = useBasket();
  const key = b.code + '|' + b.fmt;
  const addLabel = added === key ? 'Added ✓' : 'Add to basket';

  return (
    <div className="card" style={{ padding: 0, border: 0, gap: 12 }}>
      <Link to={`/books/${b.code}`} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', display: 'block' }}>
        <BookCover title={b.title} author={b.author} />
      </Link>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <span className="tag tag-neutral">{b.juris}</span>
        <span className="tag tag-outline">{b.format}</span>
      </div>
      <Link to={`/books/${b.code}`} className="tap-row" style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.15, textDecoration: 'none', color: 'inherit' }}>{b.title}</Link>
      <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', lineHeight: 1.5 }}>{b.author}<br />{b.edline}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))' }}>{b.price}</span>
        <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: b.stockColor }}>{b.stock}</span>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn" onClick={() => addItem({ code: b.code, title: b.title, author: b.author, fmt: b.fmt, unit: b.unit })} style={{ background: 'var(--color-accent)', color: '#fff', flex: 1, whiteSpace: 'nowrap' }}>{addLabel}</button>
        <Link className="btn btn-secondary" to={`/books/${b.code}`} style={{ textDecoration: 'none' }}>Preview</Link>
      </div>
    </div>
  );
}
