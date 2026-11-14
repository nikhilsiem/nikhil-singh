import { useRef, useState } from 'react';
import Arrow from './Arrow';
import { START, SPAN, MONTHS, pct } from '../timeline';

export function Readout({ item }) {
  return (
    <aside className="readout" aria-live="polite" aria-label="Selected work" data-reveal="wipe">
      <div key={item.id} className="readout-body">
        <h2 className={`readout-title display${item.live ? ' live' : ''}`}>{item.title}</h2>
        <dl className="readout-facts">
          <div><dt>Role</dt><dd>{item.role}</dd></div>
          <div><dt>Period</dt><dd>{item.period}</dd></div>
          {item.length && <div><dt>Length</dt><dd>{item.length}</dd></div>}
        </dl>
        <p className="readout-summary">{item.summary}</p>
        {item.href ? (
          <a className="readout-link" href={item.href} target="_blank" rel="noreferrer">View the code<Arrow /></a>
        ) : (
          <a className="readout-link" href={`#${item.id}`}>{item.lane === 'work' ? 'Go to this part of the story' : 'See how it works'}<Arrow dir="down" /></a>
        )}
      </div>
    </aside>
  );
}

export default function Timeline({ items, selected, onSelect }) {
  const trackRef = useRef(null);
  const [guide, setGuide] = useState(null);
  const [earlier, setEarlier] = useState(false);
  const sel = items.find(i => i.id === selected);

  const onMove = e => {
    if (e.pointerType !== 'mouse') return;
    const r = trackRef.current.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    const n = Math.min(SPAN - 1, Math.floor(t * SPAN));
    setGuide({ x: t * 100, label: `${MONTHS[n % 12]} ${START.y + Math.floor(n / 12)}` });
  };

  const years = Array.from({ length: 7 }, (_, k) => START.y + k);
  const lane = name => items.filter(i => i.lane === name);

  const Item = it => (
    <button
      key={it.id}
      type="button"
      className={`tl-item ${it.lane}${it.kind ? ` ${it.kind}` : ''}${it.live ? ' live' : ''}${it.id === selected ? ' on' : ''}`}
      style={{ '--l': pct(it.left), '--w': pct(it.width), '--r': it.row ?? 0, '--n': it.nudge ?? 0 }}
      aria-pressed={it.id === selected}
      aria-label={it.kind === 'mark' ? `${it.label}, ${it.years}` : undefined}
      onPointerEnter={e => e.pointerType === 'mouse' && onSelect(it.id)}
      onFocus={() => onSelect(it.id)}
      onClick={() => onSelect(it.id)}
    >
      <span className="tl-label">{it.label}<small>{it.years}</small></span>
      <span className="tl-track" aria-hidden="true"><span className="tl-bar" /></span>
    </button>
  );

  return (
    <div className="timeline">
      <div className="tl-axis" aria-hidden="true">
        {years.map(y => <span key={y} style={{ left: pct((y - START.y) * 12) }}>{y}</span>)}
      </div>
      <div
        className="tl-plot"
        ref={trackRef}
        onPointerMove={onMove}
        onPointerLeave={() => setGuide(null)}
      >
        <div className="tl-lane work">
          <span className="tl-lane-name">At work</span>
          {lane('work').map(Item)}
        </div>
        <div id="tl-own" className={`tl-lane own${earlier ? ' earlier' : ''}`} style={{ '--thread': pct(Math.min(...lane('own').map(i => i.left))) }}>
          <span className="tl-lane-name">On my own · {lane('own').length} builds since {START.y + Math.floor(Math.min(...lane('own').map(i => i.left)) / 12)}</span>
          {[...lane('own')].sort((a, b) => b.left - a.left).map(Item)}
          {(() => {
            const marks = lane('own').filter(i => i.kind === 'mark');
            if (!marks.length) return null;
            const from = Math.min(...marks.map(i => i.years.slice(-4)));
            const to = Math.max(...marks.map(i => i.years.slice(-4)));
            return (
              <button type="button" className="tl-more" aria-expanded={earlier} aria-controls="tl-own"
                onClick={() => setEarlier(v => !v)}>
                {earlier ? 'Hide earlier builds' : `Show ${marks.length} earlier builds, ${from}–${to}`}
                <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><path d={earlier ? 'M2 8 6 4l4 4' : 'M2 4l4 4 4-4'} /></svg>
              </button>
            );
          })()}
        </div>
        {sel?.lane === 'work' && (
          <p key={sel.id} className="tl-length" style={{ '--l': pct(sel.left), '--w': pct(sel.width) }} aria-hidden="true">
            <span>{sel.length}</span>
          </p>
        )}
        {guide && (
          <div className="tl-guide" style={{ left: `${guide.x}%` }} aria-hidden="true">
            <span>{guide.label}</span>
          </div>
        )}
      </div>
    </div>
  );
}
