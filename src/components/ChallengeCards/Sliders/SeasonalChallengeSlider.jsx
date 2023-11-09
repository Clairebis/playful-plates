/*------------Siiri ----------*/

import SmallChallengeCard from "../SmallChallengeCard";

export default function SeasonalChallengeSlider ({sliderTitle, challenges}) {

    let challengesToDisplay = challenges;

    return (
    <>
        <h2>{sliderTitle}</h2>
        <div className="SmallChallengeSlider">
                {challengesToDisplay.filter(c => c.categories.includes("Seasonal")).map(challenge => 
                    <SmallChallengeCard challenge={challenge} key={challenge.id} />
                )}
        </div>

      </>
    )
}