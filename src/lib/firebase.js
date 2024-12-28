// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJv9TcT1coq2MKC7bFcr44dXLGzhvTU7U",
  authDomain: "realtimechat-1b8e4.firebaseapp.com",
  projectId: "realtimechat-1b8e4",
  storageBucket: "realtimechat-1b8e4.firebasestorage.app",
  messagingSenderId: "367204130501",
  appId: "1:367204130501:web:6e68515075d597ff31daac",
  measurementId: "G-RH4CH1XEXY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth=getAuth(app);
export const db=getFirestore(app);