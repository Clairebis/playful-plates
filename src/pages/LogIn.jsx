import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
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
    <div className="page">
      <img src={logoLarge} alt="logo" className="landingLogo" />
      <h2 className="loginHeading">Log in</h2>
      <form>
        <div className="loginInputContainer">
          <TextField
            id="email-address"
            className="loginInput"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="loginInputContainer">
          <TextField
            id="password"
            className="loginInput"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button onClick={onLogin} className="loginButton button-green">
            Login
          </button>
        </div>
      </form>

      <div className="loginSignupLink">
        <p>Don't have an account? </p>
        <NavLink to="/signup" className="signUpLink">
          Sign up
        </NavLink>
      </div>
    </div>
  );
}
