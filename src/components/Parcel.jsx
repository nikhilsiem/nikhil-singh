export function Dim({ value, label }) {
  return (
    <p className="dim-line"><b>{value}</b><span>{label}</span></p>
  );
}

export default function Parcel({ as: Tag = 'div', kind, i = 0, dim, className = '', style, children, ...rest }) {
  const cls = ['parcel', kind, className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} style={{ ...style, '--i': i }} {...rest}>
      <svg className="draw" aria-hidden="true" focusable="false">
        <rect pathLength={kind === 'own' ? undefined : 1} />
      </svg>
      {dim && <Dim {...dim} />}
      {children}
    </Tag>
  );
}
