import { useNavigate } from "react-router-dom";
import PostCardUser from "../userAvatars/PostCardUser";
import Heart from "react-heart";
import { useState } from "react";

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  function openPost() {
    navigate(`/post/${post.id}`);
  }

  return (
    <section style={{ marginBottom: "5rem" }}>
      <article className="postCard" onClick={openPost}>
        <img src={post.image} alt={post.title} />
        <section className="postCardLower">
          <PostCardUser uid={post.uid} />
          <h2>{post.title}</h2>
          <p>{post.publishedAt}</p>
        </section>
      </article>
      <div className="likes">
        <div style={{ width: "2rem" }}>
          <Heart isActive={active} onClick={() => setActive(!active)} />
        </div>
        <div> {post.likes} likes </div>
      </div>
    </section>
  );
}
