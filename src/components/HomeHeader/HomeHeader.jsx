import logo from "../../assets/logo.png"
import notifications from "../../assets/Icons/notifications.svg"
import "../../components/HomeHeader/HomeHeader.css";
import HomeXpPoints from "./HomeXPButton";


export default function HomeHeader () {

    return (
        <>
            
            <div className="homeHeaderContainer page">
                <img 
                    className="home-logo"
                    src={logo}
                    alt="logo of plates with text playful plates"
                />

            <HomeXpPoints/>

                <img 
                    className="notification-icon"
                    src={notifications}
                    alt="notifications icon"
                    Link to="/recipes"
                />

            </div>
        </>
    )
}