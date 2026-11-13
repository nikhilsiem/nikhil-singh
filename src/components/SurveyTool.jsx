import { useEffect, useState } from 'react';
import { COLUMN_LETTERS } from './Sheet';

// A surveyor's measuring cursor for fine pointers: crosshair with a live grid
// reference; click empty sheet to drop a datum and read the distance to the pointer.
export default function SurveyTool() {
  const [enabled, setEnabled] = useState(false);
  const [pt, setPt] = useState(null);
  const [datum, setDatum] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [m, setM] = useState({ col: 100, row: 120, cols: 12, left: 0, top: 0, right: 0 });

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const plot = document.querySelector('[data-plot]');
    document.documentElement.classList.add('surveying');

    const measure = () => {
      const r = plot.getBoundingClientRect();
      const cs = getComputedStyle(plot);
      const cols = parseInt(cs.getPropertyValue('--cols'), 10) || 12;
      setM({
        cols,
        col: r.width / cols,
        row: plot.querySelector('.row-probe')?.offsetHeight || 120,
        left: r.left,
        right: r.right,
        top: r.top + window.scrollY,
      });
    };
    measure();

    const onMove = e => setPt({ x: e.clientX, y: e.clientY });
    const onLeave = () => setPt(null);
    const onScroll = () => setScrollY(window.scrollY);
    const onClick = e => {
      if (e.button !== 0 || e.target.closest('a, button, input, textarea, select, summary, [role="button"]')) return;
      if (window.getSelection()?.toString()) return;
      setDatum({ x: e.clientX, y: e.clientY + window.scrollY });
    };
    const onKey = e => { if (e.key === 'Escape') setDatum(null); };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKey);
    const ro = new ResizeObserver(measure);
    ro.observe(plot);
    onScroll();
    return () => {
      document.documentElement.classList.remove('surveying');
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKey);
      ro.disconnect();
    };
  }, [enabled]);

  if (!enabled) return null;

  let ref = '–';
  if (pt && pt.x >= m.left && pt.x <= m.right) {
    const c = Math.min(m.cols - 1, Math.max(0, Math.floor((pt.x - m.left) / m.col)));
    const r = Math.max(0, Math.floor((pt.y + scrollY - m.top) / m.row));
    ref = `${COLUMN_LETTERS[c]}${r + 1}`;
  }

  let d = null;
  if (datum && pt) {
    const ax = datum.x;
    const ay = datum.y - scrollY;
    const dx = pt.x - ax;
    const dy = pt.y - ay;
    const len = Math.hypot(dx, dy);
    const ang = Math.atan2(dy, dx);
    d = { ax, ay, bx: pt.x, by: pt.y, nx: -Math.sin(ang) * 6, ny: Math.cos(ang) * 6, len, cols: len / m.col };
  }

  return (
    <>
      <div className="tool" aria-hidden="true">
        {pt && <div className="hx" style={{ top: pt.y }} />}
        {pt && <div className="vx" style={{ left: pt.x }} />}
        <svg>
          {d && (
            <g>
              <line x1={d.ax} y1={d.ay} x2={d.bx} y2={d.by} />
              <line className="tick" x1={d.ax - d.nx} y1={d.ay - d.ny} x2={d.ax + d.nx} y2={d.ay + d.ny} />
              <line className="tick" x1={d.bx - d.nx} y1={d.by - d.ny} x2={d.bx + d.nx} y2={d.by + d.ny} />
              <text x={(d.ax + d.bx) / 2 + 10} y={(d.ay + d.by) / 2 - 10}>
                {Math.round(d.len)} px · {d.cols.toFixed(2)} col
              </text>
            </g>
          )}
          {datum && <circle cx={datum.x} cy={datum.y - scrollY} r="4" />}
        </svg>
      </div>
      <p className="readout" aria-hidden="true">
        <span>Grid <b>{ref}</b></span>
        <span>{datum ? 'Esc clears the datum' : 'Click to set a datum'}</span>
      </p>
    </>
  );
}
