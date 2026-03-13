import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyxl6Kc5BO6xKXWyZiuF1uTz1glO3vsWA",
  authDomain: "e-clone-5f26b.firebaseapp.com",
  projectId: "e-clone-5f26b",
  storageBucket: "e-clone-5f26b.firebasestorage.app",
  messagingSenderId: "186512186019",
  appId: "1:186512186019:web:f77c3a01d5d74e5ae47d16"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);