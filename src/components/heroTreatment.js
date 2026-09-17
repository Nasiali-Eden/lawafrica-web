// The hero treatment, in one place. HeroBand and PageHeroBand previously each
// carried their own copy of the height, the image filter and both washes, so
// the two could drift apart; they now read from here.

// Every hero band starts at the same height, so the image is the same depth on
// Home, About and Practice. useHeroCover only grows it past this when the hero
// text would otherwise spill off the bottom of the band, which happens on
// narrow screens where the copy stacks.
export const HERO_HEIGHT = 720;

// The photographs were being pushed to brightness(.7) with heavy desaturation,
// which is most of why the site read as dark. Lighter, and less grey, while
// keeping enough contrast reduction that white type sits on them calmly.
export const HERO_FILTER = 'grayscale(.32) contrast(1.04) brightness(.9)';

// Left-to-right wash. It is there to carry the headline, so it holds its
// weight across the left third and then clears completely by 70% — the right
// of the band has no text on it and should show the photograph, not a veil.
// Solved against the rendered pixels under the headline glyphs, not guessed:
// it has to hold white type at AA across the left column and still be gone by
// the time the band reaches the right, where there is no text.
export const HERO_WASH_X =
  'linear-gradient(90deg,rgba(65,0,18,.86) 0%,rgba(65,0,18,.72) 34%,rgba(98,0,27,.30) 56%,transparent 74%)';

// Top and bottom edges, to seat the chrome and the band's lower boundary.
// Lighter than before for the same reason as the filter.
export const HERO_WASH_Y =
  'linear-gradient(180deg,rgba(65,0,18,.16) 0%,transparent 18%,transparent 68%,rgba(65,0,18,.16) 100%)';
