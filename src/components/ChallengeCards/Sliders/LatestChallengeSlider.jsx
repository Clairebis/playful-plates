/*------------Siiri ----------*/

import SmallChallengeCard from "../SmallChallengeCard";

export default function LatestChallengeSlider ({sliderTitle, challenges}) {

    let challengesToDisplay = challenges;

    return (
    <>
        <h2>{sliderTitle}</h2>
        <div className="SmallChallengeSlider">
                {challengesToDisplay.filter(c => c.categories.includes("Easy")).map(challenge => (
                    <SmallChallengeCard challenge={challenge} key={challenge.id} />
                ))}
        </div>

      </>
    )
}