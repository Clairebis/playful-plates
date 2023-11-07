import { useNavigate } from "react-router-dom";
import "./Challengecards.css"
import noChallenges from "../../assets/noChallenges.png"


export default function NoChallengeCard({ challenge}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/challenges/${challenge.id}`);
    }

    return (
        <>
        <div className="challenge-card-container">
            <div className="challenge-card" key={challenge.id} onClick={handleClick}>
                <img src={noChallenges} />
                <div>
                    <h2>No challenges yet!</h2>
                    <p>{challenge.subheading}</p>
                </div>
            </div>

        </div>
        </>
    );
    }
