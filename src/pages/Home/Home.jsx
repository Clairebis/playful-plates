import { getAuth} from "firebase/auth";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "../../pages/Home/Home.css";
import Button from "../../components/Button/Button";
import SmallChallengeSlider from "../../components/ChallengeCards/Sliders/SmallChallengeSlider";
import MyChallengeSlider from "../../components/ChallengeCards/Sliders/MyChallengeSlider";
import ComingChallengeSlider from "../../components/ChallengeCards/Sliders/ComingChallengeSlider.jsx";

export default function Home() {
  const auth = getAuth();
  // const navigate = useNavigate();
  const uid = auth.currentUser?.uid;
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


  const [challenges, setChallenges] = useState([]);

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
      setChallenges(challengesArray);
    }

    getChallenges();
  }, []);


  return (
    <>
      <div className="page home-content">
        <HomeHeader/>
        <h1>Hello {username}!</h1>
        <MyChallengeSlider sliderTitle="My challenges" challenges={challenges}/>
        <SmallChallengeSlider sliderTitle="Featured challenges" challenges={challenges}/>
        <Button className="button-yellow home-challenge-button" text="Discover more challenges" Link="/challenges"/>
        <ComingChallengeSlider sliderTitle="Coming soon" challenges={challenges}/>
      </div>

    </>
  );
}
