import * as firebase from "firebase";
// firebase informacija
const firebaseConfig = {
  apiKey: "AIzaSyA1YZtMb3vyqkdAVpclIghDM6GAHaZocpM",
  authDomain: "react-blog-a39d2.firebaseapp.com",
  databaseURL: "https://react-blog-a39d2.firebaseio.com",
  projectId: "react-blog-a39d2",
  storageBucket: "react-blog-a39d2.appspot.com",
  messagingSenderId: "47960617433",
  appId: "1:47960617433:web:ab66e92b01deaaf62169c8",
};

firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;
