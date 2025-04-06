// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrHSgoorAK3ImBKvCqBVZCtmPl0PKXUKs",
  authDomain: "shop-edd03.firebaseapp.com",
  projectId: "shop-edd03",
  storageBucket: "shop-edd03.appspot.com",
  messagingSenderId: "1062801328814",
  appId: "1:1062801328814:web:ca6c11c8158691d691bb3f",
  measurementId: "G-616BNF9MG2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};