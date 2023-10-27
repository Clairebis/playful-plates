import { getAuth, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function Home() {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.error("Error signing out", error);
        console.log("Error signing out");
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
