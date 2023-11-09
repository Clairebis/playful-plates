import ComingChallengeCard from "../ComingChallengeCard";
import { useEffect, useState } from "react";

export default function ComingChallengeSlider ({sliderTitle, challenges}) {

    let challengesToDisplay = challenges;

    return (
    <>
        <h2>{sliderTitle}</h2>
        <div>
                {challengesToDisplay.filter(c => c.categories.includes("Coming Soon")).map(challenge => (
                    <ComingChallengeCard challenge={challenge} key={challenge.id} />
                ))}
        </div>

      </>
    )
}