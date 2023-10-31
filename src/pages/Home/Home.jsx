import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import "../../pages/Home/Home.css"


export default function Home() {
  const auth = getAuth();
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;
  const [username, setUsername] = useState("");

  const url = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;

  useEffect(() => {
    async function getUser() {
      const response = await fetch(url);
      const userData = await response.json();

      if (userData) {
        //if userData exists, set states with values from userData (firebase)
        setUsername(userData.username);
      }
    }
    getUser();
  }, [auth.currentUser, url]); // dependencies: useEffect is executed when auth.currentUser changes

  // const handleLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       // Sign-out successful.
  //       navigate("/");
  //       console.log("Signed out successfully");
  //     })
  //     .catch((error) => {
  //       // An error happened.
  //       console.error("Error signing out", error);
  //       console.log("Error signing out");
  //     });

  const [posts, setPosts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  useEffect(() => {
      async function getPosts() {
          const url =
              "https://fb-rest-race-default-rtdb.firebaseio.com/posts.json";
          const response = await fetch(url);
          const data = await response.json();
          const postsArray = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
          })); // from object to array
          setPosts(postsArray);
      }

      getPosts();
  }, []);

  let postsToDisplay = [...posts];

  if (searchValue) {
      postsToDisplay = postsToDisplay.filter(post =>
          post.caption.toLowerCase().includes(searchValue)
      );
  }
  postsToDisplay.sort((post1, post2) => {
      console.log(sortBy);
      if (sortBy === "caption") {
          return post1[sortBy].localeCompare(post2[sortBy]);
      } else if (sortBy === "createdAt") {
          return post2[sortBy] - post1[sortBy];
      }
  });

  return (
    <div>
      <HomeHeader/>
      <h1>Hello {username}</h1>
      <section className="grid">
                {postsToDisplay.map(post => (
                    <PostItem post={post} key={post.id} />
                ))}
            </section>
      {/* <div>
        <button onClick={handleLogout}>Logout</button>
      </div> */}
    </div>
  );
}
