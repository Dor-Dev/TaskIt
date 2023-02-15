// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBIIWHJDN0BDpvtSqiOaOOP-m52Wx-ztPs",
//   authDomain: "task2done.firebaseapp.com",
//   projectId: "task2done",
//   storageBucket: "task2done.appspot.com",
//   messagingSenderId: "501686337868",
//   appId: "1:501686337868:web:b9ec3ca9fc9e120bde0fe9",
//   measurementId: "G-GR89R9EJPJ"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBIIWHJDN0BDpvtSqiOaOOP-m52Wx-ztPs",
  authDomain: "task2done.firebaseapp.com",
  //databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: "task2done",
  storageBucket: "task2done.appspot.com",
  messagingSenderId: "501686337868",
  appId: "1:501686337868:web:b9ec3ca9fc9e120bde0fe9",
  measurementId: "G-GR89R9EJPJ",
});

export const auth = app.auth();
export default app;
