import logo from "../../assets/logo.png"
import notifications from "../../assets/Icons/notifications.svg"
import "../../components/HomeHeader/HomeHeader.css";

export default function HomeHeader () {

    return (
        <>
            <div className="container">
                <img 
                    className="logo"
                    src={logo}
                    alt="logo of plates with text playful plates"
                />

                <button className="xp-points">250 XP</button>

                <img 
                    className="notification-icon"
                    src={notifications}
                    alt="notifications icon"
                />

            </div>
        </>
    )
}