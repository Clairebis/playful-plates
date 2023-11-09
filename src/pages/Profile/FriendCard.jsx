/*------------Paulius ----------*/

import moreImage from "../../Assets/Icons/more.svg";

const FriendCard = ({ friend, onRemoveFriend }) => {
  return (
    <div className="friends-user-info">
      <div className="container-flex">
        <img
          src={friend?.image}
          alt="User"
          className="friend-user-image"
        />
        <div className="friend-user-details">
          <p className="friend-user-name">{friend?.name}</p>
          <p className="friend-user-username">{friend?.username}</p>
          <p className="friend-user-level">{friend?.level}</p>
          <p className="friend-user-xp">{friend?.xp} XP</p>
        </div>
      </div>
      <div className="more-icon">
        <img
          src={moreImage}
          alt="More"
          className="more-image"
          onClick={() => onRemoveFriend(friend)}
        />
      </div>
    </div>
  );
};

export default FriendCard;
