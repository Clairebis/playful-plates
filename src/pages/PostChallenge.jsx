/*------------Natalia ----------*/
import Header from "../components/Header/Header";
import Button from "../components/Button/Button";
import "../components/Label/PostChallenge.css";
import { useState } from "react";
import { useRef } from "react";
import placeholderImage from "../Assets/uploadPlaceholder.png";
import PostLabel from "../components/Label/PostLabel";
import arrowDown from "../Assets/Icons/arrow_down.svg";
import arrowUp from "../Assets/Icons/arrow_up.svg";

export default function PostChallenge() {
  //-------------------------------PHOTO UPLOAD-------------------------------------
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Initialize as null
  const fileInputRef = useRef(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

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
      setIsImageUploaded(true); //Set state to indicate that image was uploaded
    } else {
      setErrorMessage("Image file size must be less than 1MB");
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  async function uploadImage() {
    try {
      //url to new image - make sure to have the correct firebase project id
      const url = `https://firebasestorage.googleapis.com/v0/b/playful-plates-b4a84.appspot.com/o/${imageFile.name}`;

      // POST request to upload image
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

  //-----------------------------TITLE CHANGE--------------------------
  const [title, setTitle] = useState("");
  const [isTitleChanged, setIsTitleChanged] = useState(false);
  const maxCharacterLimit = 40;

  const handleTitleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharacterLimit) {
      setTitle(inputValue);
      setIsTitleChanged(true); // Set the state to indicate title change
    }
  };

  //------------------DESCRIPTION CHANGE-----------------
  const [description, setDescription] = useState("");
  const [isDescriptionAdded, setIsDescriptionAdded] = useState(false);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setIsDescriptionAdded(e.target.value.trim() !== ""); // Set the state based on description content
  };

  //----------------TYPE OF POST CHANGE -----------------------------
  const [selectedOption, setSelectedOption] = useState("Public (+ 5 XP)"); // Default to 'Public'
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsExpanded(false);
  };

  // Determine the alternative option based on the currently selected option
  const getAlternativeOption = () => {
    return selectedOption === "Public (+ 5 XP)"
      ? "Private (+ 0 XP)"
      : "Public (+ 5 XP)";
  };

  const alternativeOption = getAlternativeOption();

  //check if is public
  function isPostPublic() {
    console.log(document.querySelector(".chosenTypeOfPost").textContent);
    const isPublic =
      document.querySelector(".chosenTypeOfPost").textContent ==
      " Public (+ 5 XP)"
        ? true
        : false;

    return isPublic;
  }

  //-----------------------ENABLE BUTTON-------------------------
  const buttonClassName = `buttonPostAChallenge ${
    isImageUploaded && isTitleChanged && isDescriptionAdded
      ? ""
      : "disabledBtnPost"
  }`;
  //-------------------------GET CHOSEN TAGS-------------------------
  function getChosenTags() {
    const chosenTags = [];
    // Find all label elements with the "tagLabel" class and the "selected" class.
    const selectedLabelElements = document.querySelectorAll(
      ".postALabel.postALabelSelected"
    );

    // Extract the values of the selected labels and add them to the chosenTags array.
    selectedLabelElements.forEach((labelElement) => {
      chosenTags.push(labelElement.textContent);
    });

    return chosenTags;
  }

  //-----------------------------GET CURRENT DATE--------------------------------
  function formatDateToCustomSyntax() {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date().toLocaleDateString("en-US", options);

    // Split the date into parts (e.g., ["November", "3", "2023"])
    const parts = date.split(" ");

    // Convert the day part to a numeric value
    const day = parseInt(parts[1]);

    // Determine the appropriate suffix for the day
    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    // Combine the parts with the day suffix
    const formattedDate = `${day}${daySuffix} ${parts[0]} ${parts[2]}`;
    return formattedDate;
  }

  //------------------------GATHER ALL INFORMATION -------------------

  async function gatherAllData(event) {
    event.preventDefault();
    try {
      const imageUrl = await uploadImage();

      const newPost = {
        challengeCompleted: true,
        image: imageUrl,
        title: title,
        description: description,
        tags: getChosenTags(),
        uid: 1, // Change to dynamic (user-specific UID)
        publishedAt: formatDateToCustomSyntax(),
        challengeId: 1, // Change to dynamic
        public: isPostPublic(),
      };

      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        console.log("Post added");
        console.log(newPost);
        navigate("/");
      } else {
        console.log("An error occurred when posting");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  return (
    <section className="page">
      <Header pageTitle="Mystery Box" /> {/* change to fetch from challenges*/}
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
              src={placeholderImage}
              alt="Placeholder Image"
              className="photoUpload"
            />
          )}
        </div>
      </>
      {/*----------TITLE UPLOAD SECTION------------- */}
      <div className="postATitle">
        <input
          type="text"
          id="title"
          value={title}
          placeholder="Title: Name your dish here"
          onChange={handleTitleChange}
        />
        <p>
          {title.length}/{maxCharacterLimit}
        </p>
      </div>
      {/*---------Description Upload---------*/}
      <div className="postADescription">
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Share insights of how the challenge went and how the dish tasted!"
          onChange={handleDescriptionChange}
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
      {/*------------------Type of Post ----------------------- */}
      <div className={`typeOfPost ${isExpanded ? "expanded" : ""}`}>
        <div className="chosenTypeOfPost" onClick={toggleMenu}>
          {isExpanded ? <img src={arrowUp} alt="" /> : <img src={arrowDown} />}{" "}
          {selectedOption}
        </div>
        {isExpanded && (
          <div className="alternativeTypeOfPost">
            <div onClick={() => handleOptionClick(alternativeOption)}>
              <div className="horizontalDividerPost"></div>
              {alternativeOption}
            </div>
          </div>
        )}
      </div>
      <div className="containerButtonPostChallenge">
        {" "}
        <Button
          text="Post"
          className={buttonClassName}
          function={gatherAllData}
        />
      </div>
    </section>
  );
}
