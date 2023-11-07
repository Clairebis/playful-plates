import Header from "../components/Header/Header"
import SmallChallengeSlider from "../components/ChallengeCards/Sliders/SmallChallengeSlider"
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter"
import LatestChallengeSlider from "../components/ChallengeCards/Sliders/LatestChallengeSlider"
import SeasonalChallengeSlider from "../components/ChallengeCards/Sliders/SeasonalChallengeSlider"
import { useEffect, useState } from "react"
import SmallChallengeCard from "../components/ChallengeCards/SmallChallengeCard"
import SearchBar from "../components/searchBar/SearchBar"
import MultiFilter from "../components/Multifilter/Multifilter"
import sliders from "../../assets/Icons/sliders"

export default function Challenges() {

    const [searchValue, setSearchValue] = useState("");
    const [challenges, setChallenges] = useState([]);
    const [isMultiFilterVisible, setMultiFilterVisible] = useState(false);


    useEffect (() => {
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
  
    let challengesToDisplay = [...challenges];

    if (searchValue) {
        challengesToDisplay = challengesToDisplay.filter(
          (challenge) =>
            challenge.title.toLowerCase().includes(searchValue) ||
            challenge.subheading.toLowerCase().includes(searchValue) ||
            challenge.description.toLowerCase().includes(searchValue) 
        );
      }

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top when the component mounts
      }, []);

      const toggleMultiFilter = () => {
        setMultiFilterVisible(!isMultiFilterVisible);
    };

      return (
          <section className="page">
            <Header pageTitle="Challenges" />
            <div className="searchAndFilter">
            <SearchBar
                placeholder="Search challenges"
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
            <div className="challengesFilter" onClick={toggleMultiFilter}>                
            <img 
                    src={sliders}
                    alt="filtering button"
                />
            </div>
            </div>
            {challengesToDisplay.length === 0 ? (
              <p>No matching posts found.</p>
            ) : (
              challengesToDisplay.map(challenge => (
                <SmallChallengeCard challenge={challenge} key={challenge.id} />
              ))
            )}
            {/* Other components can be rendered here if needed */}
            {/* <LatestChallengeSlider sliderTitle="Latest Challenges"/>
            <SmallChallengeSlider sliderTitle="Popular with Friends"/>
            <SeasonalChallengeSlider sliderTitle="Seasonal Challenges"/> */}
                    {isMultiFilterVisible && <MultiFilter />} {/* Render MultiFilter only if isMultiFilterVisible is true */}

          </section>
          
      )
        }