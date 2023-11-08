/*Claire*/

import Header from "../../components/Header/Header";
import SearchBar from "../../components/searchBar/SearchBar";
import sliders from "../../assets/Icons/sliders.svg";
import { useState } from "react";
import "./Recipes.css";
import { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

export default function Recipes() {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
      const response = await fetch(url);
      const data = await response.json();
      const recipesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // object to array of objects

      console.log(data);
      console.log(recipesArray);
      setRecipes(recipesArray);
    }

    getRecipes();
  }, []);

  return (
    <section className="page">
      <Header pageTitle="Recipes" />
      <p className="recipesText">
        Looking for help to complete your challenge? Here’s a collection of
        recipes to inspire you!
      </p>
      <div className="searchFilterBar">
        <SearchBar
          placeholder="Search challenges"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <div className="challengesFilter">
          <img src={sliders} alt="filtering button" />
        </div>
      </div>
      <section className="grid">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </section>
    </section>
  );
}
