import close from "../../Assets/Icons/close.svg";

import "./FriendsPopup.css";

function FriendsPopup({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="friends-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h1>Send a friend request</h1>
          <p>Send a friend request by typing a username</p>
          <img
            src={close}
            alt="Close"
            className="close-button"
            onClick={onClose}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Username"
            className="username-input"
          />
          <button className="invite-button">Invite</button>
        </div>
      </div>
    </div>
  );
}

export default FriendsPopup;
