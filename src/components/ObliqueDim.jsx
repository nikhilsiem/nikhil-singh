import { useLayoutEffect, useRef, useState } from 'react';

// A dimension line drawn between two plotted parcels, measured from their real
// boxes so it lands on their edges at any viewport. The label runs along the line.
export default function ObliqueDim({ from, to, fromAt = 0.3, toAt = 0.6, value, label }) {
  const ref = useRef(null);
  const [geo, setGeo] = useState(null);

  useLayoutEffect(() => {
    const svg = ref.current;
    const host = svg.parentElement;
    const measure = () => {
      const a = host.querySelector(`[data-plot-id="${from}"]`);
      const b = host.querySelector(`[data-plot-id="${to}"]`);
      if (!a || !b || getComputedStyle(svg).display === 'none') return setGeo(null);
      const h = host.getBoundingClientRect();
      const ra = a.getBoundingClientRect();
      const rb = b.getBoundingClientRect();
      const x1 = ra.left - h.left + ra.width * fromAt;
      const y1 = ra.bottom - h.top;
      const x2 = rb.left - h.left + rb.width * toAt;
      const y2 = rb.top - h.top;
      let ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
      if (ang > 90) ang -= 180;
      if (ang < -90) ang += 180;
      setGeo({ x1, y1, x2, y2, mx: (x1 + x2) / 2, my: (y1 + y2) / 2, ang });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    host.querySelectorAll(`[data-plot-id="${from}"], [data-plot-id="${to}"]`).forEach(el => ro.observe(el));
    let live = true;
    document.fonts?.ready.then(() => live && measure());
    return () => { live = false; ro.disconnect(); };
  }, [from, to, fromAt, toAt]);

  return (
    <svg ref={ref} className="oblique" aria-hidden="true" focusable="false">
      <defs>
        <marker id="dim-tick" viewBox="-1 -7 2 14" markerWidth="2" markerHeight="14" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0 -7V7" />
        </marker>
      </defs>
      {geo && (
        <g>
          <line x1={geo.x1} y1={geo.y1} x2={geo.x2} y2={geo.y2} markerStart="url(#dim-tick)" markerEnd="url(#dim-tick)" />
          <text transform={`translate(${geo.mx} ${geo.my}) rotate(${geo.ang})`} y="-9" textAnchor="middle">
            <tspan className="v">{value}</tspan>
            <tspan dx="6">{label}</tspan>
          </text>
        </g>
      )}
    </svg>
  );
}
