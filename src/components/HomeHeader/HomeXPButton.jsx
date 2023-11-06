import chefHatIcon from "../../assets/Icons/chefHatIcon.svg"
import { Link } from "react-router-dom";

export default function HomeXpPoints () {

    return (

    <Link className="homeXpPoints" to="/*">
        <img
            src={chefHatIcon}
            alt="chef hat icon"
        />
        <p>250 XP</p>
    </Link>
    )
}