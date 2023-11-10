/*------------Siiri ----------*/

import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import NoChallengesCard from "../NoChallengesCard";

export default function MyChallengeSlider({ sliderTitle, challenges }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    console.log("uid", uid);

    async function fetchData() {
      if (uid) {
        // Fetch the user's challenges data
        const userDataUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
        const response = await fetch(userDataUrl);
        const userData = await response.json();
        const postsUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="uid"&equalTo="${uid}"`;
        const postsResponse = await fetch(postsUrl);
        const postsData = await postsResponse.json();
        console.log("User data:", userData);
        console.log("Post data:", postsData);

        //turn object of objects into an array of objects and only with not completed challenges
        const userPosts = Object.values(postsData).filter(
          (post) => post.challengeCompleted === false
        );
        console.log(userPosts);

        //push challenges that match challengeId from userPosts array into
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
      {/* Checking if there are no challenges for the user */}
      {myChallenges.length === 0 ? (
        // If no challenges, render the NoChallengesCard component
        <NoChallengesCard />
      ) : (
        // If there are challenges, render the MyChallengeSlider component
        <div className="myChallengeSlider">
          {/* Mapping through the user's challenges and rendering MyChallengeCard for each */}
          {myChallenges.map((challenge) => (
            <MyChallengeCard challenge={challenge} />
          ))}
        </div>
      )}
    </>
  );
}
