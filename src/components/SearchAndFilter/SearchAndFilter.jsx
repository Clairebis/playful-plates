import sliders from "../../assets/Icons/sliders.svg"
import './SearchAndFilter.css'; 
import MultiFilter from "../Multifilter/Multifilter";
import { useEffect, useState } from "react";
import SearchBar from "../searchBar/SearchBar";

export default function SearchAndFilter() {

    const [isMultiFilterVisible, setMultiFilterVisible] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [challenges, setChallenges] = useState([]);

    const toggleMultiFilter = () => {
        setMultiFilterVisible(!isMultiFilterVisible);
    };

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
    //filter the challenges based on the searchValue input by the user
  //does the searchValue match any of the post properties?
  if (searchValue) {
    challengesToDisplay = challengesToDisplay.filter(
      (challenge) =>
        challenge.title.toLowerCase().includes(searchValue) ||
        challenge.description.toLowerCase().includes(searchValue)
    );
  }


    return (
        <>
        <section className="searchFilterBar">
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
        </section>
        {isMultiFilterVisible && <MultiFilter />} {/* Render MultiFilter only if isMultiFilterVisible is true */}
        
        </>
        )
}
