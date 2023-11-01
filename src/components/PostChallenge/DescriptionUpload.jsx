import { useState } from "react";
import "./PostChallenge.css";

export default function DescriptionUpload() {
  const [description, setDescription] = useState("");

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className="postADescription">
      <textarea
        type="text"
        id="description"
        value={description}
        placeholder="Share insights of how the challenge went and how the dish tasted!"
        onChange={handleChange}
      />
    </div>
  );
}
