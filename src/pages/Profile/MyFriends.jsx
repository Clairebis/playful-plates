import { useState } from "react";
import Header from "../../components/Header/Header";
import addImage from "../../Assets/Icons/add.svg";
import FriendsPopup from "../../pages/Profile/FriendsPopup"; // Import the FriendsPopup component

import "./MyFriends.css";

function MyFriends() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <section className="page">
        <Header pageTitle="My Friends" />
        <div className="button-container">
          <button
            className="add-friend-button"
            onClick={openPopup}>
            <img
              src={addImage}
              alt="Add"
            />
            Add
          </button>
        </div>
      </section>
      <FriendsPopup
        isVisible={isPopupVisible}
        onClose={closePopup}
      />{" "}
      {/* Render the FriendsPopup component */}
    </>
  );
}

export default MyFriends;
