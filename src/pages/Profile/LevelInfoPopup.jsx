/*------------Paulius----------*/

import "./LevelInfoPopup.css";
import kitchenPorterImage from "../../Assets/Levels/kitchen-porter.svg";
import kitchenAssistantImage from "../../Assets/Levels/kitchen-assistant.svg";
import sousChefImage from "../../Assets/Levels/sous-chef.svg";
import chefImage from "../../Assets/Levels/chef.svg";
import headChefImage from "../../Assets/Levels/head-chef.svg";
import close from "../../Assets/Icons/close.svg";

function LevelInfoPopup({ isVisible, onClose }) {
  // Check if the popup is visible; if not, return null to hide it
  if (!isVisible) return null;

  const levels = [
    {
      image: kitchenPorterImage,
      title: "Kitchen Porter",
      description: "Start your journey",
      xpRange: "0-99 XP",
    },
    {
      image: kitchenAssistantImage,
      title: "Kitchen Assistant",
      description: "Progress to the next level",
      xpRange: "100-299 XP",
    },
    {
      image: sousChefImage,
      title: "Sous Chef",
      description: "Achieve the title of Sous Chef",
      xpRange: "300-599 XP",
    },
    {
      image: chefImage,
      title: "Chef",
      description: "Master your culinary skills",
      xpRange: "900-999 XP",
    },
    {
      image: headChefImage,
      title: "Head Chef",
      description: "Become the ultimate culinary authority",
      xpRange: "1000+ XP",
    },
  ];

  return (
    <div className="level-info-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h1>Your level explained</h1>
          <img
            src={close}
            alt="Close"
            className="close-button"
            onClick={onClose}
          />
        </div>
        <p>
          Gain Experience Points (XP) by participating in challenges and inviting friends. Climb the
          ranks from Kitchen Porter to Head Chef. Here's how the XP system works:
        </p>
        <div className="level-list">
          {levels.map((level, index) => (
            <div
              key={index}
              className="level-item">
              <img
                src={level.image}
                alt={level.title}
                className="level-image"
              />
              <div className="level-details">
                <p className="level-title">{level.title}</p>
                <p className="level-description">{level.description}</p>
                <p>{level.xpRange}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelInfoPopup;
