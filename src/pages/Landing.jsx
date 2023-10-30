import { Link } from "react-router-dom";
import Button from "../components/Button/Button";

export default function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <Button text="Login" Link="/login"/>
      <Button text="Sign up" Link="/signup"/>
    </div>
  );
}
