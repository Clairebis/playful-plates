import { Link } from "react-router-dom";
import "./Button.css"

const Button = (props) => {
    return (
      <Link to={props.Link}
        className={`primary-button ${props.className || "green"}`}
        onClick={props.onClick}
        type={props.type}
      >
        {props.text || "button"}
      </Link>
    );
  };
  
  export default Button;