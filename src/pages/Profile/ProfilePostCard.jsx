import "./ProfilePostCard.css";

function ProfilePostCard({ post }) {
  return (
    <div className="profile-post-card">
      <img
        src={post.image}
        alt={post.title}
        className="profile-post-card-image"
      />
      <div className="profile-post-card-lower">
        <p className="profile-post-card-bold">{post.title}</p>
      </div>
    </div>
  );
}

export default ProfilePostCard;
