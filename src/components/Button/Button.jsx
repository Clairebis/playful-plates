import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
    return (
      <Link to={props.Link}
        className={`primary ${props.className || "primary"}`}
        type={props.type}
      >
        {props.text || "button"}
      </Link>
    );
  };
  
  export default Button;