import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBc6cKPCtAuCjLIrNLPs7L-DhBAxRk00_k",
  authDomain: "sdp-project-83355.firebaseapp.com",
  projectId: "sdp-project-83355",
  storageBucket: "sdp-project-83355.appspot.com",
  messagingSenderId: "890301397339",
  appId: "1:890301397339:web:3adbf00c0ce542726ac27e",
  measurementId: "G-9GLQCB2LKX"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);