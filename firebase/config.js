import firebase from "firebase";
import "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHmaHhb1EzZ25e7ay5gyXadHXc8EaCnjM",
  authDomain: "react-native-project-dany.firebaseapp.com",
  projectId: "react-native-project-dany",
  storageBucket: "react-native-project-dany.appspot.com",
  messagingSenderId: "1084621535802",
  appId: "1:1084621535802:web:96550058b4d36c80765303",
  measurementId: "G-TWJ95PW2KS",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
firebase.firebaseConfig(firebaseConfig);

export default firebase;