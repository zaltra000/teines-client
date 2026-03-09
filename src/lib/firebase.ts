import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyBvg6OyAx8ojtmRtw8cQbGUwhYtONY8RyQ",
  authDomain: "tiens-sudan.firebaseapp.com",
  databaseURL: "https://tiens-sudan-default-rtdb.firebaseio.com",
  projectId: "tiens-sudan",
  storageBucket: "tiens-sudan.firebasestorage.app",
  messagingSenderId: "778870562236",
  appId: "1:778870562236:web:aa6553c3cb9c9b7f489fb9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
