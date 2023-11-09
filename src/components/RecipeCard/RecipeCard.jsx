/*Claire*/

import { useNavigate } from "react-router-dom";
import pin from "../../Assets/Icons/pin.svg";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  function open404() {
    navigate(`/404`);
  }
  return (
    <section className="recipeCardContainer" onClick={open404}>
      <article className="recipeCard">
        <div className="recipeImageContainer">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipeCardImage"
          />
        </div>
        <section className="recipeCardRight">
          <p className="recipeCardBoldTitle">{recipe.title}</p>
          <div className="pinAndChallenge">
            <img src={pin} alt="" />
            <p className="postCardDate">{recipe.challenge}</p>
          </div>
        </section>
      </article>
    </section>
  );
}
