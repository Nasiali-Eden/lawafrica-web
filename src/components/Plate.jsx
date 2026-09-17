export default function Plate({ src, aspectRatio, style, imgStyle, alt = '' }) {
  return (
    <span className="plate" style={{ aspectRatio, display: 'block', ...style }}>
      <img src={src} alt={alt} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...imgStyle }} />
    </span>
  );
}
