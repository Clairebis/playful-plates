import { useNavigate } from "react-router-dom";
import PostCardUser from "../userAvatars/PostCardUser";

export default function PostCard({ post }) {
  const navigate = useNavigate();

  function openPost() {
    navigate(`/post/${post.id}`);
  }

  return (
    <article className="postCard" onClick={openPost}>
      <img src={post.image} alt={post.title} />
      <section className="postCardLower">
        <PostCardUser uid={post.uid} />
        <h2>{post.title}</h2>
        <p>{post.publishedAt}</p>
        <div className="likes"> {post.likes} likes</div>
      </section>
    </article>
  );
}
