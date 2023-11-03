import Header from "../components/Header/Header"
import sliders from "../assets/Icons/sliders.svg"
import SmallChallengeSlider from "../components/ChallengeCards/SmallChallengeSlider"

export default function Challenges() {

    return (
        <section className="pageLeftPadding">
            <Header pageTitle="Challenges"/>
            <div className="searchFilterBar">
                <div className="searchBar"></div>
                <img className="challengesFilter" 
                    src={sliders}
                    alt="filtering button"
                />
            </div>
            <SmallChallengeSlider sliderTitle="Latest Challenges"/>
            <SmallChallengeSlider sliderTitle="Popular with Friends"/>
        </section>
    )
}