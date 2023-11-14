import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import NoChallengesCard from "../NoChallengesCard";

export default function MyChallengeSlider({ sliderTitle, challenges }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  console.log("uid", uid);

  useEffect(() => {
    async function fetchData() {
      if (uid) {
        // Fetch the user's challenges data
        const userDataUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
        const response = await fetch(userDataUrl);
        const userData = await response.json();
        console.log("User data:", userData);

        const postsUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="uid"&equalTo="${uid}"`;
        const postsResponse = await fetch(postsUrl);
        const postsData = await postsResponse.json();
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
      {myChallenges.length === 0 ? (
        <NoChallengesCard />
      ) : (
        <div className="myChallengeSlider">
          {myChallenges.map((challenge) => (
            <MyChallengeCard challenge={challenge} />
          ))}
        </div>
      )}
    </>
  );
}
