import { createContext, useContext, useEffect, useMemo, useState } from 'react';

// Ground colours as shipped in the redesign ("current") vs a plain white
// site ("white") — toggled live via FloatingControls, same mechanism as
// the type-pairing switcher: CSS custom properties set on <html>.
const THEMES = {
  current: { bg: '#f6f5f4', surface: '#f1efec', panel: '#eceae7' },
  white: { bg: '#ffffff', surface: '#ffffff', panel: '#f7f7f7' }
};

const BackgroundCtx = createContext(null);

export function BackgroundProvider({ children }) {
  const [theme, setTheme] = useState('current');

  useEffect(() => {
    const t = THEMES[theme] || THEMES.current;
    const r = document.documentElement.style;
    r.setProperty('--color-bg', t.bg);
    r.setProperty('--color-surface', t.surface);
    r.setProperty('--color-panel', t.panel);
  }, [theme]);

  const value = useMemo(() => ({
    isWhite: theme === 'white',
    toggleBackground: () => setTheme(t => (t === 'white' ? 'current' : 'white'))
  }), [theme]);

  return <BackgroundCtx.Provider value={value}>{children}</BackgroundCtx.Provider>;
}

export function useBackground() {
  return useContext(BackgroundCtx);
}
