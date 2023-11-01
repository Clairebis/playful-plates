import ChallengeItem from "./ChallengeItem"
import { useEffect, useState } from "react";

export default function ChallengeSlider ({sliderTitle}) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url =
                "https://test-95fb8-default-rtdb.firebaseio.com/challenges.json";
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
    <section>
        <h2>{sliderTitle}</h2>
        <div className="myCallengeSlider">
                {postsToDisplay.map(post => (
                    <ChallengeItem post={post} key={post.id} />
                ))}
        </div>
      </section>
    )
}