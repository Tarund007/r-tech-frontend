// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMbu3kxjc0yede-zulO6VIENWEkkwmEsI",
  authDomain: "r-techwebsite.firebaseapp.com",
  projectId: "r-techwebsite",
  storageBucket: "r-techwebsite.firebasestorage.app",
  messagingSenderId: "639923074778",
  appId: "1:639923074778:web:0bfbcb7256a77cb03a57e3",
  measurementId: "G-SF85GB8DTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export app so it can be used elsewhere
export { app };
export default app;