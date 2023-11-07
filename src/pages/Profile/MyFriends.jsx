// import { useState } from "react";
// import Header from "../../components/Header/Header";
// import addImage from "../../Assets/Icons/add.svg";
// import FriendsPopup from "../../pages/Profile/FriendsPopup"; // Import the FriendsPopup component

// import "./MyFriends.css";

// function MyFriends() {
//   const [isPopupVisible, setPopupVisible] = useState(false);

//   const openPopup = () => {
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//   };

//   return (
//     <>
//       <section className="page">
//         <Header pageTitle="My Friends" />
//         <div className="button-container">
//           <button
//             className="add-friend-button"
//             onClick={openPopup}>
//             <img
//               src={addImage}
//               alt="Add"
//             />
//             Add
//           </button>
//         </div>
//       </section>
//       <FriendsPopup
//         isVisible={isPopupVisible}
//         onClose={closePopup}
//       />{" "}
//       {/* Render the FriendsPopup component */}
//     </>
//   );
// }

// export default MyFriends;

// import { useState, useEffect } from "react";
// import Header from "../../components/Header/Header";
// import addImage from "../../Assets/Icons/add.svg";
// import FriendsPopup from "../../pages/Profile/FriendsPopup";

// import "./MyFriends.css";

// function MyFriends() {
//   const [isPopupVisible, setPopupVisible] = useState(false);
//   const [userData, setUserData] = useState(null);

//   const openPopup = () => {
//     setPopupVisible(true);
//   };

//   const closePopup = () => {
//     setPopupVisible(false);
//   };

//   const updateUserData = (data) => {
//     setUserData(data);
//   };

//   return (
//     <>
//       <section className="page">
//         <Header pageTitle="My Friends" />
//         <div className="button-container">
//           <button
//             className="add-friend-button"
//             onClick={openPopup}>
//             <img
//               src={addImage}
//               alt="Add"
//             />
//             Add
//           </button>
//         </div>
//       </section>
//       <FriendsPopup
//         isVisible={isPopupVisible}
//         onClose={closePopup} // Pass the closePopup function
//         updateUserData={updateUserData}
//       />
//       <div className="user-info">
//         {userData && (
//           <div>
//             <img
//               src={userData.image}
//               alt="User"
//             />
//             <p>{userData.name}</p>
//             <p>{userData.username}</p>
//             <p>{userData.level}</p>
//             <p>{userData.xp}</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// export default MyFriends;

import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import addImage from "../../Assets/Icons/add.svg";
import moreImage from "../../Assets/Icons/more.svg";
import FriendsPopup from "../../pages/Profile/FriendsPopup";

import "./MyFriends.css";

function MyFriends() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  // Retrieve friend data from local storage when the component loads
  useEffect(() => {
    const storedFriendData = localStorage.getItem("myFriendsData");
    if (storedFriendData) {
      setUserData(JSON.parse(storedFriendData));
    }
  }, []);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const updateUserData = (data) => {
    setUserData(data);
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
          onClose={closePopup} // Pass the closePopup function
          updateUserData={updateUserData}
        />
        <div className="friends-friends-container">
          {userData && (
            <div className="friends-user-info">
              <div className="container-flex">
                <img
                  src={userData.image}
                  alt="User"
                  className="friend-user-image"
                />
                <div className="friend-user-details">
                  <p className="friend-user-name">{userData.name}</p>
                  <p className="friend-user-username">{userData.username}</p>
                  <p className="friend-user-level">{userData.level}</p>
                  <p className="friend-user-xp">{userData.xp} XP</p>
                </div>
              </div>
              <div className="more-icon">
                <img
                  src={moreImage}
                  alt="More"
                  className="more-image"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default MyFriends;
