import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../state/AuthContext.jsx';
import { useBasket } from '../state/BasketContext.jsx';

const navLinkStyle = { background: 'none', border: 0, padding: '4px 0', cursor: 'pointer', font: 'inherit', color: 'inherit', borderBottom: '2px solid transparent', whiteSpace: 'nowrap', textDecoration: 'none' };

const NAV = [
  { to: '/reports', label: 'Law Reports' },
  { to: '/books', label: 'Catalogue' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export function TopBar({ chromeTop }) {
  const { user, signedIn, signedOut, signOut } = useAuth();
  return (
    <div style={{ position: 'relative', zIndex: 20, color: 'var(--color-neutral-200)', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: 0, background: chromeTop }}>
      <div className="wrap" style={{ paddingBlock: 7, display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', rowGap: 4 }}>
        <a href="tel:+254202495067" className="tap-row" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'inherit', textDecoration: 'none' }}><span style={{ color: 'var(--gold-400)' }}>✆</span>+254 20 249 5067</a>
        <a href="mailto:info@lawafrica.com" className="tap-row" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'inherit', textDecoration: 'none' }}><span style={{ color: 'var(--gold-400)' }}>✉</span>info@lawafrica.com</a>
        {/* Everything from here is desktop-only: on a phone the strip keeps the
            two things worth tapping and the account links move into the drawer. */}
        <span className="at-wide" style={{ width: 1, height: 12, background: 'rgba(255,255,255,.22)' }} />
        <span className="at-wide" style={{ color: 'var(--color-neutral-300)' }}>Verified contact details · last checked 28 Aug 2026</span>
        <span className="at-wide" style={{ marginLeft: 'auto', alignItems: 'center', gap: 18 }}>
          <Link to="/contact" style={{ color: 'var(--color-neutral-200)', textDecoration: 'none' }}>Institutional sales</Link>
          {signedOut && (
            <>
              <Link to="/signin" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-neutral-200)', textDecoration: 'none' }}>Sign in</Link>
              <Link to="/signup" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--gold-400)', textDecoration: 'none' }}>Create an account</Link>
            </>
          )}
          {signedIn && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', border: '1px solid var(--gold-400)', color: 'var(--gold-400)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-heading)', fontSize: 'var(--t-base)' }}>{user.name.slice(0, 1)}</span>
                <span style={{ color: '#fff' }}>{user.name}</span>
                <span className="tag tag-outline" style={{ fontSize: 'var(--t-base)', padding: '1px 7px', borderColor: 'rgba(212,158,102,.6)', color: 'var(--gold-400)' }}>{user.plan}</span>
              </span>
              <Link to="#" style={{ color: 'var(--color-neutral-200)', textDecoration: 'none' }}>My library</Link>
              <button onClick={signOut} style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', color: 'var(--color-neutral-300)' }}>Sign out</button>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

function ProductsMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 5 }}>
        Products
        <span style={{ fontSize: 'var(--t-base)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>▾</span>
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: 12, background: 'var(--color-bg)', color: 'var(--color-text)', border: '1px solid var(--color-divider)', borderRadius: 4, boxShadow: '0 8px 24px rgba(20,24,46,.16)', minWidth: 180, padding: 6, zIndex: 40 }}>
          <Link to="/books" onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '9px 12px', borderRadius: 4, textDecoration: 'none', color: 'var(--color-text)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>Books</Link>
          <Link to="/ebooks" onClick={() => setOpen(false)}
            style={{ display: 'block', padding: '9px 12px', borderRadius: 4, textDecoration: 'none', color: 'var(--color-text)', fontSize: 'calc(var(--t-base) + 4px*var(--tf,1))' }}>eBooks</Link>
        </div>
      )}
    </div>
  );
}

