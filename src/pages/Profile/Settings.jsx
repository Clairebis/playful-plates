import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import Header from "../../components/Header/Header";

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
    <>
      <section className="page">
        <Header pageTitle="Settings" />
      </section>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Settings;
