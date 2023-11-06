import Button from "../components/Button/Button";
import logoLarge from "../Assets/logoLarge.png";
import "./landing.css";

export default function Landing() {
  return (
    <>
      <div className="landingPage">
        <img src={logoLarge} alt="logo" className="landingLogo" />
        <section className="landingText">
          <p>Lacking inspiration in the kitchen?</p>
          <p>Ready to challenge yourself and your friends?</p>
          <p> Let us help you with that!</p>
        </section>
        <section className="landingButtons">
          <Button text="Login" Link="/login" className="landingButton" />
          <Button
            text="Sign up"
            Link="/signup"
            className="button-outline landingButton"
          />
        </section>
      </div>
    </>
  );
}
