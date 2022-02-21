import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { isStringEmpty } from "../utils/string";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [user_id, setUserId] = useState();
  const [selectedPet, setSelectedPet] = useState();
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const loggedUser = await getUserByID(user.uid);
        setUserId(loggedUser.uid)
        setUser(loggedUser);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function getNumberOfUsers() {
    const usersRef = collection(db, "users");
    const result = getDocs(usersRef)
      .then((snap) => {
        let cont = 0
        snap.docs.forEach((doc) => {
          if (!doc.data().is_admin) {
            cont = cont + 1;
          }
        })
        return cont
      })
      .catch(err => {
        console.log(err)
        return []
      })

    return result
  }

  function logout() {
    signOut(authentication).then(() => {
      setUser(null)
      setUserId(null)
      setMedicalHistoryList([])
      setSelectedMedicalHistory(null)
      setSelectedPet(null)
      setIsLoaded(false)
      setIsLoggedIn(false)
    }).catch((error) => {
      alert(
        `Houve um erro ao tentar sair. Tente novamente mais tarde`
      );
    });

  }

  async function getPetByID(id) {
    const petsRef = doc(db, "pets", id);
    const petSnap = await getDoc(petsRef);
    const pet = petSnap.data();
    return pet;
  }

  async function getVetByID(id) {
    const vetsRef = doc(db, "veterinarian", id);
    const vetSnap = await getDoc(vetsRef);
    const vet = vetSnap.data();
    return vet;
  }

  async function getVetByEmail(email) {
    const vetsRef = collection(db, "veterinarian");
    const vetResult = query(vetsRef, where("email", "==", email));
    return vetResult.data();
  }

  async function getUserByID(id) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    const user = userSnap.data();

    return user;
  }

  function signInUser(email, password) {
    if (isStringEmpty(email)) {
      alert("O campo email não foi preenchido");
      return false;
    }
    if (isStringEmpty(password)) {
      alert("O campo senha não foi preenchido");
      return false;
    }

    signInWithEmailAndPassword(authentication, email, password)
      .then(() => {
        return true
      })
      .catch(err => {
        console.log("Erro", AuthErrorHandler[err.code]);
        return false
      })
  }

  async function RegisterUser({ email, password, user }) {
    return createUserWithEmailAndPassword(authentication, email, password)
      .then(async (re) => {
        const newUser = {
          uid: re.user.uid,
          ...user,
        };
        try {
          await setDoc(doc(db, "users", re.user.uid), newUser);
          sendDiscordNotification(
            `Novo cadastro realizado pelo app\n\n**Email:** ${email}`,
            "doguinho"
          );
          setUser(newUser);
          setUserId(newUser.uid)
          return true;
        } catch (err) {
          sendDiscordNotification(
            `Houve um erro ao cadastrar o usuário\n\nlog do erro:\n\n${err}`,
            "doguinho"
          );
          alert(
            "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde"
          );
          return false;
        }
      })
      .catch((err) => {
        alert(AuthErrorHandler[err.code]);
        return false;
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user, setUser,
        user_id, setUserId,
        selectedPet, setSelectedPet,
        medicalHistoryList, setMedicalHistoryList,
        vaccineList, setVaccineList,
        selectedMedicalHistory, setSelectedMedicalHistory,
        selectedVaccine, setSelectedVaccine,
        isLoggedIn, setIsLoggedIn,
        isLoaded, setIsLoaded,
        RegisterUser,
        getVetByEmail,
        getVetByID,
        getPetByID,
        logout,
        signInUser,
        getNumberOfUsers
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
