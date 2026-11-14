import { useEffect } from 'react';

const smooth = v => {
  const t = Math.min(1, Math.max(0, v));
  return t * t * (3 - 2 * t);
};

// Writes --p (0 → 1, eased) on every .section as it arrives from the bottom of
// the viewport, and --x (0 → 1, eased) as its end leaves the top. CSS turns
// them into the arrival sweep and the hand-off fade.
export default function useScrollPlot() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const sections = [...document.querySelectorAll('.section')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        // eased arrival over most of a viewport, and an eased fade as it leaves
        const p = smooth((vh - r.top) / (vh * 0.8));
        const x = smooth((vh * 0.45 - r.bottom) / (vh * 0.45));
        el.style.setProperty('--p', p.toFixed(4));
        el.style.setProperty('--x', x.toFixed(4));
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    document.documentElement.classList.add('plotting');
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('plotting');
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
}
