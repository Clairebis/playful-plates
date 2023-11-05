import { useEffect, useState } from "react";
import PostCard from "../components/postCard/PostCard";
import "./feed.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SearchBar from "../components/searchBar/SearchBar";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  //fetch posts from firebase
  useEffect(() => {
    async function getPosts() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
      const response = await fetch(url);
      const data = await response.json();
      const postsArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      })); // object to array of objects

      console.log(data);
      console.log(postsArray);
      setPosts(postsArray);
    }

    getPosts();
  }, []);

  let postsToDisplay = [...posts]; // copy of the posts array

  //filter the posts based on the searchValue input by the user
  //does the searchValue match any of the post properties?
  if (searchValue) {
    postsToDisplay = postsToDisplay.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue) ||
        post.description.toLowerCase().includes(searchValue)
    );
  }

  return (
    <section className="page">
      <Tabs
        className="feedTabs"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <Tab label="My friends" className="feedTab" />
        <Tab label="All" className="feedTab" />
      </Tabs>

      <section className="feedSearch">
        <SearchBar
          placeholder="Search posts"
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </section>

      <section className="feed">
        {postsToDisplay.map((post) => {
          // Check if the "public" attribute is true before displaying the post
          if (post.public === true) {
            // Check the selected tab (value) and filter posts accordingly
            if (value === 0 /*&& post.isFriendPost*/) {
              // Show all friends public posts based on our logic (e.g., using the isFriendPost property)
              return <PostCard post={post} key={post.id} />;
            } else if (value === 1) {
              // Display all public posts for "All" tab
              return <PostCard post={post} key={post.id} />;
              // Show all public posts
            }
          }
          return null; // Don't render if public or if it doesn't match the selected tab's criteria
        })}
      </section>
    </section>
  );
}
