import { useHero } from '../state/HeroContext.jsx';
import { useOverlay } from '../state/OverlayContext.jsx';
import useHeroCover from './useHeroCover.js';

// The full-bleed rotating image band behind the top bar, header and hero on
// Home — absolutely positioned so it sits behind the (transparent) chrome.
export default function HeroBand() {
  const { heroSlides, heroIndex, listLayout } = useHero();
  const { overlayOn } = useOverlay();
  const height = useHeroCover(listLayout === 'horizontal' ? 820 : 660);
  return (
    <div data-hero-band style={{ position: 'absolute', top: 0, left: 0, right: 0, height, transition: 'height .3s ease', overflow: 'hidden', zIndex: 0, background: 'var(--color-accent-900)' }}>
      {heroSlides.map((h, i) => (
        <img key={h.img} src={h.img} alt="" style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          transition: 'opacity 1.4s ease, filter .3s ease', opacity: i === heroIndex ? 1 : 0,
          filter: overlayOn ? 'grayscale(.55) contrast(1.05) brightness(.7)' : 'none'
        }} />
      ))}
      {overlayOn && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,rgba(65,0,18,.62) 0%,rgba(98,0,27,.3) 42%,rgba(98,0,27,.08) 68%,transparent 92%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(65,0,18,.22) 0%,transparent 20%,transparent 65%,rgba(65,0,18,.22) 100%)' }} />
        </>
      )}
    </div>
  );
}
