/*------------Siiri ----------*/

import { useNavigate } from "react-router-dom"; // Navigation tool
import "./Challengecards.css"; // Styles for the card
import Countdown from "../Countdown/Countdown"; // Countdown feature

export default function ComingChallengeCard({ challenge }) {
  const navigate = useNavigate();

  // Function to handle clicks on the card and navigate to the specific challenge
  function handleClick() {
    navigate(`/challenges/${challenge.id}`); // Navigate to challenge details
  }

  return (
    <>
      <div className="challenge-card-container">
        <div
          className="challenge-card-coming"
          key={challenge.id}
          onClick={handleClick}
        >
          <img
            className="challenge-image"
            src={challenge.image}
            alt={challenge.title}
          />
          <div className="challenge-card-content">
            <div className="challenge-card-text">
              <h2>{challenge.title}</h2>
              <p>{challenge.subheading}</p>
            </div>
            <Countdown />
          </div>
        </div>
      </div>
    </>
  );
}
