import { useEffect, useState } from 'react';

// The hero bands are absolutely positioned behind the chrome at a fixed height,
// which works only as long as the hero text is shorter than that number.
//
// It was not, even at the width the prototype was drawn at: the hero's second
// button sat 32px past the bottom edge of the band, which put near-white text
// (#f6f5f4) on the near-white page ground, and the control rendered as an empty
// outline. Once the layout stacks the gap becomes hundreds of pixels and the
// whole tail of the hero disappears.
//
// So the band measures what it has to cover instead of being told: the lowest
// text in the hero section, plus a margin. The fixed height is kept as a floor,
// so the desktop composition only ever grows to the point where its own content
// is legible. Measuring rather than hard-coding also survives the things that
// change this height at runtime — the Home band rotates through slides of
// different lengths, and the type pairing can be switched live.
const CLEARANCE = 28;

export default function useHeroCover(fixedHeight) {
  const [height, setHeight] = useState(fixedHeight);

  useEffect(() => {
    const hero = document.querySelector('main section');

    const measure = () => {
      if (!hero) { setHeight(fixedHeight); return; }
      let lowest = 0;
      for (const el of hero.querySelectorAll('*')) {
        const hasText = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (!hasText) continue;
        const r = el.getBoundingClientRect();
        if (r.width < 1 || r.height < 1) continue;
        lowest = Math.max(lowest, r.bottom + window.scrollY);
      }
      setHeight(lowest ? Math.max(fixedHeight, Math.round(lowest + CLEARANCE)) : fixedHeight);
    };

    measure();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null;
    if (ro && hero) ro.observe(hero);
    window.addEventListener('resize', measure);

    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [fixedHeight]);

  return height;
}
