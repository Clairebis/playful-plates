/*Claire*/

// Importing necessary modules and components
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FullPostUser from "../../components/userAvatars/FullPostUser";
import Heart from "react-heart";
import "./fullpost.css";
import arrow from "../../Assets/Icons/arrowback.svg";
import Button from "../../components/Button/Button";
import { getAuth } from "firebase/auth";

// FullPost component definition
export default function FullPost() {
  // Extracting parameters from the URL and initializing state variables
  const params = useParams();
  const navigate = useNavigate();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.postId}.json`;
  const postId = params.postId;
  const [active, setActive] = useState(false);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // State for storing post data
  const [post, setPost] = useState({
    image: "",
    title: "",
    challengeid: "",
    challengeTitle: "",
    uid: "",
    description: "",
    tags: [],
    likes: "",
    publishedAt: "",
  });

  // Function to navigate back to the previous page
  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  // Asynchronous function to delete a post
  async function deletePost() {
    // Display confirmation dialog for deleting the post
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      try {
        // Sending a DELETE request to the server to delete the post
        const response = await fetch(url, {
          method: "DELETE",
        });

        // Check if the deletion was successful
        if (response.ok) {
          console.log("Post deleted");
          // Redirect to the feed after successful deletion
          navigate("/feed");
        } else {
          console.log("An error occurred while deleting the post");
          // Handle the error, show a message to the user, or perform other error-specific actions.
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        // Handle unexpected errors, display a user-friendly message, or perform necessary actions.
      }
    }
  }

  // useEffect hook to fetch and update post data
  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
      console.log("Fetched postData:", postData);
    }
    // Triggering the effect only when the URL changes
    // (when postId or url changes)
    getPost();
  }, [url]);

  // Function to handle like button clicks and update like count
  function handleLikeClick() {
    setActive(!active);

    // Update the like count based on the active state (not connected to db...)
    if (active) {
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost.likes - 1,
      }));
    } else {
      setPost((prevPost) => ({
        ...prevPost,
        likes: prevPost.likes + 1,
      }));
    }
  }

  // Rendering the FullPost component
  return (
    <section>
      <div onClick={goBack} className="fullPostBack">
        <img src={arrow} alt="back arrow" />
      </div>

      <article style={{ marginBottom: "10rem" }}>
        <img src={post.image} alt={post.title} className="fullPostImage" />
        <section className="postCardLower">
          {currentUser && currentUser.uid === post.uid && (
            <section className="fullPostButtons">
              <Button
                text="Delete"
                className="button-outline"
                function={deletePost}
              ></Button>
              <Link to={`/post/${postId}/update`} className="button-green">
                Edit
              </Link>
            </section>
          )}

          <h2 className="bottom8">{post.title}</h2>
          <p className="small ">{post.challengeTitle}</p>
          <FullPostUser uid={post.uid} />
          <p className="fullPostDescription">{post.description}</p>
          {/*<div className="tags">
          {post.tags.map((tag) => (
            <span key={tag.id} tag={tag}></span>
          ))}
          </div>*/}
          <div className="fullPostLikes">
            <div className="fullPostHeart">
              <Heart isActive={active} onClick={handleLikeClick} />
            </div>
            <div> {post.likes} likes </div>
          </div>
          <p>Published {post.publishedAt}</p>
        </section>
      </article>
    </section>
  );
}
