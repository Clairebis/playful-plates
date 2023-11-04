import { useNavigate } from "react-router-dom";
import "./Challengecards.css";
import "./Challengecards.css"
import chefHatIconWhite from "../../assets/Icons/chefHatIconWhite.svg"

export default function ChallengeItem({ post }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/challenges/${post.id}`);
  }

    return (
        <>
        <div className="challenge-card-container">
            <div className="challenge-card" key={post.id} onClick={handleClick}>
                <img className="challenge-image"src={post.image} alt={post.title} />
                <div>
                    <h2>{post.title}</h2>
                    <p>{post.subheading}</p>
                </div>
            </div>

            <div className="challenge-card-bottom">
                <p>2 friends joined</p>
                <div className="challengeCardCompleted">
                    <img
                        src={chefHatIconWhite}
                        alt="chef hat icon"
                    />
                    <p>20 completed</p>
                </div>
            </div>
            
        </div>
        </>
    );
    }
