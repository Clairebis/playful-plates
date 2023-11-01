//-----------Natalia-------------//

import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import arrow from "../../Assets/Icons/arrowback.svg";

export default function Header({ pageTitle }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // This will navigate one page back
  };

  return (
    <div className="app-header">
      <div className="header-arrow" onClick={goBack}>
        <img src={arrow} alt="" />
      </div>
      <div className="page-title">{pageTitle}</div>
    </div>
  );
}
