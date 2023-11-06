import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logoLarge from "../Assets/logoLarge.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./logIn.css";

export default function Login() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <img src={logoLarge} alt="logo" className="landingLogo" />
      <form>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button onClick={onLogin}>Login</button>
        </div>
      </form>

      <p>
        No account yet? <NavLink to="/signup">Sign up</NavLink>
      </p>
    </div>
  );
}
