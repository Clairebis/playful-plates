import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";

export default function MyChallengeSlider ({sliderTitle}) {

    const [challenges, setChallenges] = useState([]);


    useEffect(() => {
        async function getChallenges() {
            const url =
                "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const challengesArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })); // from object to array
            setChallenges(challengesArray);
        }
  
        getChallenges();
    }, []);
  
    let challengesToDisplay = [...challenges];

    return (
    <>
        <h2>{sliderTitle}</h2>
        <div className="myChallengeSlider">
                {challengesToDisplay.filter(c => c.categories.includes("Many Ingredients") || c.categories.includes("One Ingredient")).map(challenge => (
                    <MyChallengeCard challenge={challenge} key={challenge.id} />
                ))}
        </div>

      </>
    )
}