/*Claire*/
// Import necessary React components and styles
import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import "./feed.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SearchBar from "../../components/searchBar/SearchBar";
import sliders from "../../Assets/Icons/sliders.svg";
import PostMultifilter from "../../components/PostMultifilter/PostMultifilter";

// Define the main functional component for the feed page
export default function Feed() {
  // State variables for managing data and UI state
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isPostMultifilterVisible, setPostMultifilterVisible] = useState(false);
  const [allPostsVisible, setAllPostsVisible] = useState(true); // Initialize as false
  const [showPosts, setShowPosts] = useState(true);

  //fetch posts from firebase
  useEffect(() => {
    async function getPosts() {
      const url =
        "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/posts.json";
      const response = await fetch(url);
      const data = await response.json();
      // Convert the fetched data from an object to an array of objects
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

  // Create a copy of the posts array for display
  let postsToDisplay = [...posts]; // copy of the posts array

  //filter the posts based on the searchValue input by the user
  if (searchValue) {
    postsToDisplay = postsToDisplay.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue) ||
        post.description.toLowerCase().includes(searchValue)
    );
  }

  // Toggle the visibility of the post multifilter
  const toggleMultiFilter = () => {
    setPostMultifilterVisible(!isPostMultifilterVisible);
    setAllPostsVisible(!allPostsVisible);
    setShowPosts(!showPosts);
    console.log("clicked");
  };

  // Render the feed page
  return (
    <section className="page">
      <Tabs
        className="feedTabs"
        variant="fullWidth"
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
        <div className="challengesFilter" onClick={toggleMultiFilter}>
          <img src={sliders} alt="filtering button" />
        </div>
      </section>
      {isPostMultifilterVisible && <PostMultifilter posts={posts} />}

      <section className="feed">
        {postsToDisplay.length === 0 ? (
          <p>No matching posts found.</p>
        ) : (
          postsToDisplay.map((post) => {
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
          })
        )}
      </section>
    </section>
  );
}
