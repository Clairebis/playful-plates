import { useState } from "react";

export default function PostLabel({ label }) {
  const [isSelected, setIsSelected] = useState(false);

  function selectLabel() {
    setIsSelected(!isSelected);
  }

  return (
    <span
      className={`postLabel ${isSelected ? "selected" : ""}`}
      onClick={selectLabel}
    >
      {label}
    </span>
  );
}
