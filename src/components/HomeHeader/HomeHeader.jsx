import logo from "../../assets/logo.png";
import notifications from "../../assets/Icons/notifications.svg";
import "../../components/HomeHeader/HomeHeader.css";
import { useState } from "react";
import LevelInfoPopup from "../../pages/Profile/LevelInfoPopup";
import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"


export default function HomeHeader() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleXPClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div className="homeHeaderContainer">
        <img
          className="home-logo"
          src={logo}
          alt="logo of plates with text playful plates"
        />

        <div className="homeXpPoints" onClick={handleXPClick}>
        <img
            src={chefHatIcon}
            alt="chef hat icon"
        />
        <p>250 XP</p>
    </div>

        {isPopupVisible && (
          <LevelInfoPopup isVisible={isPopupVisible} onClose={closePopup} />
        )}

        <img
          className="notification-icon"
          src={notifications}
          alt="notifications icon"
          Link
          to="/recipes"
        />
      </div>
    </>
  );
}
