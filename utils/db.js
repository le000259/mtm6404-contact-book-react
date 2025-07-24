// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_C_DGhMCp4otX1uluw8RHLngvNQxx5Ag",
  authDomain: "contacts-book-9cb8c.firebaseapp.com",
  projectId: "contacts-book-9cb8c",
  storageBucket: "contacts-book-9cb8c.firebasestorage.app",
  messagingSenderId: "30547259108",
  appId: "1:30547259108:web:04a3aa6344af3f4a2506f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
export default db;