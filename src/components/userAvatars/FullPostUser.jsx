import { useEffect, useState } from "react";
import "./userAvatars.css";

export default function FullPostUser({ uid }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function getUser() {
      const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
      console.log(url);
      const response = await fetch(url);
      const userData = await response.json();
      console.log(userData);
      setUser(userData);
    }
    getUser();
  }, [uid]);

  return (
    <div className="fullPostUser">
      <img
        src={user?.image}
        alt={user?.username}
        className="fullPostAvatarImage"
      />
      <div className="fullPostUserText">
        <p>{user?.username}</p>
        <p className="small">{user?.level}</p>
      </div>
    </div>
  );
}
