import Header from "../components/Header/Header"
import SmallChallengeSlider from "../components/ChallengeCards/SmallChallengeSlider"
import SearchAndFilter from "../components/SearchAndFilter/SearchAndFilter"

export default function Challenges() {

    return (
        <>
            <section className="page">
                <Header pageTitle="Challenges"/>
                <SearchAndFilter/>
            </section>
            <section className="pageLeftPadding">
                <SmallChallengeSlider sliderTitle="Latest Challenges"/>
                <SmallChallengeSlider sliderTitle="Popular with Friends"/>
                <SmallChallengeSlider sliderTitle="Seasonal"/>
            </section>
        </>
    )
}