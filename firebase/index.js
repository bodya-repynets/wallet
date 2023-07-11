import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBAM_YQ65FmdzUcHOKL3g6_HRkNPoEtKOc",
  authDomain: "wallet-49d2d.firebaseapp.com",
  projectId: "wallet-49d2d",
  storageBucket: "wallet-49d2d.appspot.com",
  messagingSenderId: "874327159368",
  appId: "1:874327159368:web:c7142f1dcec5d3bf3a1e7d",
};

const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
