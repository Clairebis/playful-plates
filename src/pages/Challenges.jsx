/*------------Siiri ----------*/

import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import SmallChallengeSlider from "../components/ChallengeCards/Sliders/SmallChallengeSlider";
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter"; //this is here because the css linked affects the code, did not have time to fix before handing in!
import LatestChallengeSlider from "../components/ChallengeCards/Sliders/LatestChallengeSlider";
import SeasonalChallengeSlider from "../components/ChallengeCards/Sliders/SeasonalChallengeSlider";
import SearchBar from "../components/searchBar/SearchBar";
import MultiFilter from "../components/Multifilter/Multifilter";
import sliders from "../assets/Icons/sliders.svg";

export default function Challenges() {
  const [searchValue, setSearchValue] = useState(""); // State variable to store search input
  const [challenges, setChallenges] = useState([]); //State variable to store challenges data
  const [isMultiFilterVisible, setMultiFilterVisible] = useState(false); // State variable for the visibility of the MultiFilter component
  const [challengeSlidersVisible, setChallengeSlidersVisible] = useState(true); // State variable for the visibility of challenge sliders
  const [showSmallChallengeCard, setShowSmallChallengeCard] = useState(true); // State variable for the visibility of small challenge cards

  // Effect to fetch challenges data and update state when the component mounts
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
      setChallenges(challengesArray); // Setting the state with challenges data
    }

    getChallenges();
  }, []); // Dependencies: useEffect is executed when the component mounts

  let challengesToDisplay = [...challenges];

  // Filtering challenges based on search input
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

  // Function to toggle the visibility of the MultiFilter component and challenge sliders
  const toggleMultiFilter = () => {
    setMultiFilterVisible(!isMultiFilterVisible);
    setChallengeSlidersVisible(!challengeSlidersVisible);
    setShowSmallChallengeCard(!showSmallChallengeCard);
    console.log("clicked");
  };

  // Function to handle the click event of the SearchBar
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
      {/* Conditionally rendering MultiFilter component based on visibility */}
      {isMultiFilterVisible && <MultiFilter challenges={challenges} />}
      {/* Conditionally rendering challenge sliders based on visibility */}
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
