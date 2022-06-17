// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDoEsK_4eJEdOY4Mgsi_WXWQgEsWrCUnA",
  authDomain: "flyaway-project.firebaseapp.com",
  databaseURL: "https://flyaway-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flyaway-project",
  storageBucket: "flyaway-project.appspot.com",
  messagingSenderId: "771921786950",
  appId: "1:771921786950:web:82100b456d048ae8597247"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;