import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SmallChallengeSlider from "../components/ChallengeCards/Sliders/SmallChallengeSlider";
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter";
import LatestChallengeSlider from "../components/ChallengeCards/Sliders/LatestChallengeSlider";
import SeasonalChallengeSlider from "../components/ChallengeCards/Sliders/SeasonalChallengeSlider";
import SmallChallengeCard from "../components/ChallengeCards/SmallChallengeCard";
import SearchBar from "../components/searchBar/SearchBar";
import MultiFilter from "../components/Multifilter/Multifilter";
import sliders from "../assets/Icons/sliders.svg";

export default function Challenges() {
  // State variables for search, challenges, and filter visibility

  const [searchValue, setSearchValue] = useState("");
  const [challenges, setChallenges] = useState([]);
  const [isMultiFilterVisible, setMultiFilterVisible] = useState(false);
  const [challengeSlidersVisible, setChallengeSlidersVisible] = useState(true); // Initialize as false
  const [showSmallChallengeCard, setShowSmallChallengeCard] = useState(true);

  // Effect to fetch challenges data when the component mounts

  useEffect(() => {
    async function getChallenges() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const challengesArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // from object to array
      setChallenges(challengesArray);
    }

    getChallenges();
  }, []);

  // Clone the challenges array for displaying

  let challengesToDisplay = [...challenges];

  // Filter challenges based on search value, does not work at the moment
  if (searchValue) {
    challengesToDisplay = challengesToDisplay.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchValue) ||
        challenge.subheading.toLowerCase().includes(searchValue) ||
        challenge.description.toLowerCase().includes(searchValue)
    );
  }
  // Effect to scroll to the top when the component mounts

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top when the component mounts
  }, []);

  // Function to toggle multi-filter visibility and sliders/cards visibility

  const toggleMultiFilter = () => {
    setMultiFilterVisible(!isMultiFilterVisible);
    setChallengeSlidersVisible(!challengeSlidersVisible);
    // Toggle SmallChallengeCard visibility

    setShowSmallChallengeCard(!showSmallChallengeCard);
    console.log("clicked");
  };

  const handleSearchBarClick = () => {
    setChallengeSlidersVisible(false);
  };

  return (
    <section className="page">
      <Header pageTitle="Challenges" />
      <div className="searchFilterBar">
        <SearchBar
          placeholder="Search challenges"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onClick={handleSearchBarClick}
        />
        <div className="challengesFilter" onClick={toggleMultiFilter}>
          <img src={sliders} alt="filtering button" />
        </div>
      </div>
      {/* Display the MultiFilter component if it's visible */}

      {isMultiFilterVisible && <MultiFilter challenges={challenges} />}
      {/* Display sliders based on visibility */}
      {challengeSlidersVisible && (
        <section className="allChallengeSliders">
          <LatestChallengeSlider
            sliderTitle="Latest Challenges"
            challenges={challenges}
          />
          <SmallChallengeSlider
            sliderTitle="Popular with Friends"
            challenges={challenges}
          />
          <SeasonalChallengeSlider
            sliderTitle="Seasonal Challenges"
            challenges={challenges}
          />
        </section>
      )}
    </section>
  );
}
