// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpPPBfDQxL87WfIuZNWfb4U2P-OLnvB9Q",
  authDomain: "linkedin-clone-516d5.firebaseapp.com",
  projectId: "linkedin-clone-516d5",
  storageBucket: "linkedin-clone-516d5.appspot.com",
  messagingSenderId: "368523219379",
  appId: "1:368523219379:web:9c5763a357412cb4cafbc6",
  measurementId: "G-LB833Y2XEQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
