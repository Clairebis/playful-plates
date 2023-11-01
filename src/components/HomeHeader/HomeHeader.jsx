import logo from "../../assets/logo.png"
import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"
import notifications from "../../assets/Icons/notifications.svg"
import "../../components/HomeHeader/HomeHeader.css";
import { Link } from "react-router-dom";


export default function HomeHeader () {

    return (
        <>
            <div className="homeHeaderContainer">
                <img 
                    className="home-logo"
                    src={logo}
                    alt="logo of plates with text playful plates"
                />

                <Link className="homeXpPoints">
                    <img
                        src={chefHatIcon}
                        alt="chef hat icon"
                    />
                    <p>250 XP</p>
                </Link>

                <img 
                    className="notification-icon"
                    src={notifications}
                    alt="notifications icon"
                />

            </div>
        </>
    )
}