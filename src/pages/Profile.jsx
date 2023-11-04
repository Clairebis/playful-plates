import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Add this import
import "@splidejs/splide/dist/css/splide.min.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import ProfilePostCard from "./Profile/ProfilePostCard";
import infoIcon from "../Assets/Icons/info-icon.svg";
import editIcon from "../Assets/Icons/picture-edit.svg";
import "./Profile/Profile.css";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    image: "",
    name: "",
    level: 0,
    xp: 0,
  });
  const [userPosts, setUserPosts] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const sliderOptions = {
    type: "slide",
    perPage: 2.5,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    arrows: false,
    focus: "center",
  };

  const handleEditProfile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      setSelectedImage(file);
    };
    input.click();
  };

  const uploadImage = async (imageFile) => {
    if (imageFile) {
      const storage = getStorage(); // Initialize Firebase Storage
      const storageRef = ref(storage, "profile-images/" + auth.currentUser.uid);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        () => {
          // Handle progress (if needed)
        },
        (error) => {
          console.error("Error uploading image", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              // Update the user's image in the Firebase Realtime Database
              const uid = auth.currentUser.uid;
              const userRef = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

              fetch(userRef, {
                method: "PATCH", // Use PATCH to update the existing data
                body: JSON.stringify({ image: downloadURL }),
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then(() => {
                  // Update the user's profile image in the state
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    image: downloadURL,
                  }));
                })
                .catch((error) => {
                  console.error("Error updating user image in the database", error);
                });
            })
            .catch((error) => {
              console.error("Error getting image download URL", error);
            });
        }
      );
    }
  };

  useEffect(() => {
    uploadImage(selectedImage);
  }, [selectedImage]);

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
            <button
              className="edit-button"
              onClick={handleEditProfile}>
              <img
                src={editIcon}
                alt="Edit Profile"
                className="edit-icon"
              />
            </button>
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
          <Splide options={sliderOptions}>
            {userPosts.map((post) => (
              <SplideSlide key={post.id}>
                <ProfilePostCard
                  post={post}
                  onClick={() => navigate(`/fullpost/${post.id}?fromProfile=true`)}
                />
              </SplideSlide>
            ))}
          </Splide>
        )}
      </section>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
