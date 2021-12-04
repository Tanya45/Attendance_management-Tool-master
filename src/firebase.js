import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDr-V3cOLUvutO003Gt3_OkkhykMOO1yWE",
  authDomain: "campus-virtual-community.firebaseapp.com",
  projectId: "campus-virtual-community",
  storageBucket: "campus-virtual-community.appspot.com",
  messagingSenderId: "801452208520",
  appId: "1:801452208520:web:7464f67d6190fc233a4a3d",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
