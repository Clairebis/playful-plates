//-----------------------Paulius-----------------------

import { NavLink, useLocation } from "react-router-dom";
import home from "../../Assets/Icons/home.svg";
import recipes from "../../Assets/Icons/recipes.svg";
import feed from "../../Assets/Icons/feed.svg";
import profile from "../../Assets/Icons/profile.svg";
import "../../components/Navigation/Nav.css";

export default function Nav() {
  const location = useLocation();
  console.log(location);

  const isHomeActive =
    location.pathname === "/" ||
    location.pathname.startsWith("/challenges") ||
    location.pathname.includes("/postchallenge") ||
    location.pathname.includes("/challengecompleted");

  const isFeedActive =
    location.pathname === "/feed" || location.pathname.includes("/post/");

  const isRecipeActive =
    location.pathname === "/recipes" || location.pathname.includes("/404");

  const isProfileActive =
    location.pathname === "/profile" ||
    location.pathname === "/settings" ||
    location.pathname === "/myfriends";

  return (
    <nav className="bottom-nav">
      <NavLink
        exact
        to="/"
        className={`nav-link ${isHomeActive ? "active" : ""}`}
      >
        <img src={home} alt="Home" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/recipes"
        className={`nav-link ${isRecipeActive ? "active" : ""}`}
      >
        <img src={recipes} alt="Recipes" />
        <span>Recipes</span>
      </NavLink>

      <NavLink
        to="/feed"
        className={`nav-link ${isFeedActive ? "active" : ""}`}
      >
        <img src={feed} alt="Feed" />
        <span>Feed</span>
      </NavLink>

      <NavLink
        to="/profile"
        className={`nav-link ${isProfileActive ? "active" : ""}`}
      >
        <img src={profile} alt="Profile" />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
