import ChallengeItem from "./ChallengeItem"
import { useEffect, useState } from "react";

export default function ChallengeSlider ({sliderTitle}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url =
                "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/challenges.json";
            const response = await fetch(url);
            const data = await response.json();
            const postsArray = Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            })); // from object to array
            setPosts(postsArray);
        }
  
        getPosts();
    }, []);
  
    let postsToDisplay = [...posts];

    return (
    <>
        <h2>{sliderTitle}</h2>
        <div className="myChallengeSlider">
                {postsToDisplay.map(post => (
                    <ChallengeItem post={post} key={post.id} />
                ))}
        </div>
      </>
    )
}