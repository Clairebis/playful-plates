import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "../../pages/Home/Home.css"
import ChallengeSlider from "../../components/ChallengeCards/ChallengeSlider";

export default function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;
  const [username, setUsername] = useState("");

  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        //if userData exists, set states with values from userData (firebase)
        setUsername(userData.username);
      }
    }
    getUser();
  }, [auth.currentUser, url]); // dependencies: useEffect is executed when auth.currentUser changes

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       navigate("/");
  //       console.log("Signed out successfully");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.error("Error signing out", error);
  //       console.log("Error signing out");
  //     });

  
  return (
    <>
    <div className="page">
      <HomeHeader/>
      <h1>Hello {username}</h1>
      <ChallengeSlider sliderTitle="My Challenges"/>
    </div>
      {/* <div>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </>
  );
}
