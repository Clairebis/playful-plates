import sliders from "../../assets/Icons/sliders.svg"
import './SearchAndFilter.css'; 
import BottomSheetTest from "../BottomSheetTest";

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
        </>
        )
}
