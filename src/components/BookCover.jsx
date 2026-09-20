import { asset } from '../lib/format.js';
// The book-jacket treatment: a desaturated cover photo under a maroon/indigo
// multiply wash. "full" prints the title/author on the jacket (container-query
// sized, so the same markup works from a 56px basket thumbnail up to a full
// grid tile); "plain" is just the washed photo, used where the title is set
// separately beside the cover (product page, basket line item).
export default function BookCover({ title, author, variant = 'full', style }) {
  return (
    <div className="plate" style={{ aspectRatio: '3/4', containerType: 'inline-size', overflow: 'hidden', position: 'relative', ...style }}>
      <img src={asset("/assets/plate-cover.jpg")} alt="" loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1) contrast(1.06) brightness(.92)' }} />
      <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(130,0,36,.62),rgba(57,56,58,.86))', mixBlendMode: 'multiply' }} />
      {/* Jacket lettering is decorative: every caller that passes variant="full"
          also sets the title and author as real text beside or beneath the
          cover, so it is hidden from assistive tech rather than read twice.
          It stays container-query sized — it is artwork imitating a printed
          jacket, and shrinks with the cover the way real jacket type does. */}
      {variant === 'full' && (
        <span aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '9cqw 8cqw', color: 'var(--color-bg)', textAlign: 'left' }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '12cqw', lineHeight: 1.15, textWrap: 'pretty' }}>{title}</span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '3cqw' }}>
            <span style={{ height: 1, background: 'rgba(243,242,242,.5)', width: '34%' }} />
            <span style={{ fontSize: '5.4cqw', letterSpacing: '.1em', textTransform: 'uppercase', opacity: .88 }}>{author}</span>
          </span>
        </span>
      )}
    </div>
  );
}
