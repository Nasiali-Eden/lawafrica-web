import { createContext, useContext, useMemo, useState } from 'react';

const OverlayCtx = createContext(null);

export function OverlayProvider({ children }) {
  const [overlayOn, setOverlayOn] = useState(true);
  const value = useMemo(() => ({
    overlayOn,
    toggleOverlay: () => setOverlayOn(o => !o)
  }), [overlayOn]);
  return <OverlayCtx.Provider value={value}>{children}</OverlayCtx.Provider>;
}

export function useOverlay() {
  return useContext(OverlayCtx);
}
