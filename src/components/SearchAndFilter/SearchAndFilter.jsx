import sliders from "../../assets/Icons/sliders.svg"
import './SearchAndFilter.css'; 

import MultiFilter from "../Multifilter";

export default function SearchAndFilter() {

    return (
        <>
        <div className="searchFilterBar">
        <div className="searchBar">search</div>
            <div className="challengesFilter">                
            <img 
                    src={sliders}
                    alt="filtering button"
                />
            </div>
        </div>
            <MultiFilter/>
        
        </>
        )
}
