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
