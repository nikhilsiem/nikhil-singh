// Authored arrow glyph, drawn at the parcel stroke weight.
export default function Arrow({ dir = 'out' }) {
  return (
    <svg className="arrow" viewBox="0 0 12 12" width="0.72em" height="0.72em" aria-hidden="true" focusable="false">
      {dir === 'up'
        ? <path d="M6 11V1.5M2 5.5 6 1.5l4 4" />
        : <path d="M2.5 9.5 9.5 2.5M3.5 2.5h6v6" />}
    </svg>
  );
}
