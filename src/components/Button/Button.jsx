import { Link } from "react-router-dom";
import "./Button.css";


const Button = (props) => {
    return (
      <Link to={props.Link}
        className={`button-green ${props.className || "button-green"}`}
      >
        {props.text || "button"}
      </Link>
    );
  };
  
  export default Button;