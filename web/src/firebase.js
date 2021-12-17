// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCYOBJLPPn9rr1NBP-xfG2Dp7oT1ul10qI",
  authDomain: "cadastra-pet.firebaseapp.com",
  projectId: "cadastra-pet",
  storageBucket: "cadastra-pet.appspot.com",
  messagingSenderId: "141547492119",
  appId: "1:141547492119:web:f9bd6caad05d4973951d52",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAnalytics = getAnalytics(FirebaseApp);