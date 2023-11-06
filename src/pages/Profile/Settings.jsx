import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function Settings() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Error signing out", error);
      });
  };

  return (
    <div>
      <h1>Settings</h1>
      {/* Other settings content can go here */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Settings;
