/*------------Paulius ----------*/

import { useNavigate } from "react-router-dom";
import "./ProfilePostCard.css";

function ProfilePostCard({ post }) {
  const navigate = useNavigate();

  // Function to open the post when the card is clicked
  function openPost() {
    const postUrl = `/post/${post.id}`;
    console.log(postUrl);
    navigate(postUrl);
  }

  return (
    <div
      onClick={openPost}
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
