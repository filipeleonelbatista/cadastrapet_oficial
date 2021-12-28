import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYOBJLPPn9rr1NBP-xfG2Dp7oT1ul10qI",
  authDomain: "cadastra-pet.firebaseapp.com",
  databaseURL: "https://cadastra-pet-default-rtdb.firebaseio.com",
  projectId: "cadastra-pet",
  storageBucket: "cadastra-pet.appspot.com",
  messagingSenderId: "141547492119",
  appId: "1:141547492119:web:f9bd6caad05d4973951d52",
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app)