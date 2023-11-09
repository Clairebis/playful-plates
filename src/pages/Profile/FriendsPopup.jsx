/*------------Paulius ----------*/

import { useState } from "react";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import close from "../../Assets/Icons/close.svg";

import "./FriendsPopup.css";

function FriendsPopup({ isVisible, onClose, updateFriendsData }) {
  // State to store the entered username and messages
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  // Handler for changing the username input
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Function to fetch user information based on the entered username
  const handleFetchUserInfo = async () => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    // Create a query to find users with the specified username
    const userQuery = query(usersRef, orderByChild("username"), equalTo(username));

    try {
      const snapshot = await get(userQuery);
      const userData = snapshot.val();

      if (userData) {
        let user;

        if (typeof userData === "object") {
          if (Object.keys(userData).length > 0) {
            // Get the first user in case there are multiple
            const userUid = Object.keys(userData)[0];
            user = userData[userUid];
          }
        }

        if (user) {
          const storedFriendsData = localStorage.getItem("myFriendsData")
            ? JSON.parse(localStorage.getItem("myFriendsData"))
            : [];
          // Check if the user already exists in storedFriendsData
          const userExists = storedFriendsData.some((friend) => friend.username === user.username);

          if (!userExists) {
            // Add the new user to the existing data
            storedFriendsData.push(user);

            // Update the local storage with the updated data
            localStorage.setItem("myFriendsData", JSON.stringify(storedFriendsData));

            // Update the state with the new user
            updateFriendsData(user);
            setMessage("Friend has been added!");
          } else {
            setMessage("User is already your friend.");
          }
        } else {
          setMessage("No user data found.");
        }
      } else {
        setMessage("User not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return isVisible ? (
    <div className="friends-popup visible">
      <div className="popup-content">
        <div className="popup-header">
          <h1>Send a friend request</h1>
          <p>Send a friend request by typing a username</p>
          <img
            src={close}
            alt="Close"
            className="close-button"
            onClick={onClose}
          />
        </div>
        <div className="container-align">
          <input
            type="text"
            placeholder="Username"
            className="username-input"
            value={username}
            onChange={handleUsernameChange}
          />
          <button
            className="invite-button"
            onClick={handleFetchUserInfo}>
            Invite
          </button>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  ) : null;
}

export default FriendsPopup;
