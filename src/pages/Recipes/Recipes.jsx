/*Claire*/

// Importing necessary components and styles
import Header from "../../components/Header/Header";
import SearchBar from "../../components/searchBar/SearchBar";
import sliders from "../../assets/Icons/sliders.svg";
import { useState } from "react";
import "./Recipes.css";
import { useEffect } from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard";

// Recipes component definition
export default function Recipes() {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  // Fetching recipes data from the database on component mount
  useEffect(() => {
    async function getRecipes() {
      // URL for fetching recipes data from Firebase Realtime Database
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";
      const response = await fetch(url);
      const data = await response.json();
      // Transforming the data from an object to an array of objects
      const recipesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // object to array of objects

      // Logging data for debugging purposes
      console.log(data);
      console.log(recipesArray);
      // Setting the recipes state with the fetched data
      setRecipes(recipesArray);
    }
    // Calling the function to fetch recipes data
    getRecipes();
  }, []); // Empty dependency array ensures that the effect runs only once on component mount

  // Rendering the Recipes component
  return (
    <section className="page">
      <div className="recipesFixed">
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
      </div>
      <section className="recipesGrid">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.id} />
        ))}
      </section>
    </section>
  );
}
