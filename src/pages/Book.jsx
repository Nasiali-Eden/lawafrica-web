import { useState } from 'react';
import { Link } from 'react-router-dom';
import BookCover from '../components/BookCover.jsx';
import BookTile from '../components/BookTile.jsx';
import { book, biblio, featured } from '../data/books.js';
import { useBasket } from '../state/BasketContext.jsx';
import { money } from '../lib/format.js';

export default function Book() {
  const [fmt, setFmt] = useState('print');
  const { addItem, added } = useBasket();
  const isPrint = fmt === 'print';
  const unit = isPrint ? 6500 : 4800;
  const key = 'CON-25|' + (isPrint ? 'Print' : 'Digital');
  const addLabel = added === key ? 'Added to basket ✓' : 'Add to basket · ' + money(unit);

  const optStyle = active => ({
    display: 'flex', alignItems: 'center', gap: 10, borderRadius: 4, padding: '11px 13px', cursor: 'pointer',
    font: 'inherit', textAlign: 'left',
    border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-divider)'}`,
    background: active ? 'var(--color-accent-100)' : 'transparent'
  });
  const dotStyle = active => ({ width: 14, height: 14, borderRadius: '50%', background: '#fff', flex: 'none', border: active ? '4px solid var(--color-accent)' : '1px solid var(--color-neutral-400)' });

  return (
    <div className="page">
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '28px 24px 20px' }}>
        <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>Home / Books / Commercial law / <span style={{ color: 'var(--color-text)' }}>{book.title}</span></div>
      </div>
      <div className="stack product-stack" style={{ maxWidth: 1180, margin: '0 auto', padding: '0 24px 56px', display: 'grid', gridTemplateColumns: '320px 1fr 300px', gap: 44, alignItems: 'start' }}>
        <div>
          <BookCover title={book.title} author={book.author} variant="plain" style={{ marginBottom: 14 }} />
          <button className="btn btn-secondary btn-block">Read a sample chapter</button>
          <button className="btn btn-secondary btn-block">View table of contents</button>
        </div>
        <div>
          <div style={{ display: 'flex', gap: 7, marginBottom: 14 }}>
            <span className="tag tag-accent">Kenya</span>
            <span className="tag tag-accent">Commercial law</span>
            <span className="tag tag-neutral">Practitioner</span>
          </div>
          <h1 style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', fontWeight: 400, lineHeight: 1.05, margin: '0 0 10px' }}>{book.title}</h1>
          <p style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--color-neutral-700)', marginBottom: 6 }}>{book.author} · {book.credential}</p>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 22 }}>{book.edline} · LawAfrica Publishing</p>
          <hr className="hr" style={{ margin: '0 0 22px' }} />
          <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, marginBottom: 10 }}>What this book covers</h3>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, textAlign: 'justify', marginBottom: 14 }}>A practitioner's treatment of the law of contract as applied in Kenya, set against the wider East African commercial context. The text moves from formation and consideration through to remedies, with the 2025 edition rewritten to reflect recent Court of Appeal authority on electronic contracting and unconscionable terms.</p>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.75, textAlign: 'justify', marginBottom: 22 }}>Written for advocates in practice and for in-house counsel who need a reliable first reference before turning to primary sources. Each chapter closes with a table of the leading authorities and a short note on where the position differs in Tanzania and Uganda.</p>
          <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, marginBottom: 12 }}>Bibliographic detail</h3>
          <div className="table-scroll" style={{ marginBottom: 26 }}>
          <table className="table">
            <tbody>
              {biblio.map(r => (
                <tr key={r.k}><th style={{ width: 190, textTransform: 'none', letterSpacing: 0, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', fontFamily: 'var(--font-body)' }}>{r.k}</th><td>{r.v}</td></tr>
              ))}
            </tbody>
          </table>
          </div>
          <h3 style={{ fontSize: 'calc(var(--t-base) + 10px*var(--tf,1)*var(--tz,1))', fontWeight: 400, marginBottom: 14 }}>Related titles</h3>
          {/* This sits in the ~425px middle column, so a fixed 4-up collapsed the
              tiles to ~90px (and plain 1fr sized them off min-content, so they
              came out unequal). Fit as many readable 170px tiles as fit. */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(170px,1fr))', gap: 16 }}>
            {featured.map(b => <BookTile key={b.code} b={b} show={{ author: false, edline: false, price: false }} />)}
          </div>
        </div>
        <aside style={{ position: 'sticky', top: 96, border: '1px solid var(--color-divider)', borderRadius: 4, padding: 22, background: 'var(--color-surface)' }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>Choose a format</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            <button onClick={() => setFmt('print')} style={optStyle(isPrint)}>
              <span style={dotStyle(isPrint)} />
              <span style={{ flex: 1, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Print · hardback</span><span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))' }}>KES 6,500</span>
            </button>
            <button onClick={() => setFmt('ebook')} style={optStyle(!isPrint)}>
              <span style={dotStyle(!isPrint)} />
              <span style={{ flex: 1, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Digital · instant access</span><span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))' }}>KES 4,800</span>
            </button>
          </div>
          <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-success)', marginBottom: 14 }}>● In stock — dispatched within 2 working days</div>
          <button className="btn btn-block" onClick={() => addItem({ code: 'CON-25', title: book.title, author: 'Prof. A. Mwangi · 4th edition 2025', fmt: isPrint ? 'Print' : 'Digital', unit })} style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 44, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 0 }}>{addLabel}</button>
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
