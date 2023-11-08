/*Claire*/

import pin from "../../Assets/Icons/pin.svg";
import "./RecipeCard.css";

export default function RecipeCard({ recipe }) {
  return (
    <section className="recipeCardContainer">
      <article className="recipeCard">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipeCardImage"
        />
        <section className="recipeCardRight">
          <p className="postCardBoldTitle">{recipe.title}</p>
          <div className="pinAndChallenge">
            <img src={pin} alt="" />
            <p className="postCardDate">{recipe.challenge}</p>
          </div>
        </section>
      </article>
    </section>
  );
}
