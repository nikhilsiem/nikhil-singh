import { motion } from 'framer-motion';

const items = [
  'React', '·', 'Vue 3', '·', 'Angular', '·', 'TypeScript', '·',
  'AI Tooling', '·', 'Cursor', '·', 'Node.js', '·', 'GraphQL', '·',
  'PostgreSQL', '·', 'Framer Motion', '·', 'Core Web Vitals', '·',
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div style={{
      overflow: 'hidden',
      padding: '20px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-2)',
    }}>
      <motion.div
        style={{ display: 'flex', gap: 28, width: 'max-content' }}
        animate={{ x: [0, '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontSize: 13,
            fontWeight: item === '·' ? 400 : 600,
            color: item === '·' ? 'var(--text-muted)' : 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            letterSpacing: item === '·' ? 0 : '0.04em',
          }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
