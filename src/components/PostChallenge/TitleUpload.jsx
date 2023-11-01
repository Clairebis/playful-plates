import { useState } from "react";
import "./PostChallenge.css";

export default function TitleUpload() {
  const [title, setTitle] = useState("");
  const maxCharacterLimit = 40;

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxCharacterLimit) {
      setTitle(inputValue);
    }
  };

  return (
    <div className="postATitle">
      <input
        type="text"
        id="title"
        value={title}
        placeholder="Title: Name your dish here"
        onChange={handleChange}
      />
      <p>
        {title.length}/{maxCharacterLimit}
      </p>
    </div>
  );
}
