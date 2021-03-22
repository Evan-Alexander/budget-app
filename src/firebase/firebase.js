import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCI51vAKtQwcsHFGKvMHaVbJLOCX_TAyWQ",
  authDomain: "budget-app-6a0a1.firebaseapp.com",
  projectId: "budget-app-6a0a1",
  storageBucket: "budget-app-6a0a1.appspot.com",
  messagingSenderId: "163559121158",
  appId: "1:163559121158:web:c1d66bd46f793af1afbe87",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export { firebase, database as default };
