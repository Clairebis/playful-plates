/*Claire*/

import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import { useState } from "react";
import logoLarge from "../Assets/logoLarge.png";
import "./signUp.css";
import TextField from "@mui/material/TextField";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in and create user
        const user = userCredential.user;
        console.log(user);

        const level = "Kitchen Assistant";
        const xp = 0;
        const image =
          "https://firebasestorage.googleapis.com/v0/b/playful-plates-b4a84.appspot.com/o/blank-profile-picture-973460_1280.png?alt=media&token=12c66c11-8e80-4810-ab29-7c7a857a712e";

        createUser(user.uid, email, username, level, name, image, xp);

        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  async function createUser(uid, email, username, level, name, image, xp) {
    const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ email, username, level, name, image, xp }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <div className="page">
      <img src={logoLarge} alt="logo" className="landingLogo" />
      <h2 className="signupHeading">Sign up</h2>
      <form>
        <div className="loginInputContainer">
          <TextField
            className="loginInput"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="abc@email.com"
          />
        </div>

        <div className="loginInputContainer">
          <TextField
            type="password"
            className="loginInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Choose a password"
          />
        </div>

        <div className="loginInputContainer">
          <TextField
            type="text"
            className="loginInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Your name"
          />
        </div>

        <div className="loginInputContainer">
          <TextField
            type="text"
            className="loginInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Choose a username"
          />
        </div>

        <div>
          <button className="loginButton button-green" onClick={onSubmit}>
            Sign up
          </button>
        </div>
      </form>

      <div className="loginSignupLink">
        <p>Already have an account? </p>
        <NavLink to="/login" className="signUpLink">
          Log in
        </NavLink>
      </div>
    </div>
  );
}
