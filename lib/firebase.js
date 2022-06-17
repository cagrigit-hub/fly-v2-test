// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "xxxxxxxxxxx",
  authDomain: "xxxxxxxxx",
  databaseURL: "xxxx",
  projectId: "xxxx",
  storageBucket: "xxxxxxxxx",
  messagingSenderId: "xxxxxxxx",
  appId: "xxxxxxxxxx"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
