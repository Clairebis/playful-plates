import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile/Profile.css"; // Import your Profile.css file

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    image: "",
    name: "",
    level: 0,
    xp: 0,
  });

  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;

    if (uid) {
      const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

      async function getUser() {
        try {
          const response = await fetch(url);
          const userData = await response.json();

          if (userData) {
            setUserData({
              username: userData.username,
              image: userData.image,
              name: userData.name,
              level: userData.level,
              xp: userData.xp,
            });
          }
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      }

      getUser();
    }
  }, [auth.currentUser]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out", error);
        console.log("Error signing out");
      });
  };

  return (
    <div className="profile-container">
      <h1>Hello, {userData.name}!</h1>
      <div className="user-container">
        <div className="profile-image-container">
          <img
            src={userData.image}
            alt="Profile Image"
            className="profile-image"
          />
        </div>
        <div className="user-info">
          <p className="user-name">{userData.name}</p>
          <p className="user-username">{userData.username}</p>
          <p className="user-level">{userData.level}</p>
          <p className="user-xp">{userData.xp} XP</p>
          <p className="user-upcoming-level">Sous Chef</p>
          <div className="progress-bar"></div>
          <div className="user-xp-info">
            <p className="user-xp">100 XP</p>
            <p className="user-xp">299 XP</p>
          </div>
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
