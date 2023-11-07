/*--------------------------------NATALIA-----------------------------------*/

import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./ChallengeCompleted.css";
import CircularBar from "./CircularBar";
import { useEffect, useState } from "react";

export default function ChallengeCompleted() {
  let { postId } = useParams();
  const postUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;
  console.log(postUrl);
  const [xp, setXp] = useState(null);
  const [isPublic, setisPublic] = useState("");

  useEffect(() => {
    // Fetch data when the component mounts
    fetch(postUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Extract the xp value from the data and store it in state
        setXp(data.xp);
        setisPublic(data.public);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [postUrl]);

  //add xp for type of post
  let xpForTypeOfPost = 0;
  if (isPublic) {
    xpForTypeOfPost = 5;
  }
  let xpToShow = Number(xp) + xpForTypeOfPost;

  const navigate = useNavigate();
  function handleClick() {
    navigate("/challenges");
  }

  return (
    <section className="page">
      <div className="successPostContent">
        <div className="xpContainer">
          <h3>{isPublic}</h3>
          <CircularBar xp={xpToShow} />
        </div>
        <h1>Congratulations, </h1>
        <h1>Chef Extraordinaire!</h1>
        <p className="successP">
          Challenge completed, keep up the great work and continue to savor your
          success in the kitchen!
        </p>

        <Button text="See what others did" Link="/feed" className="bigBtn" />
        <Button
          text="See your post"
          Link="/profile"
          className="button-outline bigBtn"
        />
        <p className="removeBtnTertiary btnNewChallenge" onClick={handleClick}>
          {" "}
          Join new challenge
        </p>
      </div>
    </section>
  );
}
