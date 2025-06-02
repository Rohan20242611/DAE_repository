// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Your web app's Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB8ayI3hG5HBRclj5_JEYV4fbjpPmSqIp8",
  authDomain: "fir-1-753ad.firebaseapp.com",
  projectId: "fir-1-753ad",
  storageBucket: "fir-1-753ad.firebasestorage.app",
  messagingSenderId: "83188385447",
  appId: "1:83188385447:web:1c160928090f72902cfd82",
  measurementId: "G-NWQNR5SP3P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the Firebase services so they can be used in other files
export { app, auth, db };