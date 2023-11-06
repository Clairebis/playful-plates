export default function CircularBar() {
  return (
    <svg width="200" height="200" style={{ marginBottom: "40px" }}>
      <circle
        cx="100"
        cy="100"
        r="89"
        fill="transparent"
        stroke="rgba(56, 102, 65)"
        strokeWidth="20"
        className="animatedCircle"
      />
    </svg>
  );
}
