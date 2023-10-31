import { useNavigate } from "react-router-dom";
import "./Challengecards.css"

export default function ChallengeItem({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/challenges/${post.id}`);
    }

    return (
        <div className="challenge-card-container">
        <article key={post.id} onClick={handleClick}>
            <img src={post.image} alt={post.title} />
            <h1>{post.title}</h1>
            <h2>{post.subheading}</h2>
        </article>
        </div>
    );
    }