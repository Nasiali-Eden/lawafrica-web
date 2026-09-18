import { useEffect, useState } from 'react';
import { useOverlay } from '../state/OverlayContext.jsx';
import { useType } from '../state/TypeContext.jsx';
import { useBackground } from '../state/BackgroundContext.jsx';

// Floating preview toggles, stacked bottom-right: background (current /
// white), hero "this week" list layout (Home only), hero overlay on/off,
// and the type-pairing switcher — same pill style and corner for all.
//
// The stack is four pills tall, which on a phone covers most of the content
// it is supposed to be previewing. Below 700px it therefore collapses behind a
// single round button and opens on tap; nothing is removed, it is only stowed.
export default function FloatingControls() {
  const { overlayOn, toggleOverlay } = useOverlay();
  const { isWarm, toggleBackground } = useBackground();
  const { pairs, pairOpen, togglePair } = useType();

  const [narrow, setNarrow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const sync = () => setNarrow(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);
  const stowed = narrow && !open;

  return (
    <div className="floating-controls" style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
      {narrow && (
        <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open}
          aria-label={open ? 'Hide preview controls' : 'Show preview controls'}
          style={{ order: 9, width: 44, height: 44, borderRadius: '50%', display: 'grid', placeItems: 'center', cursor: 'pointer', background: 'var(--color-bg)', border: '1px solid var(--color-text)', color: 'var(--color-text)', font: 'inherit', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 4px)', boxShadow: '0 4px 14px rgba(20,24,46,.12)' }}>
          {open ? '×' : 'Aa'}
        </button>
      )}
      {stowed ? null : (
      <>
      {pairOpen && (
        <div style={{ background: 'var(--color-bg)', border: '1px solid var(--color-text)', borderRadius: 4, padding: 16, width: 290, maxHeight: '74vh', overflow: 'auto', boxShadow: '0 8px 28px rgba(20,24,46,.16)' }}>
          <div style={{ fontSize: 'var(--t-base)', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--color-neutral-600)', marginBottom: 12 }}>Type pairing</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {pairs.map(p => (
              <button key={p.key} type="button" onClick={p.pick}
                style={{ display: 'grid', gridTemplateColumns: '14px minmax(0,1fr)', gap: 10, alignItems: 'start', textAlign: 'left', background: 'none', border: 0, borderRadius: 4, padding: '9px 8px', cursor: 'pointer', font: 'inherit', color: 'var(--color-text)' }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', border: '1px solid var(--color-neutral-400)', marginTop: 4, display: 'block' }}>
                  {p.on && <span style={{ display: 'block', width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', margin: '2px auto' }} />}
                </span>
                <span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 5px*var(--tf,1))', lineHeight: 1.25 }}>{p.name}</span>
                  <span style={{ display: 'block', fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)', lineHeight: 1.4 }}>{p.faces}</span>
                </span>
              </button>
            ))}
          </div>
          <div style={{ fontSize: 'var(--t-base)', color: 'var(--color-neutral-600)', lineHeight: 1.5, borderTop: '1px solid var(--color-divider)', marginTop: 10, paddingTop: 10 }}>
            Each pairing carries its own heading weight, tracking and optical size — the scale re-tunes with the faces.
          </div>
        </div>
      )}

      <button type="button" onClick={toggleBackground}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, borderRadius: 4, padding: '9px 14px', cursor: 'pointer',
          font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', boxShadow: '0 4px 14px rgba(20,24,46,.12)',
          border: `1px solid ${isWarm ? 'var(--color-accent)' : 'var(--color-text)'}`,
          background: isWarm ? 'var(--color-accent-100)' : 'var(--color-bg)',
          color: isWarm ? 'var(--color-accent-800)' : 'var(--color-text)'
        }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', flex: 'none', border: '1px solid var(--color-neutral-400)', background: isWarm ? '#f6f5f4' : '#ffffff' }} />
        <span>{isWarm ? 'Background: Warm' : 'Background: White'}</span>
      </button>

      <button type="button" onClick={toggleOverlay}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, borderRadius: 4, padding: '9px 14px', cursor: 'pointer',
          font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', boxShadow: '0 4px 14px rgba(20,24,46,.12)',
          border: `1px solid ${overlayOn ? 'var(--color-accent)' : 'var(--color-text)'}`,
          background: overlayOn ? 'var(--color-accent-100)' : 'var(--color-bg)',
          color: overlayOn ? 'var(--color-accent-800)' : 'var(--color-text)'
        }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', flex: 'none', border: `1px solid ${overlayOn ? 'var(--color-accent)' : 'var(--color-neutral-400)'}`, display: 'grid', placeItems: 'center' }}>
          {overlayOn && <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)' }} />}
        </span>
        <span>{overlayOn ? 'Overlay: On' : 'Overlay: Off'}</span>
      </button>

      <button type="button" onClick={togglePair}
        style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--color-bg)', border: '1px solid var(--color-text)', borderRadius: 4, padding: '9px 14px', cursor: 'pointer', font: 'inherit', fontSize: 'calc(var(--t-base) + 2px*var(--tf,1))', color: 'var(--color-text)', boxShadow: '0 4px 14px rgba(20,24,46,.12)' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'calc(var(--t-base) + 6px*var(--tf,1))', lineHeight: 1 }}>Aa</span>
        <span>Type</span>
      </button>
      </>
      )}
    </div>
  );
}
