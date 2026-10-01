import useHeroCover from './useHeroCover.js';
import { HERO_HEIGHT, HERO_WASH } from './heroTreatment.js';
import { hero } from '../data/home.js';

// The full-bleed image band behind the top bar, header and hero on Home.
// It used to cross-fade four slides on a timer; it is one photograph now, so
// there is no index, no interval and no state — the band just paints.
export default function HeroBand() {
  const height = useHeroCover(HERO_HEIGHT);

  return (
    <div data-hero-band style={{ position: 'absolute', top: 0, left: 0, right: 0, height, transition: 'height .3s ease', overflow: 'hidden', zIndex: 0, background: 'var(--color-accent-900)' }}>
      <img src={hero.img} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'
      }} />
      <div className="hero-wash" style={{ position: 'absolute', inset: 0, background: HERO_WASH }} />
    </div>
  );
}
