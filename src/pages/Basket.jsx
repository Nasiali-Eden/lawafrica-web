import { Link } from 'react-router-dom';
import BookCover from '../components/BookCover.jsx';
import { useBasket } from '../state/BasketContext.jsx';

export default function Basket() {
  const { lines, count, basketCount, bump, drop, subTotal, shipTotal, shipNote, grandTotal } = useBasket();
  const empty = count === 0;

  return (
    <div className="page" style={{ maxWidth: 1180, margin: '0 auto', padding: '34px 24px 64px' }}>
      <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)', marginBottom: 16 }}>
        <Link to="/" className="tap-inline" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-accent-700)', textDecoration: 'none' }}>Home</Link>
        <span style={{ margin: '0 8px' }}>/</span><span>Basket</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 8 }}>
        <h1 className="page-title" style={{ fontSize: 'calc(var(--t-base) + 33px*var(--tf,1)*var(--tz,1))', margin: 0 }}>Your basket</h1>
        <span style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{basketCount}</span>
      </div>
      <hr className="hr" style={{ margin: '14px 0 28px' }} />

      {empty && (
        <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '46px 40px', textAlign: 'center', background: 'var(--color-surface)' }}>
          <h2 className="section-title" style={{ margin: '0 0 8px' }}>Nothing in the basket yet</h2>
          <p style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)', maxWidth: 460, margin: '0 auto 20px' }}>Add a title from the catalogue, or ask us for a quotation if you are buying for a firm, court or library.</p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link className="btn" to="/books" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 44, textDecoration: 'none' }}>Browse the catalogue</Link>
            <Link className="btn btn-secondary" to="/contact" style={{ minHeight: 44, textDecoration: 'none' }}>Request a quotation</Link>
          </div>
        </div>
      )}

      {!empty && (
        <div className="stack" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 44, alignItems: 'start' }}>
          <div>
            <div className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 118px 120px 34px', gap: 16, paddingBottom: 10, borderBottom: '1px solid var(--color-divider)', fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)' }}>
              <span>Title</span><span style={{ textAlign: 'center' }}>Quantity</span><span style={{ textAlign: 'right' }}>Amount</span><span />
            </div>
            {lines.map(l => (
              <div key={l.key} className="stack-sm" style={{ display: 'grid', gridTemplateColumns: '1fr 118px 120px 34px', gap: 16, padding: '20px 0', borderBottom: '1px solid var(--color-divider)', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <BookCover title="" author="" variant="plain" style={{ width: 56, flex: 'none' }} />
                  <div>
                    <h3 style={{ fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', fontWeight: 400, lineHeight: 1.25, margin: '0 0 5px' }}>{l.title}</h3>
                    <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)', marginBottom: 6 }}>{l.author}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="tag tag-outline" style={{ fontSize: 'var(--t-base)', padding: '2px 8px' }}>{l.fmt}</span>
                      <span style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)' }}>{l.unitLabel} each</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-neutral-400)', borderRadius: 4, height: 38 }}>
                  <button onClick={() => bump(l.key, -1)} style={{ flex: 1, height: '100%', background: 'none', border: 0, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>−</button>
                  <span style={{ minWidth: 26, textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>{l.qtyLabel}</span>
                  <button onClick={() => bump(l.key, 1)} style={{ flex: 1, height: '100%', background: 'none', border: 0, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>+</button>
                </div>
                <div style={{ textAlign: 'right', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', fontVariantNumeric: 'tabular-nums' }}>{l.lineTotal}</div>
                <button onClick={() => drop(l.key)} title="Remove" style={{ background: 'none', border: 0, cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', color: 'var(--color-neutral-600)', justifySelf: 'end' }}>✕</button>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 22 }}>
              <Link className="btn btn-secondary" to="/books" style={{ textDecoration: 'none' }}>Continue shopping</Link>
              <Link className="btn btn-secondary" to="/contact" style={{ textDecoration: 'none' }}>Convert to a quotation</Link>
            </div>
          </div>

          <aside style={{ position: 'sticky', top: 96, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: 22, background: 'var(--color-surface)' }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 14 }}>Order summary</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginBottom: 9 }}><span>Subtotal</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{subTotal}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginBottom: 9 }}><span>Delivery</span><span style={{ fontVariantNumeric: 'tabular-nums' }}>{shipTotal}</span></div>
              <div style={{ fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', color: 'var(--color-neutral-600)', lineHeight: 1.5, marginBottom: 12 }}>{shipNote}</div>
              <hr className="hr" style={{ margin: '0 0 12px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <span style={{ fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Total</span>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 16px*var(--tf,1)*var(--tz,1))', fontVariantNumeric: 'tabular-nums' }}>{grandTotal}</span>
              </div>
              <button className="btn btn-block" style={{ background: 'var(--color-accent)', color: '#fff', minHeight: 46, fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))', marginTop: 0 }}>Proceed to checkout</button>
              <Link className="btn btn-secondary btn-block" to="/signin" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', textDecoration: 'none' }}>Sign in for saved details</Link>
            </div>
            <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '18px 20px' }}>
              <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 10 }}>Payment &amp; assurance</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-neutral-700)' }}>
                <li>Card, M-Pesa or invoice on account</li>
                <li>eBooks released to your library on payment</li>
                <li>14-day returns on undamaged print titles</li>
                <li>VAT invoice issued for every order</li>
              </ul>
            </div>
            <div style={{ border: '1px solid var(--color-divider)', borderRadius: 4, padding: '18px 20px', background: '#fff' }}>
              <div style={{ fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', lineHeight: 1.65, color: 'var(--color-neutral-700)' }}>Have a promotional or firm code?</div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <input className="input" placeholder="Enter code" style={{ minHeight: 40, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }} />
                <button className="btn btn-secondary" style={{ minHeight: 40 }}>Apply</button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
