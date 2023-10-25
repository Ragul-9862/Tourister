import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyA4xaWuDbelM3TZ65M44pqEcWppbqB48IU",
  authDomain: "tourister-c4dba.firebaseapp.com",
  projectId: "tourister-c4dba",
  storageBucket: "tourister-c4dba.appspot.com",
  messagingSenderId: "19674104710",
  appId: "1:19674104710:web:3e4caa3ee54c5a62a12207"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
export{app,auth}