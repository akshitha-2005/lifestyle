
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAEl00Rg4sW0rpSoeh8S3v_BEdcHdIXqk",
  authDomain: "lifestyle-26756.firebaseapp.com",
  projectId: "lifestyle-26756",
  storageBucket: "lifestyle-26756.appspot.com",
  messagingSenderId: "876723725361",
  appId: "1:876723725361:web:32014bc3cf6ae75cdfe110",
  measurementId: "G-WB69VD65TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firebaseDB = getFirestore(app);

export default firebaseDB;
