/*Claire*/

import { useNavigate } from "react-router-dom";
import PostCardUser from "../userAvatars/PostCardUser";
import Heart from "react-heart";
import { useState } from "react";
import "./postCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  function openPost() {
    navigate(`/post/${post.id}`);
  }

  function handleLikeClick() {
    setActive(!active);

    // Update the like count based on the active state (not connected to db...)
    if (active) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  }

  return (
    <section className="postCardContainer">
      <article className="postCard" onClick={openPost}>
        <img src={post.image} alt={post.title} className="postCardImage" />
        <section className="postCardLower">
          <PostCardUser uid={post.uid} />
          <p className="postCardBoldTitle">{post.title}</p>
          <p className="postCardDate">{post.publishedAt}</p>
        </section>
      </article>
      <div className="postCardLikes">
        <div className="postCardHeart">
          <Heart isActive={active} onClick={handleLikeClick} />
        </div>
        <div className="postCardLikeText"> {likeCount} likes </div>
      </div>
    </section>
  );
}
