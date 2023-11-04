import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePostCard from "./Profile/ProfilePostCard";
import "./Profile/Profile.css"; // Import your Profile.css file
import infoIcon from "../Assets/Icons/info-icon.svg";

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
  const [userPosts, setUserPosts] = useState([]); // State to store user's posts

  useEffect(() => {
    const uid = auth.currentUser ? auth.currentUser.uid : null;

    if (uid) {
      const userRef = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

      // Fetch user data
      fetch(userRef)
        .then((response) => response.json())
        .then((userData) => {
          if (userData) {
            setUserData(userData);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });

      const userPostsRef = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json`;

      // Fetch user's posts
      fetch(userPostsRef)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // Filter posts created by the user
            const posts = Object.values(data).filter((post) => post.uid === uid);
            setUserPosts(posts);
          }
        })
        .catch((error) => {
          console.error("Error fetching user posts", error);
        });
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
    <div>
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
            <div className="user-level-info">
              <p className="user-level">{userData.level}</p>
              <img
                src={infoIcon}
                alt="Info Icon"
                className="info-icon"
              />
            </div>
            <p className="user-xp">{userData.xp} XP</p>
            <p className="user-upcoming-level">Sous Chef</p>
            <div className="progress-bar"></div>
            <div className="user-xp-info">
              <p className="user-xp">100 XP</p>
              <p className="user-xp">299 XP</p>
            </div>
          </div>
        </div>
      </div>
      <section className="user-posts">
        <h2 className="profile-posts-title">My Posts</h2>
        {userPosts.length === 0 ? (
          <p>You have not posted anything yet...</p>
        ) : (
          <div className="profile-posts-container">
            {userPosts.map((post) => (
              <ProfilePostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
        )}
      </section>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
