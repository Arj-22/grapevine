// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzpORcPg_nvjpMa2Jc6lbRwcej5basNr0",
  authDomain: "the-grapevine-9937b.firebaseapp.com",
  projectId: "the-grapevine-9937b",
  storageBucket: "the-grapevine-9937b.appspot.com",
  messagingSenderId: "715773792985",
  appId: "1:715773792985:web:3f02016b2b6b6b6c9ea4c8",
  measurementId: "G-5KYJKFJVMT",
  databaseURL: "https://the-grapevine-9937b-default-rtdb.firebaseio.com/",
  storageBucket: 'gs://the-grapevine-9937b.appspot.com'   
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

export default app;