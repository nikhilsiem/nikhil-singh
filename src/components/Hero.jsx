import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';

const ROLES = ['Senior Software Engineer', 'Frontend Architect', 'AI-Augmented Builder', 'React & Vue Expert'];

function TypewriterRoles() {
  const ref = useRef(null);
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);

  useEffect(() => {
    let timer;
    function tick() {
      const el = ref.current;
      if (!el) return;
      const word = ROLES[idxRef.current];
      if (!deletingRef.current) {
        charRef.current++;
        el.textContent = word.slice(0, charRef.current);
        if (charRef.current === word.length) {
          deletingRef.current = true;
          timer = setTimeout(tick, 2200);
          return;
        }
        timer = setTimeout(tick, 68);
      } else {
        charRef.current--;
        el.textContent = word.slice(0, charRef.current);
        if (charRef.current === 0) {
          deletingRef.current = false;
          idxRef.current = (idxRef.current + 1) % ROLES.length;
          timer = setTimeout(tick, 300);
          return;
        }
        timer = setTimeout(tick, 38);
      }
    }
    timer = setTimeout(tick, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span ref={ref} style={{ color: 'var(--accent)', borderRight: '2px solid var(--accent)', paddingRight: '3px', animation: 'blink 1s step-end infinite' }}>
      Senior Software Engineer
    </span>
  );
}

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', overflow: 'hidden', background: 'var(--bg)' }}>
      <style>{`
        @keyframes blink { 50% { border-color: transparent; } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }

        /* Mobile responsive overrides */
        @media (max-width: 640px) {
          #hero { padding: 0 18px !important; }
          .hero-content { margin-left: 0 !important; max-width: 100% !important; }
          .hero-content h1 { font-size: clamp(34px, 10vw, 56px) !important; line-height: 1.03 !important; }
          .hero-content p, .hero-content .typewriter { font-size: 15px !important; }
          .hero-actions { flex-direction: column; gap: 12px !important; }
          .hero-available { margin-bottom: 18px !important; }
          .floating-badge, .stat-card { display: none !important; }
        }
      `}</style>

      {/* Interactive particle canvas — the "gif replacement" */}
      <ParticleCanvas />

      {/* Radial vignette so text stays readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 30% 50%, transparent 30%, rgba(8,8,8,0.75) 100%)',
      }} />

      {/* Floating badge */}
      <motion.div
        className="floating-badge"
        style={{
          position: 'absolute', top: '22%', right: '8%', zIndex: 2,
          background: 'rgba(110,231,183,0.07)', border: '1px solid rgba(110,231,183,0.2)',
          borderRadius: '12px', padding: '14px 20px',
          backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: 4,
          animation: 'float 4s ease-in-out infinite',
        }}
        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span style={{ fontSize: 10, color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Current Role</span>
        <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 600 }}>Senior Product Engineer</span>
        <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>@ SiteRecon · Noida</span>
      </motion.div>

      {/* Floating stat card */}
      <motion.div
        className="stat-card"
        style={{
          position: 'absolute', bottom: '22%', right: '6%', zIndex: 2,
          background: 'rgba(8,8,8,0.55)', border: '1px solid #1e1e1e',
          borderRadius: '12px', padding: '16px 22px', backdropFilter: 'blur(16px)',
          animation: 'float 5s ease-in-out infinite 1s',
        }}
        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div style={{ fontSize: 28, fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)' }}>6+</div>
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>Years of Experience</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {['React', 'Vue', 'Angular', 'AI'].map(t => (
            <span key={t} style={{ fontSize: 9, padding: '3px 7px', borderRadius: 4, background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontWeight: 500 }}>{t}</span>
          ))}
        </div>
      </motion.div>

      {/* Main content */}
      <div className="hero-content" style={{ maxWidth: 900, position: 'relative', zIndex: 2, marginLeft: '6vw' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}
          className="hero-available"
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Available for new opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(48px, 7vw, 96px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)',
            marginBottom: 20,
          }}
        >
          Nikhil<br />
          <span style={{ color: 'var(--text-muted)' }}>Singh</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.6 }}
          style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: 32, minHeight: '1.4em' }}
          className="typewriter"
        >
          <TypewriterRoles />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }}
          style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 560, marginBottom: 48 }}
        >
          Building high-performance web products across fintech, enterprise SaaS, and AI-powered platforms. 
          Expert in React, Vue 3, and Angular with a strong track record of shipping measurable engineering outcomes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }}
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}
          className="hero-actions"
        >
          <a
            href="#experience"
            style={{
              padding: '14px 32px', borderRadius: '100px',
              background: 'var(--accent)', color: '#000',
              fontWeight: 700, fontSize: 14, letterSpacing: '0.02em',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(110,231,183,0.3)'; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none'; }}
          >
            View my work
          </a>
          <a
            href="https://www.linkedin.com/in/nikhilsiem"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '14px 32px', borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.15)', color: 'var(--text-primary)',
              fontWeight: 600, fontSize: 14, letterSpacing: '0.02em',
              transition: 'border-color 0.2s, transform 0.2s',
              display: 'inline-block',
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.03)',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#555'; e.target.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.15)'; e.target.style.transform = 'translateY(0)'; }}
          >
            LinkedIn ↗
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.8 }}
      >
        <span style={{ fontSize: 10, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--text-muted), transparent)' }}
          animate={{ scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
