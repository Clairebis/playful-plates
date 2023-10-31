import { createUserWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import { useState } from "react";

export default function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in and create user
        const user = userCredential.user;
        console.log(user);

        const level = "Kitchen Assistant";
        createUser(user.uid, email, username, level);

        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  async function createUser(uid, email, username, level) {
    const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ email, username, level }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("New user created: ", data);
    } else {
      console.log("Sorry, something went wrong");
    }
  }

  return (
    <div>
      <form>
        <div>
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            label="Create username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Username"
          />
        </div>

        <button type="submit" onClick={onSubmit}>
          Sign up
        </button>
      </form>

      <p>
        Already have an account? <NavLink to="/login">Log in</NavLink>
      </p>
    </div>
  );
}
