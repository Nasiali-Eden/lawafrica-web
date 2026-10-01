import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useBasket } from '../state/BasketContext.jsx';
import { LLR_URL } from '../pages/LLR.jsx';
import { asset } from '../lib/format.js';

const navLinkStyle = { background: 'none', border: 0, padding: '4px 0', cursor: 'pointer', font: 'inherit', color: 'inherit', borderBottom: '2px solid transparent', whiteSpace: 'nowrap', textDecoration: 'none' };

// Law Reports keeps its place in the top nav but no longer resolves to a page
// here — it leaves for the LLR platform. The Products menu carries the LLR
// description page instead, after Books and eBooks.
const NAV = [
  { href: LLR_URL, label: 'Law Reports', external: true },
  { to: '/catalogue', label: 'Catalogue' },
  { to: '/insights', label: 'Insights' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

const PRODUCTS = [
  { to: '/books', label: 'Books', note: 'Print titles across six jurisdictions' },
  { to: '/ebooks', label: 'eBooks', note: 'The digital list, read on any device' },
  { to: '/llr', label: 'Law Reports', note: 'Reported judgments, on the LLR platform' }
];

function NavItem({ item, style, onClick }) {
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" style={style} onClick={onClick}>
        {item.label}
        <span aria-hidden="true" style={{ marginInlineStart: 5, fontSize: '0.8em' }}>&#8599;</span>
      </a>
    );
  }
  return <Link to={item.to} style={style} onClick={onClick}>{item.label}</Link>;
}

export function TopBar({ chromeTop }) {
  return (
    <div style={{ position: 'relative', zIndex: 20, color: 'var(--color-neutral-200)', fontSize: 'calc(var(--t-base) + 1px*var(--tf,1))', letterSpacing: 0, background: chromeTop }}>
      <div className="wrap" style={{ paddingBlock: 7, display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', rowGap: 4 }}>
        <a href="tel:+254202495067" className="tap-row" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'inherit', textDecoration: 'none' }}><span style={{ color: 'var(--gold-400)' }}>✆</span>+254 20 249 5067</a>
        <a href="mailto:info@lawafrica.com" className="tap-row" style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'inherit', textDecoration: 'none' }}><span style={{ color: 'var(--gold-400)' }}>✉</span>info@lawafrica.com</a>
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
    const onKey = e => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        aria-expanded={open} aria-haspopup="menu"
        style={{ ...navLinkStyle, display: 'flex', alignItems: 'center', gap: 5 }}>
        Products
        <span style={{ fontSize: 'var(--t-base)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s ease' }}>▾</span>
      </button>
      {open && (
        <div className="products-menu" role="menu">
          {PRODUCTS.map(pr => (
            <Link key={pr.to} to={pr.to} role="menuitem" onClick={() => setOpen(false)}>
              <span className="products-menu-label">
                {pr.label}
                <span aria-hidden="true">&#8594;</span>
              </span>
              <span className="products-menu-note">{pr.note}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function Drawer({ onClose }) {
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

        <div className="drawer-head"><span>Products</span></div>
        {PRODUCTS.map(pr => <Link key={pr.to} to={pr.to} onClick={onClose}>{pr.label}</Link>)}

        <div className="drawer-head" style={{ marginTop: 8 }}><span>Site</span></div>
        {NAV.map(n => (
          <NavItem key={n.label} item={n} onClick={onClose} />
        ))}

        <Link to="/publish" onClick={onClose} style={{ color: 'var(--color-accent)' }}>Publish with us</Link>
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
          <img src={asset("/assets/lawafrica-logo.png")} alt="LawAfrica — Know. Do. Be More." style={{ height: 38, width: 'auto', display: 'block', filter: logoFilter, transition: 'filter .3s ease' }} />
        </Link>

        <nav className="at-wide" style={{ alignItems: 'center', gap: 18, fontWeight: 600, fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))' }}>
          <ProductsMenu />
          {NAV.map(n => <NavItem key={n.label} item={n} style={navLinkStyle} />)}
        </nav>

        <div className="at-wide" style={{ marginLeft: 'auto', alignItems: 'center', gap: 10 }}>
          {/* Author acquisition is a business line, so it gets an action in the
              header rather than a link buried in the footer. Outlined like its
              neighbours because the chrome inverts over a hero — a maroon fill
              would sink into the maroon wash up there. */}
          <Link className="btn btn-primary" to="/publish" style={{ gap: 8, whiteSpace: 'nowrap', background: 'var(--color-accent)', color: '#fff', borderColor: 'var(--color-accent)', textDecoration: 'none' }}>Publish with us</Link>
          <button className="btn btn-secondary" onClick={() => navigate('/basket')} style={{ gap: 8, whiteSpace: 'nowrap', background: 'var(--color-bg)', color: 'inherit', borderColor: chromeBtnBd }}>{basketLabel}</button>
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
