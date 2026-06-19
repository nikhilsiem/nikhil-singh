import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['About', 'Experience', 'Skills', 'Contact'];

  return (
    <>
      <motion.nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '14px 40px' : '24px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid #1e1e1e' : '1px solid transparent',
          transition: 'all 0.4s ease',
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <a href="#hero" style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '18px', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>
          NS<span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
          {links.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                fontSize: '13px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
              className="nav-link"
            >
              {link}
            </a>
          ))}
          <a
            href="mailto:s.nikhil2023@gmail.com"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              color: '#000',
              background: 'var(--accent)',
              padding: '8px 18px',
              borderRadius: '100px',
              letterSpacing: '0.02em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Hire me
          </a>
        </div>
      </motion.nav>
    </>
  );
}
