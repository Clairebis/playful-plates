// import close from "../../Assets/Icons/close.svg";

// import "./FriendsPopup.css";

// function FriendsPopup({ isVisible, onClose }) {
//   if (!isVisible) return null;

//   return (
//     <div className="friends-popup">
//       <div className="popup-content">
// <div className="popup-header">
//   <h1>Send a friend request</h1>
//   <p>Send a friend request by typing a username</p>
//   <img
//     src={close}
//     alt="Close"
//     className="close-button"
//     onClick={onClose}
//   />
// </div>
//         <div className="input-container">
//           <input
//             type="text"
//             placeholder="Username"
//             className="username-input"
//           />
//           <button className="invite-button">Invite</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FriendsPopup;

// import { useState } from "react";
// import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
// import close from "../../Assets/Icons/close.svg";

// import "./FriendsPopup.css";

// function FriendsPopup({ isVisible, onClose, updateUserData }) {
//   const [username, setUsername] = useState("");
//   const [message, setMessage] = useState("");

//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleFetchUserInfo = async () => {
//     const db = getDatabase();
//     const usersRef = ref(db, "users");

//     const userQuery = query(usersRef, orderByChild("username"), equalTo(username));

//     try {
//       const snapshot = await get(userQuery);
//       if (snapshot.exists()) {
//         const userData = snapshot.val();
//         const userDataKeys = Object.keys(userData);
//         if (userDataKeys.length === 1) {
//           const userUid = userDataKeys[0];
//           const user = userData[userUid];
//           updateUserData(user);
//           setMessage(`User found: ${user.username}`);
//         } else {
//           updateUserData(null);
//           setMessage("User not found. Please try again.");
//         }
//       } else {
//         updateUserData(null);
//         setMessage("User not found. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error fetching user data", error);
//     }
//   };

//   return (
//     <div className={`friends-popup ${isVisible ? "visible" : ""}`}>
//       <div className="popup-content">
//         <div className="popup-header">
//           <h1>Send a friend request</h1>
//           <p>Send a friend request by typing a username</p>
//           <img
//             src={close}
//             alt="Close"
//             className="close-button"
//             onClick={() => {
//               console.log("Close button clicked"); // Add this line for debugging
//               onClose();
//             }}
//           />
//           <input
//             type="text"
//             placeholder="Username"
//             className="username-input"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//           <button
//             className="invite-button"
//             onClick={handleFetchUserInfo}>
//             Invite
//           </button>
//           {message && <p>{message}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FriendsPopup;
import { useState } from "react";
import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";
import close from "../../Assets/Icons/close.svg";

import "./FriendsPopup.css";

function FriendsPopup({ isVisible, onClose, updateFriendsData }) {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState(""); // Add this line

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFetchUserInfo = async () => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    const userQuery = query(usersRef, orderByChild("username"), equalTo(username));

    try {
      const snapshot = await get(userQuery);
      console.log("Snapshot data:", snapshot.val());

      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userUid = Object.keys(userData)[0]; // Get the first user ID
        const user = userData[userUid];

        const storedFriendsData = JSON.parse(localStorage.getItem("myFriendsData") || "[]");

        // Check if the user already exists in storedFriendsData
        const userExists = storedFriendsData.some((friend) => friend.username === user.username);

        if (!userExists) {
          // Add the new user to the existing data
          const updatedFriendsData = [...storedFriendsData, user];

          // Update the local storage with the updated data
          localStorage.setItem("myFriendsData", JSON.stringify(updatedFriendsData));
          console.log("Updated localStorage:", localStorage.getItem("myFriendsData"));
          console.log("New friend data:", user);

          // Update the state with the new user
          updateFriendsData(user);
          setMessage("Friend has been added!");
        } else {
          setMessage("User is already your friend.");
        }
      } else {
        updateFriendsData([]);
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
