export default function Sheet({ children }) {
  return (
    <div className="sheet">
      <div className="plot">{children}</div>
    </div>
  );
}
