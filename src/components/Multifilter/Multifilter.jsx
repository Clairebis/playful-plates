/*------------Siiri ----------*/

import { useEffect, useState } from "react";
import SmallChallengeCard from "../ChallengeCards/SmallChallengeCard";
import "./Multifilter.css";

export default function MultiFilter({ challenges }) {
  // State variables to store challenges, selected filters, selected difficulty, and filtered challenges
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [filtersSelected, setFiltersSelected] = useState(false);

  // Arrays for difficulty and category filters

  let difficultyFilters = ["Easy", "Medium", "Hard"];
  let categoryFilters = [
    "Many Ingredients",
    "One Ingredient",
    "Seasonal",
    "Technique",
    "Theme",
  ];

  // Function to handle category filters
  const handleFilter = (category) => {
    if (selectedFilters.includes(category)) {
      // If the category is already selected, remove it
      const updatedFilters = selectedFilters.filter(
        (filter) => filter !== category
      );
      setSelectedFilters(updatedFilters);
    } else {
      // If the category is not selected, add it
      setSelectedFilters([...selectedFilters, category]);
    }
  };

  // Function to handle difficulty filters
  const handleDifficultyFilter = (difficulty) => {
    // If the same difficulty filter is selected again, clear it
    setSelectedDifficulty((prevDifficulty) =>
      prevDifficulty === difficulty ? "" : difficulty
    );
  };

  // Effect to trigger filtering when selected filters or difficulty change
  useEffect(() => {
    filterItems();
  }, [selectedFilters, selectedDifficulty]);

  // Function to filter challenges based on selected filters and difficulty
  const filterItems = () => {
    // Filtering challenges based on selected filters and difficulty
    const filteredItems = challenges.filter((challenge) => {
      const hasSelectedCategory =
        selectedFilters.length === 0 || // If no category filters are selected, consider all challenges
        selectedFilters.every((selectedCategory) =>
          challenge.categories.includes(selectedCategory)
        ); // Check if challenge includes all selected category filters

      // Checking if a difficulty filter is selected
      const hasSelectedDifficulty =
        selectedDifficulty === "" || // If no difficulty filter is selected, consider all challenges
        challenge.categories.includes(selectedDifficulty); // Check if challenge includes the selected difficulty

      // Returning true if challenge passes both category and difficulty filters
      return hasSelectedCategory && hasSelectedDifficulty;
    });

    // Setting the state with the filtered challenges
    setFilteredItems(filteredItems);
    // Setting the state to track if filters are selected
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

      {/* Displaying results if filters are selected */}
      {filtersSelected && (
        <>
          <h2>Results</h2>

          {/* Checking if there are filtered items */}
          {filteredItems ? (
            // Displaying challenges or a message if no matches are found
            filteredItems.length === 0 ? (
              <p>No matching challenges found.</p>
            ) : (
              <div className="SmallChallengeSlider">
                {filteredItems.map((challenge) => (
                  <SmallChallengeCard
                    challenge={challenge}
                    key={challenge.id}
                  />
                ))}
              </div>
            )
          ) : null}
        </>
      )}
    </div>
  );
}
