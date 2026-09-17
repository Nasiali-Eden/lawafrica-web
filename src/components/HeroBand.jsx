import { useHero } from '../state/HeroContext.jsx';
import { useOverlay } from '../state/OverlayContext.jsx';
import useHeroCover from './useHeroCover.js';
import { HERO_HEIGHT, HERO_FILTER, HERO_WASH_X, HERO_WASH_Y } from './heroTreatment.js';

// The full-bleed rotating image band behind the top bar, header and hero on
// Home — absolutely positioned so it sits behind the (transparent) chrome.
export default function HeroBand() {
  const { heroSlides, heroIndex } = useHero();
  const { overlayOn } = useOverlay();
  const height = useHeroCover(HERO_HEIGHT);
  return (
    <div data-hero-band style={{ position: 'absolute', top: 0, left: 0, right: 0, height, transition: 'height .3s ease', overflow: 'hidden', zIndex: 0, background: 'var(--color-accent-900)' }}>
      {heroSlides.map((h, i) => (
        <img key={h.img} src={h.img} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transition: 'opacity 1.4s ease, filter .3s ease', opacity: i === heroIndex ? 1 : 0,
          filter: overlayOn ? HERO_FILTER : 'none'
        }} />
      ))}
      {overlayOn && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: HERO_WASH_X }} />
          <div style={{ position: 'absolute', inset: 0, background: HERO_WASH_Y }} />
        </>
      )}
    </div>
  );
}
