import { useEffect, useState } from "react";

export default function PostCardUser({ uid }) {
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
    <div className="postCardAvatar">
      <img src={user?.image} alt={user?.username} />
      <span>
        <p>{user?.username}</p>
      </span>
    </div>
  );
}
