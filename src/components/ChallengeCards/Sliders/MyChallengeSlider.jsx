import MyChallengeCard from "../MyChallengeCard";
import { useEffect, useState } from "react";

export default function MyChallengeSlider({ sliderTitle, challenges, username }) {

  let challengesToDisplay = challenges;

  return (
    <>
      <h2>{sliderTitle}</h2>
      <div className="myChallengeSlider">
        {challengesToDisplay
          .filter(
            (c) =>
              c.categories.includes("Many Ingredients") ||
              c.categories.includes("One Ingredient")
          )
          .map((challenge) => (
            <MyChallengeCard challenge={challenge} key={challenge.id} />
          ))}
      </div>
    </>
  );
}
