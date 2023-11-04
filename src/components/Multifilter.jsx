import { useEffect } from "react";
import { useState } from "react";
import SmallChallengeCard from "./ChallengeCards/SmallChallengeCard";
import "./Multifilter.css"

export default function MultiFilter () {


const [challenges, setChallenges] = useState([]);
const [selectedFilters, setSelectedFilters] = useState([])
const [filteredItems, setFilteredItems] = useState([challenges])
let filters = ["Many Ingredients", "One Ingredient", "Theme", "Technique", "Seasonal", "Easy", "Medium", "Hard"]

useEffect(() => {
    async function getChallenges() {
        const url =
            "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const challengesArray = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
        })); // from object to array
        setChallenges(challengesArray);
    }

    getChallenges();
}, []);

const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([...selectedFilters, selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = challenges.filter((challenges) => challenges.categories.includes(selectedCategory));
        console.log(`Filtered for ${selectedCategory}:`, temp); // Add this line
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...challenges]);
    }
  };

    return (
    <div>
      <div className="filter-buttons-container">
        {filters.map((categories, idx) => (
          <button
            onClick={() => handleFilterButtonClick(categories)}
            className={`filter-button ${
              selectedFilters?.includes(categories) ? "selected-filter" : ""
            }`}
            key={`filters-${idx}`}
          >
            {categories}
          </button>
        ))}

      </div>

      <div className="SmallChallengeSlider">
                {filteredItems.map(challenge => ( 
                    <SmallChallengeCard challenge={challenge} key={challenge.id} />
                ))}
        </div>
    </div>
  );

}
