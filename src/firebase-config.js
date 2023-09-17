// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB68BWsmFvBP_97WGgLqay1FBWA92kgfDQ",
  authDomain: "tapop-assignment-d23c8.firebaseapp.com",
  projectId: "tapop-assignment-d23c8",
  storageBucket: "tapop-assignment-d23c8.appspot.com",
  messagingSenderId: "1094142522005",
  appId: "1:1094142522005:web:50cccadd75c19b684b219c",
  measurementId: "G-0XFC9KBDCV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);