import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD9YLCnEAIiUU4VeO8yECBogCATsKwxaVU",
  authDomain: "disneyclone-a864c.firebaseapp.com",
  projectId: "disneyclone-a864c",
  storageBucket: "disneyclone-a864c.appspot.com",
  messagingSenderId: "361176590602",
  appId: "1:361176590602:web:aac27f453646a4e4eaf2f3",
  measurementId: "G-3V6LSD719R"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;