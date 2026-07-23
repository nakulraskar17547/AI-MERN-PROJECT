// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "genwebai-93226.firebaseapp.com",
  projectId: "genwebai-93226",
  storageBucket: "genwebai-93226.firebasestorage.app",
  messagingSenderId: "110670584220",
  appId: "1:110670584220:web:8fc65a4ac1c6df9763d059"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };