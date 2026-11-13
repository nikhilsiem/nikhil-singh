import { useEffect } from 'react';

// Writes --p (0 → 1) on every .section as it travels from the bottom of the
// viewport to 40% from the top. CSS turns that into the section transition.
export default function useScrollPlot() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const sections = [...document.querySelectorAll('.section')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      for (const el of sections) {
        const top = el.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, (vh - top) / (vh * 0.6)));
        el.style.setProperty('--p', p.toFixed(3));
        el.toggleAttribute('data-plotted', p >= 1);
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
