import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FullPostUser from "../components/userAvatars/FullPostUser";
import Heart from "react-heart";
import "./fullpost.css";

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

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
    }
    getPost();
  }, [url]);

  return (
    <section>
      <div
        onClick={goBack}
        className="padding8">
        Go Back
      </div>

      <article style={{ marginBottom: "10rem" }}>
        <img
          src={post.image}
          alt={post.title}
          className="fullPostImage"
        />
        <section className="postCardLower">
          <h2 className="bottom8">{post.title}</h2>
          <p className="small ">{post.challengeid}</p>
          <FullPostUser uid={post.uid} />
          <p>{post.description}</p>
          <div className="likes">
            <div style={{ width: "2rem" }}>
              <Heart
                isActive={active}
                onClick={() => setActive(!active)}
              />
            </div>
            <div> {post.likes} likes </div>
          </div>
          <p>Published {post.publishedAt}</p>
        </section>
      </article>
    </section>
  );
}
