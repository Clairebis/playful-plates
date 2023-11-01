import { useNavigate } from "react-router-dom";
import PostCardUser from "../userAvatars/PostCardUser";
import Heart from "react-heart";
import { useState } from "react";
import "./postCard.css";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  function openPost() {
    navigate(`/post/${post.id}`);
  }

  return (
    <section className="container">
      <article className="postCard" onClick={openPost}>
        <img src={post.image} alt={post.title} className="postCardImage" />
        <section className="postCardLower">
          <PostCardUser uid={post.uid} />
          <p className="bold">{post.title}</p>
          <p className="postCardDate">{post.publishedAt}</p>
        </section>
      </article>
      <div className="likes">
        <div className="heart">
          <Heart isActive={active} onClick={() => setActive(!active)} />
        </div>
        <div className="likeText"> {post.likes} likes </div>
      </div>
    </section>
  );
}
