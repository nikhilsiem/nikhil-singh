// Small drawn marks for story stages, at the site's 1.5–2px line weight.
export function Tick({ x, y, s = 1 }) {
  return <path className="mark-tick" transform={`translate(${x} ${y}) scale(${s})`} d="M0 6 L4 10 L12 0" />;
}

export function Cross({ x, y, s = 1 }) {
  return <path className="mark-cross" transform={`translate(${x} ${y}) scale(${s})`} d="M0 0 L10 10 M10 0 L0 10" />;
}

export function Lock({ x, y, open = 0 }) {
  return (
    <g className="mark-lock" transform={`translate(${x} ${y})`}>
      <rect x="0" y="8" width="14" height="11" />
      <path d={`M3 8 V4 a4 4 0 0 1 8 0 V${8 - open * 5}`} transform={`translate(${open * 8} ${-open * 2})`} />
    </g>
  );
}
