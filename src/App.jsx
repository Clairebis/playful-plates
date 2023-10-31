import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import FullPost from "./pages/FullPost";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import "./firebase-config";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  // handle user authentication
  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        //user authenticted - signed in
        setIsAuth(true); //set isAuth to true
        localStorage.setItem("isAuth", true); //save isAuth to local storage
      } else {
        //user not authenticated - signed out
        setIsAuth(false); //set isAuth to false
        localStorage.removeItem("isAuth"); //remove isAuth from local storage
      }
    });
  }, []);

  //private routes including nav bar
  const privateRoutes = (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/post/:postId" element={<FullPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  //public route, no nav bar
  const publicRoutes = (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );

  //return private routes if user is authenticated, otherwise return public routes
  return <main>{isAuth ? privateRoutes : publicRoutes}</main>;
}

export default App;
