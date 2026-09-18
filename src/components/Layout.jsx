import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeroBand from './HeroBand.jsx';
import PageHeroBand from './PageHeroBand.jsx';
import Header, { TopBar } from './Header.jsx';
import { HERO_HEIGHT } from './heroTreatment.js';
import Footer from './Footer.jsx';
import FloatingControls from './FloatingControls.jsx';

// Routes that get the full-bleed image-behind-transparent-header treatment,
// same mechanism as Home: a static band for these, a rotating one for Home.
const STATIC_HERO_ROUTES = {
  '/about': { image: '/assets/plate-wide.jpg', height: HERO_HEIGHT },
  '/practice': { image: '/assets/plate-land.jpg', height: HERO_HEIGHT }
};

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const staticHero = STATIC_HERO_ROUTES[location.pathname];
  const isHeroRoute = isHome || !!staticHero;
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  // The header retracts on the way down and comes back on the way up, so the
  // reading column gets the full window while you are moving through it but
  // the nav is one short flick away.
  //
  // REVEAL beats HIDE so a small upward correction always brings it back, and
  // both are above the few pixels a trackpad or a momentum scroll jitters by;
  // within FLOOR of the top the header is always shown, which also covers the
  // rubber-band overscroll on iOS.
  useEffect(() => {
    const HIDE = 8;
    const REVEAL = 4;
    const FLOOR = 180;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      setScrolled(y > 120);
      const dy = y - lastY.current;
      if (y < FLOOR) setHidden(false);
      else if (dy > HIDE) setHidden(true);
      else if (dy < -REVEAL) setHidden(false);
      lastY.current = y;
    };
    lastY.current = Math.max(0, window.scrollY);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const solid = !isHeroRoute || scrolled;
  const chrome = {
    chromeTop: solid ? 'var(--ground-brand-deepest)' : 'rgba(65,0,18,.4)',
    chromeHdr: solid ? 'var(--color-bg)' : 'transparent',
    chromeFg: solid ? 'var(--color-text)' : 'var(--color-bg)',
    chromeBd: solid ? '1px solid var(--color-divider)' : '1px solid rgba(255,255,255,.16)',
    chromeBtnBd: solid ? 'var(--color-accent)' : 'rgba(255,255,255,.55)',
    logoFilter: solid ? 'none' : 'brightness(0) invert(1)'
  };

  return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', position: 'relative' }}>
        {isHome && <HeroBand />}
        {staticHero && <PageHeroBand image={staticHero.image} height={staticHero.height} />}
        <TopBar chromeTop={chrome.chromeTop} />
        <Header hidden={hidden} chromeHdr={chrome.chromeHdr} chromeFg={chrome.chromeFg} chromeBd={chrome.chromeBd} chromeBtnBd={chrome.chromeBtnBd} logoFilter={chrome.logoFilter} />
        <main style={{ flex: 1, position: 'relative', zIndex: 10 }}>
          <Outlet />
        </main>
        <Footer />
        <FloatingControls />
      </div>
  );
}
