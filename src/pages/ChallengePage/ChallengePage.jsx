/*----------------------------NATALIA---------------------------*/

import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./ChallengePage.css";
import placeholderImg from "../../Assets/Portrait_Placeholder.png";

export default function ChallengePage() {
  // fetch all information about challenge from the database
  let { challengeId } = useParams();
  let { userId } = useParams();
  challengeId -= 0; //adjusted manually
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges/${challengeId}.json`;
  const urlPosts =
    "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

  console.log("Challenge Id", challengeId);
  console.log("User ID", userId);

  const [challenge, setChallenge] = useState({
    description: "",
    title: "",
    subheading: "",
    image: "",
    difficultylevel: "",
    xppoints: "",
  });

  useEffect(() => {
    //fetch challenge data based on challengeId
    async function getChallenge() {
      const response = await fetch(url);
      const challengeData = await response.json();
      setChallenge(challengeData);
    }
    getChallenge();
  }, [url]);

  //render div with buttons depending on post database
  const [postExists, setPostExists] = useState(false);
  useEffect(() => {
    //fetch posts data based on challengeId and userId
    async function getPostExists() {
      const response = await fetch(urlPosts);
      const postsData = await response.json();
      console.log(postsData);
      const exists = postsData.some(
        (post) => post.uid === userId && post.challengeId === challengeId
      );
      if (exists) {
        // The user has already joined the challenge, so set the state to true
        setPostExists(true);
      }
    }
    getPostExists();
  }, [userId, challengeId]);

  return (
    <section className="page">
      <Header className="singleArrow" />

      <div className="challengePageHeadings">
        <h1>{challenge.title}</h1>
        <h2>{challenge.subheading}</h2>
        <img src={challenge.image} alt={challenge.title} />
      </div>

      <div className="challengePageDifficulty">
        <div>
          {" "}
          <p>
            Difficulty:{" "}
            <span className="boldSpan">{challenge.difficultylevel} </span>
          </p>
        </div>
        <div className="challengeXPLabel">
          {" "}
          <p>
            <span className="boldSpan">{challenge.xppoints} XP</span>
          </p>
        </div>
      </div>
      <p>{challenge.description}</p>

      {/*----------- INFO ABOUT FRIENDS-PLACEHOLDER, NOT DYNAMIC------------*/}
      <div className="friendsChallengePage">
        {" "}
        <img src={placeholderImg} alt="" />
        <p>No friends joined yet</p>
      </div>

      {/*----------Part that renders based on Posts in database----------*/}

      <div className="buttonsChallengePage" style={{ display: "none" }}>
        {postExists ? (
          <Button text="Complete Challenge" />
        ) : (
          <Button text="Join Challenge" />
        )}
      </div>
      <div className="buttonsChallengePage">
        <Button text="Share with Friends" className="button-outline" />
        <Button text="Join Challenge" />
      </div>
    </section>
  );
}
