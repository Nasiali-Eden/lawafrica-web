import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PAIRINGS = {
  classical: {
    label: 'Classical — Cormorant Garamond / Lora',
    heading: '"Cormorant Garamond", Georgia, serif', body: '"Lora", Georgia, serif',
    weight: 600, tracking: '-0.015em', scale: 1
  },
  reports: {
    label: 'Law Reports — Playfair Display / Spectral',
    heading: '"Playfair Display", Georgia, serif', body: '"Spectral", Georgia, serif',
    weight: 500, tracking: '-0.02em', scale: 0.94
  },
  gazette: {
    label: 'Gazette — Libre Franklin / Source Serif 4',
    heading: '"Libre Franklin", Helvetica, sans-serif', body: '"Source Serif 4", Georgia, serif',
    weight: 600, tracking: '-0.025em', scale: 0.9
  },
  chambers: {
    label: 'Chambers — Zilla Slab / IBM Plex Sans',
    heading: '"Zilla Slab", Georgia, serif', body: '"IBM Plex Sans", Helvetica, sans-serif',
    weight: 500, tracking: '-0.015em', scale: 0.9
  },
  dispatch: {
    label: 'Dispatch — Instrument Serif / Public Sans',
    heading: '"Instrument Serif", Georgia, serif', body: '"Public Sans", Helvetica, sans-serif',
    weight: 400, tracking: '-0.02em', scale: 0.92
  },
  statute: {
    label: 'Statute — Bodoni Moda / Newsreader',
    heading: '"Bodoni Moda", Didot, serif', body: '"Newsreader", Georgia, serif',
    weight: 500, tracking: '-0.01em', scale: 0.94
  },
  registry: {
    label: 'Registry — Archivo / Crimson Pro',
    heading: '"Archivo", Helvetica, sans-serif', body: '"Crimson Pro", Georgia, serif',
    weight: 600, tracking: '-0.03em', scale: 0.88
  },
  advocate: {
    label: 'Advocate — DM Serif Display / DM Sans',
    heading: '"DM Serif Display", Georgia, serif', body: '"DM Sans", Helvetica, sans-serif',
    weight: 400, tracking: '-0.02em', scale: 0.92
  },
  broadsheet: {
    label: 'Broadsheet — Old Standard TT / Alegreya Sans',
    heading: '"Old Standard TT", Georgia, serif', body: '"Alegreya Sans", Helvetica, sans-serif',
    weight: 400, tracking: '-0.01em', scale: 0.96
  },
  chancery: {
    label: 'Chancery — Petrona / Karla',
    heading: '"Petrona", Georgia, serif', body: '"Karla", Helvetica, sans-serif',
    weight: 600, tracking: '-0.02em', scale: 0.92
  }
};

// display / h1 / h2 / h3 / h4 / h5 / body / sm / xs / micro
const STEPS = [['display', 62], ['h1', 46], ['h2', 36], ['h3', 29], ['h4', 23], ['h5', 19], ['body', 17], ['sm', 15], ['xs', 14], ['micro', 13]];

// The floor the ladder pivots on, matching --t-base in tokens.css. A pairing
// may scale the scale down (registry runs at 0.88), so pivoting here keeps the
// small end from sliding back under 13px for an older readership.
const T_FLOOR = 13;

const TypeCtx = createContext(null);

export function TypeProvider({ children }) {
  const [pairing, setPairing] = useState('classical');
  const [pairOpen, setPairOpen] = useState(false);

  useEffect(() => {
    const p = PAIRINGS[pairing] || PAIRINGS.classical;
    const r = document.documentElement.style;
    r.setProperty('--font-heading', p.heading);
    r.setProperty('--font-body', p.body);
    r.setProperty('--font-heading-weight', String(p.weight));
    r.setProperty('--ls-heading', p.tracking);
    r.setProperty('--fw-heading', String(p.weight));
    r.setProperty('--tf', String(p.scale));
    // pivot on the floor so the small end of the ladder never shrinks
    STEPS.forEach(([k, v]) => r.setProperty('--t-' + k, (v <= T_FLOOR ? v : Math.round(T_FLOOR + (v - T_FLOOR) * p.scale)) + 'px'));
  }, [pairing]);

  const value = useMemo(() => ({
    pairing,
    pairOpen,
    togglePair: () => setPairOpen(o => !o),
    pairs: Object.keys(PAIRINGS).map(k => ({
      key: k,
      name: PAIRINGS[k].label.split(' — ')[0],
      faces: PAIRINGS[k].label.split(' — ')[1],
      on: k === pairing,
      pick: () => setPairing(k)
    }))
  }), [pairing, pairOpen]);

  return <TypeCtx.Provider value={value}>{children}</TypeCtx.Provider>;
}

export function useType() {
  return useContext(TypeCtx);
}
