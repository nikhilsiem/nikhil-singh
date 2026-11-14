import { useEffect } from 'react';

// Phones only: writes --e (0 → 1) on every [data-reveal] element as it rises
// into view; CSS turns it into a squeeze, wipe or rise. Off for reduced motion.
export default function useReveal() {
  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 760px)');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const els = document.querySelectorAll('[data-reveal]');
      if (!narrow.matches) {
        els.forEach(el => el.style.removeProperty('--e'));
        return;
      }
      const vh = window.innerHeight;
      els.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const e = Math.min(1, Math.max(0, (vh - top) / (vh * 0.3)));
        el.style.setProperty('--e', e.toFixed(3));
      });
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    narrow.addEventListener('change', on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      narrow.removeEventListener('change', on);
    };
  }, []);
}