function Drawer({ onClose }) {
  const { user, signedIn, signedOut, signOut } = useAuth();
  const closeRef = useRef(null);

  // Escape closes, focus lands on the close button, and the page behind is
  // locked so a phone does not scroll the content under the open drawer.
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (closeRef.current) closeRef.current.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} />
      <nav className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head">
          <span>Menu</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu"
            style={{ border: 0, padding: 0, minHeight: 44, width: 44, display: 'grid', placeItems: 'center', fontSize: 'calc(var(--t-base) + 10px*var(--tf,1))', fontFamily: 'var(--font-body)' }}>×</button>
        </div>

        <Link to="/books" onClick={onClose}>Books</Link>
        <Link to="/ebooks" onClick={onClose} className="drawer-sub">eBooks</Link>
        {NAV.map(n => <Link key={n.to} to={n.to} onClick={onClose}>{n.label}</Link>)}

        <div className="drawer-head" style={{ marginTop: 8 }}><span>Account</span></div>
        {signedOut && (
          <>
            <Link to="/signin" onClick={onClose}>Sign in</Link>
            <Link to="/signup" onClick={onClose} style={{ color: 'var(--color-accent)' }}>Create an account</Link>
          </>
        )}
        {signedIn && (
          <>
            <span style={{ padding: '14px 22px', borderBottom: '1px solid var(--color-divider)', display: 'flex', alignItems: 'center', gap: 9, fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', border: '1px solid var(--color-accent)', color: 'var(--color-accent)', display: 'grid', placeItems: 'center', fontFamily: 'var(--font-heading)' }}>{user.name.slice(0, 1)}</span>
              {user.name} · {user.plan}
            </span>
            <Link to="#" onClick={onClose}>My library</Link>
            <button type="button" onClick={() => { signOut(); onClose(); }}>Sign out</button>
          </>
        )}
        <Link to="/contact" onClick={onClose}>Institutional sales</Link>
      </nav>
    </>
  );
}

export default function Header({ hidden, chromeHdr, chromeFg, chromeBd, chromeBtnBd, logoFilter }) {
  const navigate = useNavigate();
  const { basketLabel } = useBasket();
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname, search } = useLocation();

  // A navigation always dismisses the drawer, including one to the page we are
  // already on — otherwise it would stay open over the new content.
  useEffect(() => { setMenuOpen(false); }, [pathname, search]);

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 30,
      background: chromeHdr, color: chromeFg, borderBottom: chromeBd,
      // Never retract while the drawer is open — the close button lives up here.
      transform: hidden && !menuOpen ? 'translateY(-100%)' : 'none',
      transition: 'background .3s ease, color .3s ease, transform .28s ease'
    }}>
      <div className="wrap" style={{ paddingBlock: 16, display: 'flex', alignItems: 'center', gap: 22 }}>
        <Link to="/" style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', flex: 'none', display: 'flex', alignItems: 'center' }}>
          <img src="/assets/lawafrica-logo.png" alt="LawAfrica — Know. Do. Be More." style={{ height: 38, width: 'auto', display: 'block', filter: logoFilter, transition: 'filter .3s ease' }} />
        </Link>

        <nav className="at-wide" style={{ alignItems: 'center', gap: 18, fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))' }}>
          <ProductsMenu />
          {NAV.map(n => <Link key={n.to} to={n.to} style={navLinkStyle}>{n.label}</Link>)}
        </nav>

        <div className="at-wide" style={{ marginLeft: 'auto', alignItems: 'center', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/books')} style={{ gap: 8, whiteSpace: 'nowrap', color: 'inherit', borderColor: chromeBtnBd }}>Search</button>
          <button className="btn btn-secondary" onClick={() => navigate('/basket')} style={{ gap: 8, whiteSpace: 'nowrap', color: 'inherit', borderColor: chromeBtnBd }}>{basketLabel}</button>
        </div>

        {/* Narrow chrome: basket stays on the bar because it carries a count,
            everything else folds into the drawer. */}
        <div className="at-narrow" style={{ marginLeft: 'auto', alignItems: 'center', gap: 8 }}>
          <button className="btn btn-secondary" onClick={() => navigate('/basket')} style={{ gap: 6, whiteSpace: 'nowrap', color: 'inherit', borderColor: chromeBtnBd, paddingInline: 12 }}>{basketLabel}</button>
          <button type="button" className="icon-btn" onClick={() => setMenuOpen(true)}
            aria-label="Open menu" aria-expanded={menuOpen} style={{ borderColor: chromeBtnBd }}>
            <span />
          </button>
        </div>
      </div>

      {menuOpen && <Drawer onClose={() => setMenuOpen(false)} />}
    </header>
  );
}
