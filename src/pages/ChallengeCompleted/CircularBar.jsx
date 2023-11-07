export default function CircularBar({ xp }) {
  return (
    <svg width="200" height="200" style={{ marginBottom: "40px" }}>
      <path
        d="M100,189 A89,89 0 1 1 100.001,189"
        fill="transparent"
        stroke="rgba(56, 102, 65)"
        strokeWidth="20"
        className="animatedCircle"
      />
      <text
        x="100"
        y="100"
        text-anchor="middle"
        dy="0.3em"
        fill="black"
        className="pointsXP"
      >
        <tspan font-size="24">+ {xp} XP</tspan>
      </text>
    </svg>
  );
}
