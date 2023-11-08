import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import NoChallengesCard from "../NoChallengesCard";

export default function MyChallengeSlider({ sliderTitle }) {
  const [myChallenges, setMyChallenges] = useState([]);
  const [challengeData, setChallengeData] = useState({}); // State to store challenges data
  const [challengeIds, setChallengeIds] = useState([]); // State to store challenge ids

  useEffect(() => {
    const auth = getAuth();
    const uid = auth.currentUser?.uid;

    async function fetchData() {
      if (uid) {
        // Fetch the user's challenges data
        const userDataUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
        const response = await fetch(userDataUrl);
        const userData = await response.json();

        if (userData && userData.posts) {
          // Filter posts with challengeCompleted set to false
          const filteredChallenges = Object.values(userData.posts).filter(
            (post) => post.challengeCompleted === false
          );
          console.log("User data:", userData);

          // Extract challengeids from filtered challenges
          const challengeIds = filteredChallenges.map(
            (post) => post.challengeid
          );

          // Set challenge ids to state
          setChallengeIds(challengeIds);

          // Fetch the challenges data
          const challengesUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json`;
          const challengesResponse = await fetch(challengesUrl);
          const challengesData = await challengesResponse.json();


          // Set challenges data to state
          setChallengeData(challengesData);
        }
      }
    }

    // Fetch user's challenges and challenges data
    fetchData();
  }, [[]]);

  return (
    <>
      <h2>{sliderTitle}</h2>
        {myChallenges.length === 0 ? (
          <NoChallengesCard/>
        ) : (
          <div className="myChallengeSlider">
            {myChallenges.map((challenge, index) => (
              <MyChallengeCard
                challenge={challenge}
                key={index}
                challengeData={challengeData[challengeIds[index]]}
              />
            ))}
          </div>
        )}
    </>
  );
}
