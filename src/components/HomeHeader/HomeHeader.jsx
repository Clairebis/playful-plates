import logo from "../../assets/logo.png"
import notifications from "../../assets/Icons/notifications.svg"
import "../../components/HomeHeader/HomeHeader.css";

export default function HomeHeader () {

    return (
        <>
            <div className="container">
                <img 
                    src={logo}
                    alt="logo of plates with text playful plates"
                />
                <div>250 XP</div>

                <img 
                    src={notifications}
                    alt="notifications icon"
                />

            </div>
        </>
    )
}