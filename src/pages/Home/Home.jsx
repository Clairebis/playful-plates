import { getAuth /*signOut*/ } from "firebase/auth";
import { useEffect, useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "../../pages/Home/Home.css";
import Button from "../../components/Button/Button";
import SmallChallengeSlider from "../../components/ChallengeCards/Sliders/SmallChallengeSlider";
import MyChallengeSlider from "../../components/ChallengeCards/Sliders/MyChallengeSlider";
import ComingChallengeSlider from "../../components/ChallengeCards/Sliders/ComingChallengeSlider.jsx";
//import { set } from "@firebase/database";

export default function Home() {
  const auth = getAuth();
  // const navigate = useNavigate();
  const uid = auth.currentUser?.uid;

  const [name, setName] = useState("");

  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        //if userData exists, set states with values from userData (firebase)

        setName(userData.name);
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
      <div className="page home-content">
        <HomeHeader />
        <h1>Hello {name}!</h1>
      </div>
      <div className="pageLeftPadding">
        <MyChallengeSlider sliderTitle="My challenges" />
        <SmallChallengeSlider sliderTitle="Featured challenges" />
        <Button
          className="button-yellow home-challenge-button page"
          text="Discover more challenges"
          Link="/challenges"
        />
        <ComingChallengeSlider sliderTitle="Coming soon" />
      </div>
      {/* <div>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </>
  );
}
