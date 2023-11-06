import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logoLarge from "../Assets/logoLarge.png";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../Components/Button/Button";
import "./logIn.css";
import { TextField } from "@mui/material";

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
            placeholder="abc@email.com"
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
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <Button
            text="Login"
            onClick={onLogin}
            className="loginButton"
          ></Button>
        </div>
      </form>

      <div className="loginSignupLink">
        <p>Don't have an account?</p>
        <NavLink to="/signup" className="signUpLink">
          Sign up
        </NavLink>
      </div>
    </div>
  );
}
