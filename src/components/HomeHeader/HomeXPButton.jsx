import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"
import { Link } from "react-router-dom";
import LevelInfoPopup from "../../pages/Profile/LevelInfoPopup";
import { useState } from "react";

export default function HomeXpPoints () {

    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleClick = () => {
      setPopupVisible(true);
    };
  
    const closePopup = () => {
      setPopupVisible(false);
    };

    return (

    <div className="homeXpPoints" onClick={handleClick}>
        <img
            src={chefHatIcon}
            alt="chef hat icon"
        />
        <p>250 XP</p>

        {isPopupVisible && (
        <LevelInfoPopup
          isVisible={isPopupVisible}
          onClose={closePopup}
        />
      )}
    </div>

    
    )
}