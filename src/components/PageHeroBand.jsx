import { useOverlay } from '../state/OverlayContext.jsx';
import useHeroCover from './useHeroCover.js';
import { HERO_HEIGHT, HERO_FILTER, HERO_WASH_X, HERO_WASH_Y } from './heroTreatment.js';

// A single-image, non-rotating variant of HeroBand — same full-bleed
// placement and maroon wash, for section heroes (About, etc.) that don't
// need the Home page's rotating carousel.
export default function PageHeroBand({ image, height: fixedHeight = HERO_HEIGHT }) {
  const { overlayOn } = useOverlay();
  const height = useHeroCover(fixedHeight);
  return (
    <div data-hero-band style={{ position: 'absolute', top: 0, left: 0, right: 0, height, overflow: 'hidden', zIndex: 0, background: 'var(--color-accent-900)' }}>
      <img src={image} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        transition: 'filter .3s ease',
        filter: overlayOn ? HERO_FILTER : 'none'
      }} />
      {overlayOn && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: HERO_WASH_X }} />
          <div style={{ position: 'absolute', inset: 0, background: HERO_WASH_Y }} />
        </>
      )}
    </div>
  );
}
