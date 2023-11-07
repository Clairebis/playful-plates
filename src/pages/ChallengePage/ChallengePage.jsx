/*----------------------------NATALIA---------------------------*/
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import "./ChallengePage.css";
import placeholderImg from "../../Assets/Portrait_Placeholder.png";
import { getAuth } from "firebase/auth";
import PostChallenge from "../PostChallenge";
import close from "../../Assets/Icons/close.svg";
import tick from "../../Assets/Icons/tick.svg";

export default function ChallengePage() {
  //fetch information about currently logged in user - uid
  const auth = getAuth();
  const uid = auth.currentUser.uid;

  //fetch all information about challenge from the database
  let { challengeId } = useParams();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges/${challengeId}.json`;
  const urlPosts =
    "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";

  console.log("Challenge Id", typeof challengeId, challengeId);
  console.log("User ID", typeof uid, uid);

  const [challenge, setChallenge] = useState({
    description: "",
    title: "",
    subheading: "",
    image: "",
    categories: "",
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
    //fetch posts data based on challengeId and current user uid
    async function getPostExists() {
      const response = await fetch(urlPosts);
      const postsData = await response.json();
      const exists = Object.values(postsData).some(
        (post) => post.uid == uid && post.challengeId == challengeId
      );
      if (exists) {
        // The user has already joined the challenge, so set the state to true
        console.log(exists);
        setPostExists(true);
        console.log("Post Exists");
      } else {
        console.log("Post does not exist");
        console.log(exists);
      }
    }
    getPostExists();
  }, [uid, challengeId]);

  //create an empty post when CTA Join Challenge is clicked and rerender the div with buttons

  async function joinChallenge(event) {
    event.preventDefault();
    try {
      // Fetch the challenge title based on challengeId
      const challengeTitleUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges/${challengeId}/title.json`;
      const challengeTitleResponse = await fetch(challengeTitleUrl);
      const challengeTitleData = await challengeTitleResponse.json();

      //fetch the XP based on challengeId
      const challengeXPUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges/${challengeId}/xppoints.json`;
      const challengeXPResponse = await fetch(challengeXPUrl);
      const challengeXPData = await challengeXPResponse.json();

      const newPost = {
        challengeCompleted: false,
        image: "",
        title: "",
        description: "",
        tags: "",
        uid: uid,
        publishedAt: "",
        challengeId: challengeId,
        challengeTitle: challengeTitleData,
        public: false,
        likes: "",
        xp: challengeXPData,
      };

      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log(newPost);
        setPostExists(true);
        searchPost();
      } else {
        console.log("An error occurred when posting");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  //everything about modals function
  const modal = document.querySelector(".modalRemove");
  const modalConfirmation = document.querySelector(".confirmation");
  function closeModal() {
    modal.style.display = "none";
    modalConfirmation.style.display = "none";
  }

  function openModal() {
    modal.style.display = "block";
  }
  //delete empty Post with current uid and challenge Id to remove the challenge from list of active and rerender the div with buttons
  async function removeChallenge() {
    try {
      // Fetch the post ID of the post associated with the challenge
      const response = await fetch(urlPosts);
      const postsData = await response.json();
      const post = Object.values(postsData).find(
        (post) => post.uid === uid && post.challengeId === challengeId
      );

      if (post) {
        // If the post is found, delete it
        const postId = Object.keys(postsData).find(
          (key) => postsData[key] === post
        );

        const deleteUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;

        const deleteResponse = await fetch(deleteUrl, {
          method: "DELETE",
        });

        if (deleteResponse.ok) {
          console.log("Post deleted successfully");
          setPostExists(false);
          modal.style.display = "none";
          modalConfirmation.style.display = "block";
          // You can update the state or perform any other necessary actions here
        } else {
          console.log("An error occurred when deleting the post");
        }
      } else {
        console.log("Post not found for this challenge");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  //search for a post with challengeID and uid and challengeCompleted state = "false" to get it's id and pass it to the link
  const [postId, setPostId] = useState("");
  useEffect(() => {
    async function searchPost() {
      try {
        // Fetch posts data from the URL
        const response = await fetch(
          "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
        );
        const postsData = await response.json();
        // Initialize a variable to store the matching postId
        let matchingPostId = null;

        // Iterate through the posts to find a match
        for (const postId in postsData) {
          const post = postsData[postId];
          console.log(
            postId,
            "--------------------",
            post,
            "---------------------",
            uid,
            "----------------",
            challengeId
          );
          // Check if the post meets your search criteria
          if (
            post.uid === uid && // User UID matches
            post.challengeId === challengeId && // Challenge ID matches
            post.challengeCompleted === false // challengeCompleted is false
          ) {
            // A matching post is found
            matchingPostId = postId;
            break; // Exit the loop once a match is found
          }
        }

        // Update the state with the matching postId (or null if no match was found)
        setPostId(matchingPostId);
        console.log(matchingPostId);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
    // Call the searchPost function when the component mounts
    searchPost();
  }, [uid, challengeId]);

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
            <span className="boldSpan">{challenge.categories[0]} </span>
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

      {postExists ? (
        <div className="buttonsChallengePageColumn">
          <Button
            text="Complete Challenge"
            className="completeBtn"
            Link={`/postchallenge/${postId}`}
          />
          <div>
            {" "}
            <p className="removeBtnTertiary" onClick={openModal}>
              Remove challenge from your list
            </p>
          </div>
        </div>
      ) : (
        <div className="buttonsChallengePage">
          <Button text="Share with Friends" className="button-outline" />
          <Button text="Join Challenge" function={joinChallenge} />
        </div>
      )}
      {/*----------Modal when CTA Remove this challenge is clicked ------- */}
      <div className="modalRemove">
        <div className="modalRemoveContent">
          <div className="closeModalRemove">
            <img src={close} alt="" onClick={closeModal} />
          </div>
          <div className="modalRemoveText">
            <p style={{ fontWeight: "bold" }}>
              Are you sure you want to remove this challenge from your list?
            </p>
            <div className="modalBtnHorizontal">
              <Button
                text="No"
                className="button-outline btnSmall"
                function={closeModal}
              />
              <Button
                text="Yes"
                className="btnSmall"
                function={removeChallenge}
              />
            </div>
          </div>
        </div>
      </div>
      {/*----------Modal with removal confirmation ------- */}
      <div className="modalRemove confirmation">
        <div className="modalRemoveContent">
          <div className="closeModalRemove">
            <img src={close} alt="" onClick={closeModal} />
          </div>
          <div className="modalRemoveText">
            <p style={{ fontWeight: "bold" }}>
              Challenge was removed from your active challenges.
            </p>
            <img src={tick} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
