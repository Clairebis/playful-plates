import { useNavigate } from "react-router-dom";
import "./Challengecards.css";

export default function ChallengeItem({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/challenges/${post.id}`);
  }

  return (
    <div className="challenge-card-container">
      <article className="challenge-card" key={post.id} onClick={handleClick}>
        <img src={post.image} alt={post.title} />
        <div>
          <h2>{post.title}</h2>
          <p>{post.subheading}</p>
        </div>
      </article>
    </div>
  );
}
