import { useNavigate } from "react-router-dom";
import "./Challengecards.css"
import Countdown from "../Countdown";

export default function ComingChallengeCard({ challenge}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/challenges/${challenge.id}`);
    }

    return (
        <>
        <div className="challenge-card-container">
            <div className="challenge-card-coming" key={challenge.id} onClick={handleClick}>
                <img className="challenge-image"src={challenge.image} alt={challenge.title} />
                <div className="challenge-card-content">
                    <div className="challenge-card-text">
                        <h2>{challenge.title}</h2>
                        <p>{challenge.subheading}</p>
                    </div>
                    <Countdown/>
                </div>
            </div>
            
        </div>
        </>
    );
    }