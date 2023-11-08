import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import NoChallengesCard from "../NoChallengesCard";

export default function MyChallengeSlider({ sliderTitle }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const auth = getAuth();
  //get challenge data
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
  
  useEffect(() => {
    const uid = auth.currentUser?.uid;
    console.log("uid", uid)

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
        
        //turn object of objects into an array of objects
        const userPosts=Object.values(postsData)
        console.log(userPosts)

        //push challenges that match challengeId from userPosts array into 
        const filteredChallenges = []
        for (const post of userPosts){
        const challenge = challenges.find(challenge=> challenge.id == post.challengeId)
        console.log(challenge)
        filteredChallenges.push(challenge)
        }
        console.log(filteredChallenges)
        setMyChallenges([...filteredChallenges])
      }
    }

    // Fetch user's challenges and challenges data
    fetchData();
  }, [auth.currentUser?.uid]);

  return (
    <>
      <h2>{sliderTitle}</h2>
        {myChallenges.length === 0 ? (
          <NoChallengesCard/>
        ) : (
          <div className="myChallengeSlider">
            {myChallenges.map((challenge) => (
              <MyChallengeCard
                challenge={challenge}

              />
            ))}
          </div>
        )}
    </>
  );
}
