import logo from "../../assets/logo.png"
import chefHatIcon from "../../assets/chefHatIcon.svg"
import notifications from "../../assets/Icons/notifications.svg"
import "../../components/HomeHeader/HomeHeader.css";

export default function HomeHeader () {

    return (
        <>
            <div className="homeHeaderContainer">
                <img 
                    className="home-logo"
                    src={logo}
                    alt="logo of plates with text playful plates"
                />

                <button className="homeXpPoints">
                    <img
                        src={chefHatIcon}
                        alt="chef hat icon"
                    />
                    <p>250 XP</p>
                </button>

                <img 
                    className="notification-icon"
                    src={notifications}
                    alt="notifications icon"
                />

            </div>
        </>
    )
}