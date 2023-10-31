import { /*useNavigate,*/ useParams } from "react-router-dom";
import PostCardUser from "../components/userAvatars/PostCardUser";
import { useEffect, useState } from "react";

export default function FullPost() {
  const { postId } = useParams();
  //const navigate = useNavigate();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${postId}.json`;

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
    <section className="page">
      <div>backarrow</div>

      <article>
        <img src={post.image} alt={post.title} />
        <section className="postCardLower">
          <h2>{post.title}</h2>
          <p>{post.challengeid}</p>
          <PostCardUser uid={post.uid} />
          <p>{post.description}</p>
          {/*<div className="tags">
          {post.tags.map((tag) => (
            <span key={tag.id} tag={tag}></span>
          ))}
          </div>*/}
          <div className="likes"> {post.likes} likes</div>
          <p>Published {post.publishedAt}</p>
        </section>
      </article>
    </section>
  );
}
