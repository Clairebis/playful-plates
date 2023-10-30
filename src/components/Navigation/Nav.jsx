import { NavLink } from "react-router-dom";
import home from "../../Assets/Icons/home.svg";
import recipes from "../../Assets/Icons/recipes.svg";
import feed from "../../Assets/Icons/feed.svg";
import profile from "../../Assets/Icons/profile.svg";
import "../../components/Navigation/Nav.css";

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
