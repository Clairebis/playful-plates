//--------------------------------Natalia------------------------------

import { useState } from "react";

export default function PostLabel({ label }) {
  const [isSelected, setIsSelected] = useState(false);

  function selectLabel() {
    setIsSelected(!isSelected);
  }

  return (
    <span
      className={`postALabel ${isSelected ? "postALabelSelected" : ""}`}
      onClick={selectLabel}
    >
      {label}
    </span>
  );
}
