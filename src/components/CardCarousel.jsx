import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Horizontal card carousel on a dark burgundy band: a feature headline and
// prev/next controls above, a scroll-snapped track of cards below that bleeds
// off the right edge so it reads as a row that continues.
//
// Position is driven by the scroll container rather than a transform, so the
// number of cards on screen is decided by CSS at each breakpoint and never
// computed here. The card at the current index is the one on the dark ground —
// the same alternation the rest of the page uses for its bands.
const INTERVAL = 5000;

export default function CardCarousel({ eyebrow, titleTop, titleBottom, intro, items }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  // Measured from bounding rects rather than offsetLeft: the track is not a
  // positioned element, so a card's offsetParent is some ancestor further up
  // and offsetLeft is not in the track's scroll coordinates. The start padding
  // is subtracted so the card lands on the page gutter, not against the edge.
  const scrollToCard = useCallback(i => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[i];
    if (!card) return;
    const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left - pad;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: 'smooth' });
  }, []);

  // Scroll position, not a counter, is the source of truth. The last cards
  // cannot reach the start gutter — there is not enough track behind them — so
  // an index-driven carousel would highlight a card the track never actually
  // moved to. Stepping by one card and wrapping at the ends keeps the two in
  // agreement; `index` is then only ever read back from onScroll.
  const go = useCallback(delta => {
    const track = trackRef.current;
    if (!track) return;
    const a = track.children[0];
    const b = track.children[1];
    if (!a) return;
    const step = b
      ? b.getBoundingClientRect().left - a.getBoundingClientRect().left
      : a.getBoundingClientRect().width;
    const max = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= max - 2;
    const atStart = track.scrollLeft <= 2;

    if (delta > 0 && atEnd) { scrollToCard(0); return; }
    if (delta < 0 && atStart) { track.scrollTo({ left: max, behavior: 'smooth' }); return; }
    track.scrollTo({ left: track.scrollLeft + step * delta, behavior: 'smooth' });
  }, [scrollToCard]);

  // Auto-advance, paused while a pointer or the keyboard is in the carousel so
  // it never moves the card someone is reading or about to click. Honours the
  // reduced-motion preference by not running at all.
  useEffect(() => {
    if (paused) return;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (still.matches) return;
    const id = setInterval(() => go(1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, go]);

  // Keep the highlighted card honest when the track is swiped or dragged
  // rather than advanced by the buttons.
  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const pad = parseFloat(getComputedStyle(track).paddingInlineStart) || 0;
    const left = track.getBoundingClientRect().left + pad;
    let nearest = 0;
    let best = Infinity;
    for (let i = 0; i < track.children.length; i++) {
      const d = Math.abs(track.children[i].getBoundingClientRect().left - left);
      if (d < best) { best = d; nearest = i; }
    }
    setIndex(nearest);
    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);
  };

  return (
    <section
      className="feature-band"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="wrap feature-head">
        <div>
          <span className="feature-chip">{eyebrow}</span>
          <h2 className="feature-title">
            {titleTop}
            <span>{titleBottom}</span>
          </h2>
        </div>
        <div className="feature-aside">
          <p>{intro}</p>
          <div className="carousel-nav">
            <button type="button" onClick={() => go(-1)} aria-label="Previous">‹</button>
            <button type="button" onClick={() => go(1)} aria-label="Next" className="is-active">›</button>
          </div>
        </div>
      </div>

      {/* The track lives inside the content column rather than bleeding to the
          viewport edge, so the row starts and ends on the same margin as the
          headline above it and shows a whole number of cards. */}
      <div className="wrap">
      <div className="carousel-track" ref={trackRef} onScroll={onScroll}>
        {items.map((it, i) => (
          <article key={it.id} className={'carousel-card' + (i === index ? ' is-current' : '')}>
            <span className="carousel-chip">{it.chip}</span>
            <h3>{it.title}</h3>
            <div className="plate carousel-plate">
              <img src={it.img} alt="" loading="lazy" />
            </div>
            <p>{it.body}</p>
            <Link to={it.to} aria-label={it.cta}>
              <span>{it.cta}</span>
              <span className="carousel-arrow" aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
      </div>

      {/* A progress rail, not pagination. The last cards cannot be brought to
          the start gutter, so one dash per card would leave the final dashes
          permanently unreachable; dashes against scroll distance always reach
          their end and always agree with what the track is showing. */}
      <div className="wrap carousel-dots">
        {items.map((it, i) => {
          const active = i === Math.round(progress * (items.length - 1));
          return (
            <button
              key={it.id}
              type="button"
              aria-label={'Scroll to ' + it.title}
              className={active ? 'is-current' : ''}
              onClick={() => {
                const track = trackRef.current;
                if (!track) return;
                const max = track.scrollWidth - track.clientWidth;
                track.scrollTo({ left: (max * i) / (items.length - 1), behavior: 'smooth' });
              }}
            />
          );
        })}
      </div>
    </section>
  );
}
