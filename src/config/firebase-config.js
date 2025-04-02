import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDHEZCFhbbbuBcOxFpDJn8ZWIJr3KlpM3s",
  authDomain: "expense-tracker-cc619.firebaseapp.com",
  projectId: "expense-tracker-cc619",
  storageBucket: "expense-tracker-cc619.firebasestorage.app",
  messagingSenderId: "376172934669",
  appId: "1:376172934669:web:aa7ae56d43ef66a27b4744",
  measurementId: "G-SYR5K19HNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const db = getFirestore(app);