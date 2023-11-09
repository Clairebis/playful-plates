/* ------------ Siiri ------------ */

import logo from "../../assets/logo.png"; // Logo image
import notifications from "../../assets/Icons/notifications.svg"; // Notifications icon
import "../../components/HomeHeader/HomeHeader.css"; // Styles for the HomeHeader component
import { useEffect, useState } from "react";
import LevelInfoPopup from "../../pages/Profile/LevelInfoPopup"; // Popup for level information
import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"; // Chef hat icon
import { getAuth } from "firebase/auth"; // Firebase authentication tool
import { useNavigate } from "react-router-dom";

export default function HomeHeader() {
  const [isPopupVisible, setPopupVisible] = useState(false); // State for level info popup visibility
  const [userXP, setUserXP] = useState(0); // State for user XP, default value is 0
  const navigate = useNavigate();

  // Function to open 404
  function open404() {
    navigate(`/404`);
  }

  // Function to handle the XP click event
  const handleXPClick = () => {
    setPopupVisible(true);
  };

  // Function to close the level info popup
  const closePopup = () => {
    setPopupVisible(false);
  };

  // Effect to fetch user XP from Firebase when the component mounts
  useEffect(() => {
    async function getXpPoints() {
      const auth = getAuth();
      const uid = auth.currentUser?.uid; // User ID from Firebase authentication
      const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`; // URL for fetching user data
      const response = await fetch(url); // Fetching user data
      const data = await response.json(); // Parsing the response JSON
      console.log(data);

      if (data) {
        // If userData exists, set the userXP state with the value from userData (Firebase)
        setUserXP(data.xp);
      }
    }

    getXpPoints();
  }, [[]]); // Empty dependency array ensures this effect runs only once when the component mounts

  return (
    <>
      <div className="homeHeaderContainer">
        <img
          className="home-logo"
          src={logo}
          alt="logo of plates with text playful plates"
        />

        <div className="homeXpPoints" onClick={handleXPClick}>
          <img src={chefHatIcon} alt="chef hat icon" />
          <p>{userXP} XP</p>
        </div>

        {/* Rendering the LevelInfoPopup when isPopupVisible is true */}
        {isPopupVisible && (
          <LevelInfoPopup isVisible={isPopupVisible} onClose={closePopup} />
        )}

        {/* Notifications icon with a link to the "/recipes" route */}
        <img
          className="notification-icon"
          src={notifications}
          alt="notifications icon"
          onClick={open404}
        />
      </div>
    </>
  );
}
