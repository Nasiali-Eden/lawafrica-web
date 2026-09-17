import { useOverlay } from '../state/OverlayContext.jsx';
import useHeroCover from './useHeroCover.js';

// A single-image, non-rotating variant of HeroBand — same full-bleed
// placement and maroon wash, for section heroes (About, etc.) that don't
// need the Home page's rotating carousel.
export default function PageHeroBand({ image, height: fixedHeight = 660 }) {
  const { overlayOn } = useOverlay();
  const height = useHeroCover(fixedHeight);
  return (
    <div data-hero-band style={{ position: 'absolute', top: 0, left: 0, right: 0, height, overflow: 'hidden', zIndex: 0, background: 'var(--color-accent-900)' }}>
      <img src={image} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
        transition: 'filter .3s ease',
        filter: overlayOn ? 'grayscale(.55) contrast(1.05) brightness(.7)' : 'none'
      }} />
      {overlayOn && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(65,0,18,.62) 0%,rgba(98,0,27,.3) 42%,rgba(98,0,27,.08) 68%,transparent 92%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(65,0,18,.22) 0%,transparent 20%,transparent 65%,rgba(65,0,18,.22) 100%)' }} />
        </>
      )}
    </div>
  );
}
