// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQRy2iL7AQtT_Gc5licHC54TtHrpFJqxw",
  authDomain: "ems-project-87574.firebaseapp.com",
  projectId: "ems-project-87574",
  storageBucket: "ems-project-87574.firebasestorage.app",
  messagingSenderId: "891100039746",
  appId: "1:891100039746:web:537ae061ecfe2c92fbfbdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };