import { motion } from 'framer-motion';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

const links = [
  { label: 'Email', href: 'mailto:s.nikhil2023@gmail.com', value: 's.nikhil2023@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhilsiem', value: '/nikhilsiem' },
  { label: 'Phone', href: 'tel:+919051806528', value: '+91 90518 06528' },
];

export default function Contact() {
  return (
    <section id="contact" style={{ padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
      {/* BG glow */}
      <div style={{
        position: 'absolute', bottom: -100, left: '50%', transform: 'translateX(-50%)',
        width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(110,231,183,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <motion.div {...fadeUp()}>
          <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>Contact</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(40px, 7vw, 80px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            marginBottom: 24,
          }}>
            Let's build<br />
            <span style={{ color: 'var(--text-muted)' }}>something great</span>
          </h2>
          <p style={{ fontSize: 16, color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: 480, margin: '0 auto 48px' }}>
            I'm open to senior frontend roles, interesting projects, and conversations about AI-augmented engineering.
          </p>
        </motion.div>

        <motion.a
          {...fadeUp(0.1)}
          href="mailto:s.nikhil2023@gmail.com"
          style={{
            display: 'inline-block',
            padding: '18px 48px',
            borderRadius: 100,
            background: 'var(--accent)',
            color: '#000',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '0.01em',
            marginBottom: 64,
          }}
          whileHover={{ scale: 1.04, boxShadow: '0 16px 50px rgba(110,231,183,0.3)' }}
          whileTap={{ scale: 0.98 }}
        >
          Get in touch →
        </motion.a>

        <motion.div
          {...fadeUp(0.2)}
          style={{
            display: 'flex', gap: 0, justifyContent: 'center',
            borderTop: '1px solid var(--border)', paddingTop: 48,
            flexWrap: 'wrap',
          }}
        >
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              style={{
                padding: '16px 32px',
                borderRight: i < links.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.querySelector('.contact-val').style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.querySelector('.contact-val').style.color = 'var(--text-primary)'}
            >
              <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{l.label}</div>
              <div className="contact-val" style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 500, transition: 'color 0.2s' }}>{l.value}</div>
            </a>
          ))}
        </motion.div>

        <motion.div
          {...fadeUp(0.3)}
          style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}
        >
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Nikhil Singh · Senior Software Engineer</span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Noida, Uttar Pradesh, IN · 2026</span>
        </motion.div>
      </div>
    </section>
  );
}
