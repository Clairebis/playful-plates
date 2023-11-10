//-----------Siiri, Natalia, Claire (and thank you for help Rasmus!-------------//

import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import NoChallengesCard from "../NoChallengesCard";

export default function MyChallengeSlider({ sliderTitle, challenges }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const auth = getAuth();

  // useEffect to fetch and update the user's challenges when the component mounts

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    console.log("uid", uid);
    // Get the user's unique ID
    async function fetchData() {
      if (uid) {
        // Fetch the user's data
        const userDataUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
        const response = await fetch(userDataUrl);
        const userData = await response.json();

        // Fetch the user's posts data (challenges data)
        const postsUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="uid"&equalTo="${uid}"`;
        const postsResponse = await fetch(postsUrl);
        const postsData = await postsResponse.json();
        console.log("User data:", userData);
        console.log("Post data:", postsData);

        //turn object of objects into an array of objects and only include challenges that are not completed
        const userPosts = Object.values(postsData).filter(
          (post) => post.challengeCompleted === false
        );
        console.log(userPosts);

        // Push challenges that match challengeId from userPosts array into filteredChallenges array
        const filteredChallenges = [];
        for (const post of userPosts) {
          const challenge = challenges.find(
            (challenge) => challenge.id == post.challengeId
          );
          console.log(challenge);
          filteredChallenges.push(challenge);
        }
        console.log(filteredChallenges);
        setMyChallenges([...filteredChallenges]);
      }
    }

    // Fetch user's challenges and challenges data
    try {
      if (myChallenges.length == 0) {
        fetchData();
      }
    } catch (e) {
      console.log(e);
    }
  }, [[]]);

  return (
    <>
      <h2>{sliderTitle}</h2>
      {/* Conditional rendering based on whether the user has challenges */}
      {myChallenges.length === 0 ? (
        // If no challenges, render NoChallengesCard component
        <NoChallengesCard />
      ) : (
        // If challenges exist, render the MyChallengeSlider with mapped MyChallengeCard components
        <div className="myChallengeSlider">
          {myChallenges.map((challenge) => (
            <MyChallengeCard challenge={challenge} />
          ))}
        </div>
      )}
    </>
  );
}
