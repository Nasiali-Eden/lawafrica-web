import { Link, useParams } from 'react-router-dom';
import BookCover from '../components/BookCover.jsx';
import BookTile from '../components/BookTile.jsx';
import { books, featured } from '../data/books.js';
import { useBasket } from '../state/BasketContext.jsx';
import { money } from '../lib/format.js';
import { whatsappLink, bookInquiry } from '../lib/whatsapp.js';

export default function Book() {
  const { code } = useParams();
  const { addItem, added } = useBasket();

  // The page used to read one hardcoded record, so every code — including one
  // that does not exist — rendered the same title at the same price. It reads
  // the code off the URL now, and says so when there is no such title rather
  // than quietly showing a different book.
  const book = books.find(b => b.code === code);
  if (!book) {
    return (
      <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 24px 96px' }}>
        <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 18 }}>Home / Books</div>
        <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: '0 0 10px' }}>Title not found</h1>
        <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-700)', maxWidth: '52ch', marginBottom: 22 }}>
          We have no title with the reference <strong>{code}</strong>. It may have been
          withdrawn, or the link may be mistyped.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/books" style={{ textDecoration: 'none' }}>Browse all books</Link>
          <Link className="btn btn-secondary" to="/contact" style={{ textDecoration: 'none' }}>Ask us about it</Link>
        </div>
      </div>
    );
  }

  // Price, format and stock are the catalogue's own; nothing is derived.
  const unit = book.unit;
  const key = book.code + '|' + book.format;
  const addLabel = added === key ? 'Added to basket ✓' : 'Add to basket · ' + money(unit);

  return (
    <div className="page">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 20px' }}>
        <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Home / Books / <span style={{ color: 'var(--color-text)' }}>{book.title}</span></div>
      </div>
      <div className="stack product-stack" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 56px', display: 'grid', gridTemplateColumns: '320px 1fr 300px', gap: 44, alignItems: 'start' }}>
        <div>
          <BookCover title={book.title} author={book.author} src={book.cover} variant="plain" style={{ marginBottom: 14 }} />
        </div>
        <div>
          <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
            <span className="tag tag-accent">Print</span>
          </div>
          <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', lineHeight: 1.05, margin: '0 0 10px' }} translate="no">{book.title}</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 22 }}>LawAfrica Publishing</p>
          <hr className="hr" style={{ margin: '0 0 22px' }} />
          <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, marginBottom: 14 }}>Related titles</h3>
          {/* This sits in the ~425px middle column, so a fixed 4-up collapsed the
              tiles to ~90px (and plain 1fr sized them off min-content, so they
              came out unequal). Fit as many readable 170px tiles as fit. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 16 }}>
            {featured.map(b => <BookTile key={b.code} b={b} show={{ author: false, edline: false, price: false }} />)}
          </div>
        </div>
        <aside style={{ position: 'sticky', top: 96, border: '1px solid var(--color-divider)', borderRadius: 4, padding: 22, background: 'var(--color-surface)' }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>Format</div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Print</span>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1))' }} translate="no">{money(unit)}</span>
          </div>
          <button className="btn btn-block" onClick={() => addItem({ code: book.code, title: book.title, author: '', fmt: book.format, unit })} style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 44, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 0 }}>{addLabel}</button>
          <a className="btn btn-block wa-btn" href={whatsappLink(bookInquiry({ title: book.title, price: book.price }))} target="_blank" rel="noopener noreferrer" style={{ minHeight: 44, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', textDecoration: 'none' }}>Ask about this book on WhatsApp</a>
          <Link className="btn btn-secondary btn-block" to="/basket" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', textDecoration: 'none' }}>View basket</Link>
          <button className="btn btn-primary btn-block" style={{ minHeight: 44, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Request an institutional quote</button>
          <hr className="hr" />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>
            <li>Delivery across Kenya, Tanzania and Uganda</li>
            <li>Secure payment · card, M-Pesa or invoice</li>
            <li>14-day returns on undamaged print titles</li>
            <li>Bulk and standing-order pricing available</li>
          </ul>
          <hr className="hr" />
          <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>Need help choosing an edition? <Link to="/contact">Talk to our sales team</Link></div>
        </aside>
      </div>
    </div>
  );
}
