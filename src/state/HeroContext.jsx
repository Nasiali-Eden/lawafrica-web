import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { heroSlides } from '../data/home.js';

const HeroCtx = createContext(null);

export function HeroProvider({ children }) {
  const [hero, setHero] = useState(0);
  const [listLayout, setListLayout] = useState('vertical');

  useEffect(() => {
    // 5s, matching the publishing carousel so the two moving things on Home
    // keep the same beat rather than drifting against each other.
    const id = setInterval(() => setHero(h => (h + 1) % heroSlides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const value = useMemo(() => {
    const i = hero % heroSlides.length;
    return {
      heroSlides,
      heroIndex: i,
      current: heroSlides[i],
      setHero,
      listLayout,
      toggleListLayout: () => setListLayout(l => (l === 'vertical' ? 'horizontal' : 'vertical')),
      dots: heroSlides.map((s, idx) => ({
        num: '0' + (idx + 1),
        label: s.kicker,
        active: idx === i,
        go: () => setHero(idx)
      }))
    };
  }, [hero, listLayout]);

  return <HeroCtx.Provider value={value}>{children}</HeroCtx.Provider>;
}

export function useHero() {
  return useContext(HeroCtx);
}
