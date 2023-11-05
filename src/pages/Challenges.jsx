import Header from "../components/Header/Header"
import SmallChallengeSlider from "../components/ChallengeCards/Sliders/SmallChallengeSlider"
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter"
import LatestChallengeSlider from "../components/ChallengeCards/Sliders/LatestChallengeSlider"
import SeasonalChallengeSlider from "../components/ChallengeCards/Sliders/SeasonalChallengeSlider"

export default function Challenges() {

    return (
        <>
            <section className="page">
                <Header pageTitle="Challenges"/>
                <SearchAndFilter/>
            </section>
            <section className="pageLeftPadding">
                <LatestChallengeSlider sliderTitle="Latest Challenges"/>
                <SmallChallengeSlider sliderTitle="Popular with Friends"/>
                <SeasonalChallengeSlider sliderTitle="Seasonal Challenges"/>
            </section>
        </>
    )
}