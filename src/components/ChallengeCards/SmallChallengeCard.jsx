import { useNavigate } from "react-router-dom";
import "./Challengecards.css"

export default function SmallChallengeCard({ challenge }) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/challenges/${challenge.id}`);
    }

    return (

         <div className="challenge-card-container">
            <div className="challenge-card-small" key={challenge.id} onClick={handleClick}>
                <img className="challenge-image"src={challenge.image} alt={challenge.title} />
                <div>
                    <p className="bold">{challenge.title}</p>
                    <p className="small">{challenge.subheading}</p>
                </div>
            </div>
        </div>

    );
    }