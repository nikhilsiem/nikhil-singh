import { useEffect, useRef, useState } from 'react';

export const COLUMN_LETTERS = 'ABCDEFGHJKLMNP';

export default function Sheet({ children }) {
  const plotRef = useRef(null);
  const [rows, setRows] = useState({ count: 8, size: 120 });
  const [cols, setCols] = useState(12);

  useEffect(() => {
    const plot = plotRef.current;
    const measure = () => {
      const cs = getComputedStyle(plot);
      const size = plot.querySelector('.row-probe')?.offsetHeight || 120;
      const c = parseInt(cs.getPropertyValue('--cols'), 10) || 12;
      setRows({ count: Math.ceil(plot.offsetHeight / size), size });
      setCols(c);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(plot);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="sheet">
      <div className="axis-corner" aria-hidden="true" />
      <div className="axis-cols" aria-hidden="true">
        {COLUMN_LETTERS.slice(0, cols).split('').map(l => <span key={l}>{l}</span>)}
      </div>
      <div className="axis-rows" aria-hidden="true">
        {Array.from({ length: rows.count }, (_, n) => (
          <span key={n} style={{ top: n * rows.size }}>{n + 1}</span>
        ))}
      </div>
      <div className="plot" ref={plotRef} data-plot>
        <div className="row-probe" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
