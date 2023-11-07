// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhszpqphhKxSLvzZrvz7Fbm0nSgjTMBCA",
  authDomain: "playful-plates-b4a84.firebaseapp.com",
  projectId: "playful-plates-b4a84",
  storageBucket: "playful-plates-b4a84.appspot.com",
  messagingSenderId: "1079848232119",
  appId: "1:1079848232119:web:5c81ad17bae0f9f0cd5932",
  databaseURL: "https://playful-plates-b4a84-default-rtdb.europe-west1.firebasedatabase.app", // Add the database URL here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and get a reference to it
export const db = getDatabase(app);

export default app;
