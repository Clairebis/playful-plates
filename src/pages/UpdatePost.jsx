import Button from "../components/Button/Button";
import "../components/Label/PostChallenge.css";
import { useState, useEffect } from "react";
import placeholderImage from "../Assets/uploadPlaceholder.png";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router";

export default function UpdatePost() {
  //fetch information about currently logged in user - uid
  const auth = getAuth();
  const user = auth.currentUser;
  const params = useParams();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.postId}.json`;
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    // uid: user.uid, // Make sure to set the correct user ID here
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    //fetch existing post data based on the postId
    async function getPost() {
      const response = await fetch(url);
      const postData = await response.json();
      setPost(postData);
    }
    getPost();
  }, [url]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size < 10000000) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPost({ ...post, image: event.target.result });
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // Reset errorMessage state
    } else {
      setErrorMessage("Image file size must be less than 1MB");
    }
  };

  const updatePost = async (event) => {
    event.preventDefault();

    // Check if the authenticated user's UID matches the post's UID
    if (user.uid !== post.uid) {
      console.log("You are not authorised to update this post.");
      return;
    }
    console.log("Sending PUT request to update post...");
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    console.log("PUT request completed with status:", response.status);

    if (response.ok) {
      console.log("Post updated");
      navigate("/");
    } else {
      console.log("An error occurred when updating the post");
    }
  };

  return (
    <section>
      <h2 className="updateHeading">Edit post </h2>
      {/* -------Photo upload section ----*/}

      <form onSubmit={updatePost}>
        <>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="imageInput"
            style={{ display: "none" }}
          />

          {post.image ? (
            <img src={post.image} alt="Image preview" className="photoUpload" />
          ) : (
            <img
              src={placeholderImage}
              alt="Choose an image"
              className="photoUpload"
            />
          )}
        </>
        {/*----------TITLE UPLOAD SECTION------------- */}

        <section className="page">
          <div className="postATitle">
            <input
              type="text"
              id="title"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </div>
          {/*---------Description Upload---------*/}
          <div className="postADescription">
            <textarea
              type="text"
              id="description"
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
            />
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Button to Update Post */}
          <div className="containerButtonPostChallenge">
            <Button text="Update Post" Link="/feed" />
          </div>
        </section>
      </form>
    </section>
  );
}
