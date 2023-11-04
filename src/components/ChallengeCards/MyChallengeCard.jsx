import { useNavigate } from "react-router-dom";
import "./Challengecards.css"
import chefHatIconWhite from "../../assets/Icons/chefHatIconWhite.svg"

export default function MyChallengeCard({ challenge}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/challenges/${challenge.id}`);
    }

    return (
        <>
        <div className="challenge-card-container">
            <div className="challenge-card" key={challenge.id} onClick={handleClick}>
                <img className="challenge-image"src={challenge.image} alt={challenge.title} />
                <div>
                    <h2>{challenge.title}</h2>
                    <p>{challenge.subheading}</p>
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
