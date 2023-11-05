import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Nav from "./components/Navigation/Nav";
import Landing from "./pages/Landing";
import Home from "./pages/Home/Home";
import Recipes from "./pages/Recipes";
import PostChallenge from "./pages/PostChallenge";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import FullPost from "./pages/FullPost";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import MyFriends from "./pages/Profile/MyFriends";
import Settings from "./pages/Profile/Settings";
import "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const location = useLocation(); // Get the current location

  // Handle user authentication
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User authenticated - signed in
        setIsAuth(true); // Set isAuth to true
        localStorage.setItem("isAuth", true); // Save isAuth to local storage
      } else {
        // User not authenticated - signed out
        setIsAuth(false); // Set isAuth to false
        localStorage.removeItem("isAuth"); // Remove isAuth from local storage
      }
    });
  }, []);

  // private routes including nav bar
  const privateRoutes = (
    <>
      <Nav location={location} /> {/* Pass location to Nav component */}
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/recipes"
          element={<PostChallenge />}
        />
        <Route
          path="/feed"
          element={<Feed />}
        />
        <Route
          path="/post/:postId"
          element={<FullPost />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/myfriends"
          element={<MyFriends />}
        />
        <Route
          path="/settings"
          element={<Settings />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  );

  // public route, no nav bar
  const publicRoutes = (
    <Routes>
      <Route
        path="/"
        element={<Landing />}
      />
      <Route
        path="/signup"
        element={<SignUp />}
      />
      <Route
        path="/login"
        element={<LogIn />}
      />
      <Route
        path="*"
        element={<Navigate to="/" />}
      />
    </Routes>
  );

  // return private routes if the user is authenticated, otherwise return public routes
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
