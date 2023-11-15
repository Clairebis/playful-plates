/* ------------ Paulius ------------ */

import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

import "./Settings.css";

import Header from "../../components/Header/Header";
import settingsEdit from "../../Assets/Icons/settings-edit.svg";
import settingsNotify from "../../Assets/Icons/settings-notify.svg";
import settingsFaq from "../../Assets/Icons/settings-faq.svg";
import settingsContact from "../../Assets/Icons/settings-contact.svg";
import settingsPrivacy from "../../Assets/Icons/settings-privacy.svg";

function Settings() {
  const navigate = useNavigate();
  const auth = getAuth();

  // Function to handle user logout
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
      <section className="padding-settings-page">
        <Header pageTitle="Settings" />
        <div className="settings-container-structure">
          <div className="inside-structure">
            <img src={settingsEdit} alt="Edit profile" />
            <p>Edit profile information</p>
          </div>
          <div className="inside-structure-different">
            <div className="together">
              <img src={settingsNotify} alt="Notifications" />
              <p>Notifications</p>
            </div>
            <p>OFF</p>
          </div>
        </div>
        <div className="settings-container-structure">
          <div className="inside-structure">
            <img src={settingsFaq} alt="FAQ" />
            <p>FAQ</p>
          </div>
          <div className="inside-structure">
            <img src={settingsContact} alt="Contact" />
            <p>Contact us</p>
          </div>
          <div className="inside-structure">
            <img src={settingsPrivacy} alt="Edit profile" />
            <p>Privacy policy</p>
          </div>
        </div>
        <button className="settings-button-logout" onClick={handleLogout}>
          Logout
        </button>
      </section>
    </>
  );
}

export default Settings;
