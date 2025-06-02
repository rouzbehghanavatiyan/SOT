import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDuH0Y4v_pZyReEmJKBklJ9j9FwW4KDusg",
  authDomain: "staroftalent.firebaseapp.com",
  projectId: "staroftalent",
  storageBucket: "staroftalent.firebasestorage.app",
  messagingSenderId: "370190897062",
  appId: "1:370190897062:web:81b8b93a5310654e5e8967",
  measurementId: "G-3P1Y356R3C",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
