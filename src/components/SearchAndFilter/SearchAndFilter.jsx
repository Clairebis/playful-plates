import sliders from "../../assets/Icons/sliders.svg"
import './SearchAndFilter.css'; 

import MultiFilter from "../Multifilter";
import { useState } from "react";

export default function SearchAndFilter() {

    const [isMultiFilterVisible, setMultiFilterVisible] = useState(false);
    const toggleMultiFilter = () => {
        setMultiFilterVisible(!isMultiFilterVisible);
    };

    return (
        <>
        <div className="searchFilterBar">
        <div className="searchBar">search</div>
            <div className="challengesFilter" onClick={toggleMultiFilter}>                
            <img 
                    src={sliders}
                    alt="filtering button"
                />
            </div>
        </div>
        {isMultiFilterVisible && <MultiFilter />} {/* Render MultiFilter only if isMultiFilterVisible is true */}
        
        </>
        )
}