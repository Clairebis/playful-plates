//-----------------------------NATALIA------------------------------

import "./Page404.css";
import Button from "../../components/Button/Button";
import img404 from "../../Assets/404img.png";
export default function Page404() {
  return (
    <div className="content404">
      <img src={img404} alt="404 placeholder image" />
      <p>
        Oops! It seems like we've cooked up a little mishap in the kitchen. 🍳🔥
      </p>
      <Button text="Home" Link="/" />
    </div>
  );
}
