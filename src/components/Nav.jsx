import { NavLink } from "react-router-dom";
import home from "../assets/icons/home.svg";
import recipes from "../assets/icons/recipes.svg";
import feed from "../assets/icons/feed.svg";
import profile from "../assets/icons/profile.svg";

export default function Nav() {
  return (
    <nav className="bottom-nav">
      <NavLink
        exact
        to="/"
        className="nav-link">
        <img
          src={home}
          alt="Home"
        />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/recipes"
        className="nav-link">
        <img
          src={recipes}
          alt="Recipes"
        />
        <span>Recipes</span>
      </NavLink>
      <NavLink
        to="/feed"
        className="nav-link">
        <img
          src={feed}
          alt="Feed"
        />
        <span>Feed</span>
      </NavLink>
      <NavLink
        to="/profile"
        className="nav-link">
        <img
          src={profile}
          alt="Profile"
        />
        <span>Profile</span>
      </NavLink>
    </nav>
  );
}
