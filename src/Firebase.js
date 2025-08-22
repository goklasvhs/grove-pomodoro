// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoZpdOYKgMVKHIOJGQzvggiVrQS2z45cg",
  authDomain: "login1-6b3b4.firebaseapp.com",
  projectId: "login1-6b3b4",
  storageBucket: "login1-6b3b4.firebasestorage.app",
  messagingSenderId: "167723695500",
  appId: "1:167723695500:web:fd7043bdf7279cfbdaeaa9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export default app;