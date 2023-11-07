import logo from "../../assets/logo.png";
import notifications from "../../assets/Icons/notifications.svg";
import "../../components/HomeHeader/HomeHeader.css";
import { useEffect, useState } from "react";
import LevelInfoPopup from "../../pages/Profile/LevelInfoPopup";
import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"
import { getAuth } from "firebase/auth";


export default function HomeHeader() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userXP, setUserXP] = useState(0); // Default value

  const handleXPClick = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    async function getXpPoints() {
        const auth = getAuth();
        // const navigate = useNavigate();
        const uid = auth.currentUser?.uid;
      const url =
        `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (data) {
        //if userData exists, set states with values from userData (firebase)
        setUserXP(data.xp);
    }}

    getXpPoints();
  }, []);

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
        <p>{userXP} XP</p>
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
