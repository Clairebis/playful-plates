import Button from "../../components/Button/Button";
import "./ChallengeCompleted.css";
import CircularBar from "./CircularBar";

export default function ChallengeCompleted() {
  return (
    <section className="page">
      <div className="successPostContent">
        <div className="xpContainer">
          <CircularBar />
        </div>
        <h1>Congratulations, </h1>
        <h1>Chef Extraordinaire!</h1>
        <p className="successP">
          Challenge completed, keep up the great work and continue to savor your
          success in the kitchen!
        </p>

        <Button text="See what others did" Link="/feed" className="bigBtn" />
        <p className="removeBtnTertiary"> Join new challenge</p>
      </div>
    </section>
  );
}
