/*------------Siiri ----------*/

import { useNavigate } from "react-router-dom";
import "./Challengecards.css";
import noChallenges from "../../assets/noChallenges.png";
import Button from "../Button/Button";

export default function NoChallengesCard({ challenge }) {
  const navigate = useNavigate();

  // Function to handle clicks on the card and navigate to the specific challenge

  function handleClick() {
    navigate(`/challenges/${challenge.id}`);
  }

  return (
    <>
      <div className="challenge-card-container">
        <div className="no-challenge-card" onClick={handleClick}>
          <img src={noChallenges} className="challenge-image" />
          <div className="no-challenge-card-content">
            <h2>No challenges yet!</h2>
            <Button
              className="button-kale"
              Link="/challenges"
              text="Join a challenge"
            />
          </div>
        </div>
      </div>
    </>
  );
}
