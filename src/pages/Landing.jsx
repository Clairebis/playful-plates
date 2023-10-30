import { Link } from "react-router-dom";
import Button from "../components/Button";


export default function Landing() {

  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Log In</Link>
      <Button text={"Log In"} className={"green"} Link={"/login"} />
    </div>
  );
}
