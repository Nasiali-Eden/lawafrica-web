// The hero treatment, in one place. HeroBand and PageHeroBand read from here.
//
// The photographs carry only a white wash (HERO_WASH), so the type over them is
// dark.

// Every hero band starts at the same height, so the image is the same depth on
// Home, About and Practice. useHeroCover only grows it past this when the hero
// text would otherwise spill off the bottom of the band, which happens on
// narrow screens where the copy stacks.
export const HERO_HEIGHT = 720;

// A white wash over the photograph. It holds behind the copy (the left ~35%),
// then eases out through several stops (an ease, not a straight line, so there
// is no visible edge) and is fully clear by 68%, leaving the right of the
// image, where there is no text, untouched.
export const HERO_WASH =
  'linear-gradient(90deg,rgba(255,255,255,.9) 0%,rgba(255,255,255,.88) 30%,rgba(255,255,255,.78) 38%,rgba(255,255,255,.6) 45%,rgba(255,255,255,.4) 51%,rgba(255,255,255,.22) 57%,rgba(255,255,255,.09) 63%,rgba(255,255,255,.02) 68%,rgba(255,255,255,0) 72%)';
