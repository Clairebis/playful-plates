import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <Link to="/SignUp">Sign Up</Link>
      <Link to="/login">Log In</Link>
    </div>
  );
}
