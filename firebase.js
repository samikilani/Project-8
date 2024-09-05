// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Corrected import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwzOHHTQuk7QYnoBHYI2ID-2UpgXeeLkg",
  authDomain: "flashcardsaas-4d2e6.firebaseapp.com",
  projectId: "flashcardsaas-4d2e6",
  storageBucket: "flashcardsaas-4d2e6.appspot.com",
  messagingSenderId: "1052348816196",
  appId: "1:1052348816196:web:ebe2e74fc5f714ae8d1511",
  measurementId: "G-04K87B0Q0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);  // Corrected function call

export { db };
