/*------------Claire and Siiri ----------*/


import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "../../pages/Home/Home.css";
import Button from "../../components/Button/Button";
import SmallChallengeSlider from "../../components/ChallengeCards/Sliders/SmallChallengeSlider";
import MyChallengeSlider from "../../components/ChallengeCards/Sliders/MyChallengeSlider";
import ComingChallengeSlider from "../../components/ChallengeCards/Sliders/ComingChallengeSlider.jsx";

export default function Home() {
  const auth = getAuth();
  const uid = auth.currentUser?.uid; // User ID from Firebase authentication
  const [name, setName] = useState(""); // State variable to store user's name

  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

    // Effect to fetch user data and update state when the component mounts or user changes
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

  const [challenges, setChallenges] = useState([]); // State variable to store challenges

    // Effect to fetch challenges data and update state when the component mounts
  useEffect(() => {
    async function getChallenges() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const challengesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      setChallenges(challengesArray); // Setting the state with challenges data
    }

    getChallenges();
  }, []); //Dependencies: useEffect is executed when the component mounts

  return (
    <>
      <div className="page home-content">
        <HomeHeader />
        <h1>Hello {name}!</h1>
        <MyChallengeSlider
          sliderTitle="My challenges"
          challenges={challenges}
        />
        <SmallChallengeSlider
          sliderTitle="Featured challenges"
          challenges={challenges}
        />
        <Button
          className="button-yellow home-challenge-button"
          text="Discover more challenges"
          Link="/challenges"
        />
        <ComingChallengeSlider
          sliderTitle="Coming soon"
          challenges={challenges}
        />
      </div>
    </>
  );
}
