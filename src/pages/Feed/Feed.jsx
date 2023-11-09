/*Claire*/

import { useEffect, useState } from "react";
import PostCard from "../../components/postCard/PostCard";
import "./feed.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import SearchBar from "../../components/searchBar/SearchBar";
import sliders from "../../Assets/Icons/sliders.svg";
import PostMultifilter from "../../components/PostMultifilter/PostMultifilter";
import { getAuth } from "firebase/auth";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [isPostMultifilterVisible, setPostMultifilterVisible] = useState(false);
  const [allPostsVisible, setAllPostsVisible] = useState(true); // Initialize as false
  const [showPosts, setShowPosts] = useState(true);

  const auth = getAuth();
  const uid = auth.currentUser?.uid;
  const [friendIds, setFriendIds] = useState([]);

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

      const userUrl = `https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}.json`;
      const userResponse = await fetch(userUrl);
      const userData = await userResponse.json();

      if (userData && userData.FriendIds) {
        const friendIdsArray = Object.values(userData.FriendIds);
        setFriendIds(friendIdsArray);
      }
    }

    getPosts();
  }, [uid]);

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

  const toggleMultiFilter = () => {
    setPostMultifilterVisible(!isPostMultifilterVisible);
    setAllPostsVisible(!allPostsVisible);
    setShowPosts(!showPosts);
    console.log("clicked");
  };

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
                const isFriendPost = friendIds.includes(post.id);
                if (isFriendPost) {
                  return <PostCard post={post} key={post.id} />;
                }
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
