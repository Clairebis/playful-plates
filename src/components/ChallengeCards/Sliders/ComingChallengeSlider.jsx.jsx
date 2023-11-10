//-----------Siiri-------------//

import ComingChallengeCard from "../ComingChallengeCard";

export default function ComingChallengeSlider({ sliderTitle, challenges }) {
  // Copying the challenges array to challengesToDisplay
  let challengesToDisplay = challenges;

  return (
    <>
      <h2>{sliderTitle}</h2>
      <div>
        {/* Mapping over challengesToDisplay and rendering ComingChallengeCard components for challenges with "Coming Soon" category */}
        {challengesToDisplay
          .filter((c) => c.categories.includes("Coming Soon"))
          .map((challenge) => (
            <ComingChallengeCard challenge={challenge} key={challenge.id} />
          ))}
      </div>
    </>
  );
}
