import { Link } from 'react-router-dom';
import BookCover from './BookCover.jsx';

// Grid tile used on Home, product "related titles" and Audience —
// cover jacket + title/author/edline/price beneath (fields toggle per context).
export default function BookTile({ b, show = { author: true, edline: true, price: true } }) {
  return (
    <Link to={`/books/${b.code}`} style={{ background: 'none', border: 0, padding: 0, textAlign: 'left', cursor: 'pointer', font: 'inherit', display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none', color: 'inherit' }}>
      <BookCover title={b.title} author={b.author} />
      <div>
        <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1.15, marginBottom: 4 }}>{b.title}</div>
        {show.author && <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{b.author}</div>}
        {show.edline && <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{b.edline}</div>}
        {show.price && <div style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 5 }}>{b.price}</div>}
      </div>
    </Link>
  );
}
