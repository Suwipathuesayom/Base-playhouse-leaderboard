import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvL3pTDjv7ItM2byJ36c934ovoTYyQx1E",
  authDomain: "base-playhouse-leader-board.firebaseapp.com",
  projectId: "base-playhouse-leader-board",
  storageBucket: "base-playhouse-leader-board.appspot.com",
  messagingSenderId: "500691372149",
  appId: "1:500691372149:web:980391e8465935b70c903c",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = firebase.firestore();
export const storage = firebase.storage();

export { firebase, db };
