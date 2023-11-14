import { useNavigate } from "react-router-dom";
import "./Challengecards.css";
import chefHatIconWhite from "../../assets/Icons/chefHatIconWhite.svg";
import placeholderImg from "../../Assets/Portrait_Placeholder.png";
import { useEffect, useState } from "react";

export default function MyChallengeCard({ challenge }) {
  console.log("THAT IS THE CHALLENGE DATA:", challenge);
  const [postsData, setPostsData] = useState([]);
  const [completedPostsCount, setCompletedPostsCount] = useState("");
  const navigate = useNavigate();

  function handleClick() {
    navigate(`challenges/${challenge.id}`);
  }

  //fetch posts with particular challengeId and count how many have challengeCompleted==true, so they are active
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(
          "AM I EVEN FETCHING ANYTHING_______________________________________________________"
        );
        const postsUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json?orderBy="challengeId"&equalTo="${challenge.id}"`;
        console.log("POST URL", postsUrl);
        const postsResponse = await fetch(postsUrl);

        if (!postsResponse.ok) {
          throw new Error("Failed to fetch the posts data");
        }
        const postsData = await postsResponse.json();
        console.log("Post data ChallengeCard -------------:", postsData);

        // Count the number of completed posts
        let completedPosts = Object.values(postsData || {});
        completedPosts = Object.values(postsData).filter(
          (post) => post.challengeCompleted === true
        );

        // Update the state with the fetched data and completed posts count
        //setPostsData(postsData);
        console.log(
          "THESE ARE FETCHED POSTS--------------------------:",
          postsData
        );
        setCompletedPostsCount(completedPosts.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }

    fetchData();
  }, [[]]);

  return (
    <>
      <div className="challenge-card-container">
        <div
          className="challenge-card"
          key={challenge?.id}
          onClick={handleClick}
        >
          <img
            className="challenge-image"
            src={challenge?.image}
            alt={challenge?.title}
          />
          <div>
            <h2>{challenge?.title}</h2>
            <p>{challenge?.subheading}</p>
          </div>
        </div>

        <div className="challenge-card-bottom">
          <div className="friendsChallengeCard">
            {" "}
            <img src={placeholderImg} alt="" />
            <p>No friends joined yet</p>
          </div>
          <div className="challengeCardCompleted">
            <img src={chefHatIconWhite} alt="chef hat icon" />
            <p>{completedPostsCount} completed</p>
          </div>
        </div>
      </div>
    </>
  );
}
