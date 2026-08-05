import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-RW2yRIJA0Du8DR2QNebQeF_7-Kc2Pr0",
  authDomain: "anything-co.firebaseapp.com",
  projectId: "anything-co",
  storageBucket: "anything-co.firebasestorage.app",
  messagingSenderId: "292971443833",
  appId: "1:292971443833:web:673d585231d3c4d7cbc6a8",
  measurementId: "G-HD4BEEZZW9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyD-RW2yRIJA0Du8DR2QNebQeF_7-Kc2Pr0",
//   authDomain: "anything-co.firebaseapp.com",
//   projectId: "anything-co",
//   storageBucket: "anything-co.firebasestorage.app",
//   messagingSenderId: "292971443833",
//   appId: "1:292971443833:web:673d585231d3c4d7cbc6a8",
//   measurementId: "G-HD4BEEZZW9"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);