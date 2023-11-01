import Camera from "../../Assets/Icons/camera.svg";
import "./PostChallenge.css";

export default function PhotoUpload() {
  return (
    <div className="photoUpload">
      <img src={Camera} alt="" style={{ marginTop: 16 }} />
      <h2>Upload Photo</h2>
      <p
        style={{
          fontWeight: 700,
          textAlign: "center",
          marginTop: 0,
          width: 240,
        }}
      >
        We need to see what you did in <br></br>this challenge in order to
        complete it.
      </p>
    </div>
  );
}
