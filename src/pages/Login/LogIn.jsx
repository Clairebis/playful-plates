/*Claire*/

// Importing necessary modules and components
import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextField from "@mui/material/TextField";
import logoLarge from "../../Assets/logoLarge.png";
import { NavLink, useNavigate } from "react-router-dom";
import "./logIn.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Login component definition
export default function Login() {
  // Initializing state variables and authentication-related objects
  const navigate = useNavigate();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login form submission
  const onLogin = (event) => {
    event.preventDefault();
    // Attempting to sign in with provided email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        // Handling sign-in errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // Handling toast error messages
        if (error.code === "auth/wrong-password") {
          toast.error("Please check your password", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/invalid-login-credentials") {
          toast.error("Your email and/or password do not match", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/user-not-found") {
          toast.error("Your email address is not recognised", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/invalid-email") {
          toast.error("Please provide a valid email address", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/missing-password") {
          toast.error("Please enter your password", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/missing-email") {
          toast.error("Please enter your email address", {
            className: "toastMessage",
          });
        }
        if (error.code === "auth/too-many-requests") {
          toast.error("Too many requests. Please try again later", {
            className: "toastMessage Toastify__progress-bar--error",
          });
        }
      });
  };

  // Rendering the login page
  return (
    <div className="page">
      <ToastContainer></ToastContainer>
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
