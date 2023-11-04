import { useEffect, useState } from "react";
import SmallChallengeCard from "./ChallengeCards/SmallChallengeCard";
import "./Multifilter.css";

export default function MultiFilter() {
  const [challenges, setChallenges] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]); // Initialize with an empty array
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  let difficultyFilters = ["Easy", "Medium", "Hard"];
  let categoryFilters = [
    "Many Ingredients",
    "One Ingredient",
    "Seasonal",
    "Technique",
    "Theme",
  ];

  useEffect(() => {
    async function getChallenges() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
      const response = await fetch(url);
      const data = await response.json();
      const challengesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setChallenges(challengesArray);
    }

    getChallenges();
  }, []);

  const handleFilter = (selectedCategory, isDifficultyFilter) => {
    if (isDifficultyFilter) {
      setSelectedDifficulty((prevDifficulty) =>
        prevDifficulty === selectedCategory ? "" : selectedCategory
      );
    } else {
      if (selectedFilters.includes(selectedCategory)) {
        setSelectedFilters(selectedFilters.filter((el) => el !== selectedCategory));
      } else {
        setSelectedFilters([...selectedFilters, selectedCategory]);
      }
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters, selectedDifficulty]);

  const filterItems = () => {
    const filteredItems = challenges.filter((challenge) => {
      const hasSelectedCategory =
        selectedFilters.length === 0 ||
        selectedFilters.every((selectedCategory) =>
          challenge.categories.includes(selectedCategory)
        );

      const hasSelectedDifficulty =
        selectedDifficulty === "" || challenge.categories.includes(selectedDifficulty);

      return hasSelectedCategory && hasSelectedDifficulty;
    });
    setFilteredItems(filteredItems);
  };

  return (
    <div>
      <div className="filter-buttons-container">
      <h2>Difficulty</h2>
        <div className="difficulty-filter">
          {difficultyFilters.map((difficulty, idx) => (
            <button
              onClick={() => handleFilter(difficulty, true)}
              className={`filter-button ${
                selectedDifficulty === difficulty ? "selected-filter" : ""
              }`}
              key={`difficulty-filter-${idx}`}
            >
              {difficulty}
            </button>
          ))}
        </div>
        
        <h2>Category</h2>
        <div className="category-filter">
          {categoryFilters.map((category, idx) => (
            <button
              onClick={() => handleFilter(category, false)}
              className={`filter-button ${
                selectedFilters.includes(category) ? "selected-filter" : ""
              }`}
              key={`category-filter-${idx}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h2>Filtered challenges</h2>
      <div className="SmallChallengeSlider">
        {filteredItems.map((challenge) => (
          <SmallChallengeCard challenge={challenge} key={challenge.id} />
        ))}
      </div>
    </div>
  );
}
