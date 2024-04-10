// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCktQskyC4eWKzT0JK_7LtIaddGljIGmlg",
  authDomain: "collegegroup-1092c.firebaseapp.com",
  projectId: "collegegroup-1092c",
  storageBucket: "collegegroup-1092c.appspot.com",
  messagingSenderId: "887337429694",
  appId: "1:887337429694:web:4dde525ffce4fe4df94cef",
  measurementId: "G-JE007XWG17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);