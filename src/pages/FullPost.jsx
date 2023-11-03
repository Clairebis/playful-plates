import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import FullPostUser from "../components/userAvatars/FullPostUser";
import Heart from "react-heart";
import "./fullpost.css";
import arrow from "../Assets/Icons/arrowback.svg";

export default function FullPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;
  const [active, setActive] = useState(false);

  const [post, setPost] = useState({
    image: "",
    title: "",
    challengeid: "",
    uid: "",
    description: "",
    tags: [],
    likes: "",
    publishedAt: "",
  });

  function backToFeed() {
    navigate("/feed");
  }

  useEffect(() => {
    //fetch post data based on postId
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
    }
    getPost();
  }, [url]);

  return (
    <section>
      <div onClick={backToFeed} className="fullPostBack">
        <img src={arrow} alt="back arrow" />
      </div>

      <article style={{ marginBottom: "10rem" }}>
        <img src={post.image} alt={post.title} className="fullPostImage" />
        <section className="fullPostLower">
          <h2 className="bottom8">{post.title}</h2>
          <p className="small ">{post.challengeid}</p>
          <FullPostUser uid={post.uid} />
          <p className="fullPostDescription">{post.description}</p>
          {/*<div className="tags">
          {post.tags.map((tag) => (
            <span key={tag.id} tag={tag}></span>
          ))}
          </div>*/}
          <div className="fullPostLikes">
            <div className="fullPostHeart">
              <Heart isActive={active} onClick={() => setActive(!active)} />
            </div>
            <div> {post.likes} likes </div>
          </div>
          <p>Published {post.publishedAt}</p>
        </section>
      </article>
    </section>
  );
}
