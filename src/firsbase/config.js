import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvZgUIyP88NfDo0YJ4NydxobFWOgdA-Rc",
  authDomain: "book-list-with-firebase-a2e87.firebaseapp.com",
  projectId: "book-list-with-firebase-a2e87",
  storageBucket: "book-list-with-firebase-a2e87.appspot.com",
  messagingSenderId: "535835895773",
  appId: "1:535835895773:web:d9470f87419be713a2f834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);