/* ------------ Siiri ------------ */

import { Link } from "react-router-dom";
import "./Button.css";

const Button = (props) => {
  return (
    <Link
      to={props.Link} // Destination link for navigation
      className={`button-green ${props.className || "button-green"}`} // Combining classes for styling, with default styling if none specified
      type={props.type} // Button type (if specified)
      onClick={props.function} // Click event handler function
    >
      {props.text || "button"}{" "}
      {/* Button text, with a default value if not provided */}
    </Link>
  );
};

export default Button;
