import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import addImage from "../../Assets/Icons/add.svg";
import FriendsPopup from "../../pages/Profile/FriendsPopup";
import FriendCard from "./FriendCard";

import "./MyFriends.css";

function MyFriends() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [friends, setFriends] = useState([]);

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const storedFriendsData = JSON.parse(localStorage.getItem("myFriendsData") || "[]");
      setFriends(storedFriendsData);
      isFirstRender.current = false; // Mark as not the first render
    }
  }, []);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const removeFriend = (friend) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this friend?");

    if (confirmDelete) {
      setFriends((prevFriends) => {
        const updatedFriends = prevFriends.filter((f) => f.id !== friend.id);
        localStorage.setItem("myFriendsData", JSON.stringify(updatedFriends));
        console.log("Removed friend:", friend);
        return updatedFriends;
      });
    }
  };

  const updateFriendsData = (user) => {
    const userUid = Object.keys(user)[0]; // Get the UID of the user
    const userExists = friends.some((friend) => friend.uid === userUid);

    if (!userExists) {
      // Add the new user to the state
      const updatedFriendsData = [...friends, { ...user[userUid], uid: userUid }];

      // Update the local storage with the updated data
      localStorage.setItem("myFriendsData", JSON.stringify(updatedFriendsData));
      console.log("Updated friends data:", updatedFriendsData);
      console.log("New friend data:", { ...user[userUid], uid: userUid });

      // Update the state with the new user
      setFriends(updatedFriendsData);
    }
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

        <FriendsPopup
          isVisible={isPopupVisible}
          onClose={closePopup}
          updateFriendsData={updateFriendsData}
        />
        <div className="friends-friends-container">
          {Array.isArray(friends) && friends.length > 0 ? (
            friends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onRemoveFriend={removeFriend}
              />
            ))
          ) : (
            <p>No friends to display.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default MyFriends;
