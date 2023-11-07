import "../components/Label/PostChallenge.css";
import { useState, useEffect } from "react";
import placeholderImage from "../Assets/uploadPlaceholder.png";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router";
import "./UpdatePost.css";
import PostLabel from "../components/Label/PostLabel";
import { useRef } from "react";
import "../components/Label/PostChallenge.css";
import arrow from "../Assets/Icons/arrowback.svg";

export default function UpdatePost() {
  //fetch information about currently logged in user - uid
  const auth = getAuth();
  const user = auth.currentUser;
  const params = useParams();
  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts/${params.postId}.json`;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null); // Initialize as null
  const [image, setImage] = useState(null);

  let [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    tags: [],
    uid: user.uid, // Make sure to set the correct user ID here
  });

  const [errorMessage, setErrorMessage] = useState("");

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };

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
    if (file.size < 10000000) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
      setErrorMessage(""); // Reset errorMessage state
      // setIsImageUploaded(true); //Set state to indicate that image was uploaded
    } else {
      setErrorMessage("Image file size must be less than 1MB");
    }
  };

  // const handleImageChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file && file.size < 10000000) {
  //     // setImageFile(file);
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       //todo: upload image to firebase
  //       //todo: get image url
  //       //todo: call setPost e.g. setPost({...post, image: imageUrl})

  //       // imageFile = event.target.result;
  //       setImageFile(event.target.result);

  //       uploadImage().then((imageUrl) => {
  //         setPost({ ...post, image: imageUrl });
  //       });
  //     };
  //     reader.readAsDataURL(file);
  //     setErrorMessage(""); // Reset errorMessage state
  //   } else {
  //     setErrorMessage("Image file size must be less than 1MB");
  //   }
  // };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  async function uploadImage() {
    try {
      //url to new image - make sure to have the correct firebase project id
      const url = `https://firebasestorage.googleapis.com/v0/b/playful-plates-b4a84.appspot.com/o/${imageFile.name}`;

      // PUT request to replace image
      const response = await fetch(url, {
        method: "POST",
        body: imageFile,
        headers: { "Content-Type": imageFile.type },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image upload successful:", data);
        const imageUrl = `${url}?alt=media`;
        return imageUrl;
      } else {
        console.error(
          "Image upload failed. Server response:",
          response.status,
          response.statusText
        );
        console.log(url);
        return null; // Return null or handle the error as needed
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
      return null; // Return null or handle the error as needed
    }
  }
  //-------------------------GET CHOSEN TAGS-------------------------
  // function getChosenTags() {
  //   const chosenTags = [];
  //   // Find all label elements with the "tagLabel" class and the "selected" class.
  //   const selectedLabelElements = document.querySelectorAll(
  //     ".postALabel.postALabelSelected"
  //   );

  //   // Extract the values of the selected labels and add them to the chosenTags array.
  //   selectedLabelElements.forEach((labelElement) => {
  //     chosenTags.push(labelElement.textContent);
  //   });

  //   return chosenTags;
  // }

  const updatePost = async (event) => {
    event.preventDefault();

    // Check if the authenticated user's UID matches the post's UID
    if (user.uid !== post.uid) {
      console.log("You are not authorised to update this post.");
      return;
    }

    // Upload the image first
    if (imageFile) {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        post = { ...post, image: imageUrl }; // Update the post with the new image URL
      } else {
        console.log("Image upload failed, post not updated.");
        return;
      }
    }

    console.log("Sending PUT request to update post...");
    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(post),
    });
    console.log("PUT request completed with status:", response.status);

    if (response.ok) {
      console.log("Post updated");
      navigate("/feed");
    } else {
      console.log("An error occurred when updating the post");
    }
  };

  return (
    <section>
      <div className="updateHeader">
        <div onClick={goBack} className="updateBack">
          <img src={arrow} alt="back arrow" />
        </div>
        <h2>Edit post </h2>
      </div>

      {/* -------Photo upload section ----*/}

      <>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="imageInput"
          style={{ display: "none" }}
          ref={fileInputRef}
        />
        <p className="textError">{errorMessage}</p>
        <div
          className="photoUpload"
          style={{ cursor: "pointer" }}
          onClick={handleImageClick}
        >
          {image ? (
            <img src={image} alt="Image preview" className="photoUpload" />
          ) : (
            <img
              src={post.image || placeholderImage}
              alt="Choose an image"
              className="photoUpload"
            />
          )}
        </div>
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
            onChange={(e) => setPost({ ...post, description: e.target.value })}
          />
        </div>

        {/*--------------Tags Choice ---------------*/}
        <>
          <div className="chooseALabelRow">
            Preparation:
            <PostLabel label="Quick" />
            <PostLabel label="Complex" />
          </div>

          <div className="chooseALabelRow">
            Diet:
            <PostLabel label="Meat" />
            <PostLabel label="Fish" />
            <PostLabel label="Vegetarian" />
            <PostLabel label="Vegan" />
            <PostLabel label="Gluten-free" />
            <PostLabel label="Lactose-free" />
          </div>
          <div className="chooseALabelRow">
            Type:
            <PostLabel label="Breakfast" />
            <PostLabel label="Lunch" />
            <PostLabel label="Main" />
            <PostLabel label="Dessert" />
            <PostLabel label="Snack" />
            <PostLabel label="Soup" />
          </div>
        </>

        {/* Error Message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Button to Update Post */}
        <div className="containerButtonPostChallenge">
          <input
            type="button"
            value="Update Post"
            className="button-green updatePostButton"
            onClick={updatePost}
          ></input>
        </div>
      </section>
    </section>
  );
}
