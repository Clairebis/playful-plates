import { useEffect, useState } from "react";
import PostCard from "../components/postCard/PostCard";
import "./feed.css";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState(1);

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

      <section className="feed">
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </section>
    </section>
  );
}
