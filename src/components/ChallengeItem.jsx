
import { useNavigate } from "react-router-dom";

export default function ChallengeItem({ post }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/posts/${post.id}`);
    }

    // Function to get formatted member birthday
    function formatCreatedAt() {
        const date = new Date(post.createdAt);
        const formattedDate = date.toLocaleString("en-GB", {
            month: "numeric",
            day: "numeric",
            year: "numeric"
        });
        return formattedDate;
    }

    return (
        <article key={post.id} onClick={handleClick}>
            <img src={post.image} alt={post.caption} />
            <h3>{post.caption}</h3>
            <p>{formatCreatedAt()}</p>
        </article>
    );
    }