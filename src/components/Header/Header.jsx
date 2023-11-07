//-----------Natalia-------------//

import { useNavigate } from "react-router-dom";
import "./Header.css";
import arrow from "../../Assets/Icons/arrowback.svg";

export default function Header(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate one page back
  };

  return (
    <div className="app-header">
      <div
        className={`header-arrow ${props.className || "header-arrow"}`}
        onClick={goBack}
      >
        <img src={arrow} alt="" />
      </div>
      <div className={`page-title ${props.titleStyleName || "page-title"}`}>
        {props.pageTitle}
      </div>
    </div>
  );
}
