import { useState } from "react";
import arrowDown from "../../Assets/Icons/arrow_down.svg";
import arrowUp from "../../Assets/Icons/arrow_up.svg";

export default function TypeOfPost() {
  const [selectedOption, setSelectedOption] = useState("Public (+ 5XP)"); // Default to 'Public'
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsExpanded(false);
  };

  // Determine the alternative option based on the currently selected option
  const getAlternativeOption = () => {
    return selectedOption === "Public (+ 5XP)"
      ? "Private (+ 0 XP)"
      : "Public (+ 5XP)";
  };

  const alternativeOption = getAlternativeOption();

  return (
    <div className={`dropdown-menu ${isExpanded ? "expanded" : ""}`}>
      <div className="menu-header" onClick={toggleMenu}>
        {isExpanded ? <img src={arrowUp} alt="" /> : <img src={arrowDown} />}{" "}
        {selectedOption}
      </div>
      {isExpanded && (
        <div className="menu-options">
          <div onClick={() => handleOptionClick(alternativeOption)}>
            {alternativeOption}
          </div>
        </div>
      )}
    </div>
  );
}
