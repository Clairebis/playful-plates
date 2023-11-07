import { useEffect, useState } from "react";
import SmallChallengeCard from "../ChallengeCards/SmallChallengeCard";
import "./Multifilter.css";

export default function MultiFilter({challenges}) {
  // State variables to store challenges, selected filters, selected difficulty, and filtered challenges
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState(false);

  let difficultyFilters = ["Easy", "Medium", "Hard"];
  let categoryFilters = [
    "Many Ingredients",
    "One Ingredient",
    "Seasonal",
    "Technique",
    "Theme",
  ];


  const handleFilter = (category) => {
    if (selectedFilters.includes(category)) {
      const updatedFilters = selectedFilters.filter((filter) => filter !== category);
      setSelectedFilters(updatedFilters);
    } else {
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  const handleDifficultyFilter = (difficulty) => {
    // If the same difficulty filter is selected again, clear it
    setSelectedDifficulty((prevDifficulty) =>
      prevDifficulty === difficulty ? "" : difficulty
    );
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
    setFiltersSelected(selectedFilters.length > 0 || selectedDifficulty !== "");
  };
  

  return (
    <div>
      <div className="filter-buttons-container">
        <div className="difficulty-filter">
          <h2>Difficulty</h2>
          {difficultyFilters.map((difficulty, idx) => (
            <button
              onClick={() => handleDifficultyFilter(difficulty)}
              className={`filter-button ${
                selectedDifficulty === difficulty ? "selected-filter" : ""
              }`}
              key={`difficulty-filter-${idx}`}
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="category-filter">
          <h2>Category</h2>
          {categoryFilters.map((category, idx) => (
            <button
              onClick={() => handleFilter(category)}
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

      {filtersSelected && (
        <>
          <h2>Results</h2>
          <div className="SmallChallengeSlider">
            {filteredItems.map((challenge) => (
              <SmallChallengeCard challenge={challenge} key={challenge.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
