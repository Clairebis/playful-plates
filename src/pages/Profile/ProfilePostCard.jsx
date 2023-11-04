import { useNavigate } from "react-router-dom";
import "./ProfilePostCard.css";

function ProfilePostCard({ post }) {
  const navigate = useNavigate();

  const handlePostClick = () => {
    if (post && post.id) {
      navigate(`/post/${post.id}`);
    } else {
      console.error("Invalid post data or post ID is missing", post);
    }
  };

  return (
    <div
      onClick={handlePostClick}
      className="profile-post-card-link">
      <div className="profile-post-card">
        {post && post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="profile-post-card-image"
          />
        )}
        <div className="profile-post-card-lower">
          {post && post.title && <p className="profile-post-card-bold">{post.title}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePostCard;
