import { firebase } from "../firebase/firebase";
import "firebase/auth";

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("profile");
provider.addScope("email");

export const startLogin = () => {
  return () => {
    return firebase.auth().signInWithPopup(provider);
  };
};

export const startLogout = () => {
  return () => {
    return firebase.auth().signOut();
  };
};
