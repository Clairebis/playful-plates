import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FullPostUser from "../components/userAvatars/FullPostUser";
import Heart from "react-heart";
import "./fullpost.css";
import arrow from "../Assets/Icons/arrowback.svg";
import Button from "../components/Button/Button";

export default function FullPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;
  const [active, setActive] = useState(false);

  const [post, setPost] = useState({
    image: "",
    title: "",
    challengeid: "",
    uid: "",
    description: "",
    tags: [],
    likes: "",
    publishedAt: "",
  });

  const [likeCount, setLikeCount] = useState(post.likes);

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  function handleLikeClick() {
    setActive(!active);

    // Update the like count based on the active state (not connected to db...)
    if (active) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  }

  async function deletePost() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
        });

        if (response.ok) {
          console.log("Post deleted");
          navigate("/feed"); // Redirect to feed
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

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
    }
    getPost();
  }, [url]);

  return (
    <section>
      <div onClick={goBack} className="fullPostBack">
        <img src={arrow} alt="back arrow" />
      </div>

      <article style={{ marginBottom: "10rem" }}>
        <img src={post.image} alt={post.title} className="fullPostImage" />
        <section className="postCardLower">
          <section className="fullPostButtons">
            <Button
              text="Delete"
              className="button-outline"
              onClick={deletePost}
            ></Button>
            <Link to={`/post/${post.id}/update`} className="button-green">
              Edit
            </Link>
          </section>
          <h2 className="bottom8">{post.title}</h2>
          <p className="small ">{post.challengeid}</p>
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
            <div> {likeCount} likes </div>
          </div>
          <p>Published {post.publishedAt}</p>
        </section>
      </article>
    </section>
  );
}
