/*------------Paulius ----------*/

import { useState, useEffect, useRef } from "react";
import Header from "../../components/Header/Header";
import addImage from "../../Assets/Icons/add.svg";
import FriendsPopup from "../../pages/Profile/FriendsPopup";
import FriendCard from "./FriendCard";

import "./MyFriends.css";

function MyFriends() {
  // State to manage the visibility of the friends popup
  const [isPopupVisible, setPopupVisible] = useState(false);

  // State to store the list of friends
  const [friends, setFriends] = useState([]);

  // Ref to track the first render for useEffect
  const isFirstRender = useRef(true);

  // Function to open the friends popup
  const openPopup = () => {
    setPopupVisible(true);
  };

  // Function to close the friends popup
  const closePopup = () => {
    setPopupVisible(false);
  };

  // Function to remove a friend
  const removeFriend = (friend) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this friend?");

    if (confirmDelete) {
      // Get the current friends data from local storage
      const storedFriendsData = JSON.parse(localStorage.getItem("myFriendsData") || "[]");

      // Filter out the friend to be removed
      const updatedFriends = storedFriendsData.filter((f) => f.id !== friend.id);

      // Update the local storage with the updated array
      localStorage.setItem("myFriendsData", JSON.stringify(updatedFriends));
      console.log("Removed friend:", friend);

      // Update the state with the updated array
      setFriends(updatedFriends);
    }
  };

  // Function to update the friends data when a new friend is added
  const updateFriendsData = (user) => {
    const userUid = Object.keys(user)[0]; // Get the UID of the user
    const userExists = friends.some((friend) => friend.uid === userUid);

    if (!userExists) {
      // Add the new user to the state
      const updatedFriendsData = [...friends, { ...user[userUid], uid: userUid }];

      // Update the state with the new user
      setFriends(updatedFriendsData);
    }
  };

  // UseEffect to load friends data on the initial render
  useEffect(() => {
    if (isFirstRender.current) {
      const storedFriendsData = JSON.parse(localStorage.getItem("myFriendsData") || "[]");
      setFriends(storedFriendsData);
      isFirstRender.current = false; // Mark as not the first render
    }
  }, []);

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
