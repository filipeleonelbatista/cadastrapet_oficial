import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { Alert } from "react-native";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [petList, setPetList] = useState();
  const [selectedPet, setSelectedPet] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const loggedUser = await getUserByID(user.uid);

        let currentPetList = [];

        loggedUser.pets.map(async (id) => {
          const loadedPet = await getPetByID(id);
          if (loadedPet) currentPetList.push(loadedPet);
        });

        setUser(loggedUser);
        setPetList(currentPetList);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getNewPetID() {
    const petRef = collection(db, "pets");
    const newPet = await addDoc(petRef, {});
    return newPet.id;
  }

  async function getUserByID(id) {
    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    const user = userSnap.data();
    return user;
  }

  async function getPetByID(id) {
    const petsRef = doc(db, "pets", id);
    const petSnap = await getDoc(petsRef);
    const pet = petSnap.data();
    return pet;
  }

  async function updatePetByID(id, data, user, message = false) {
    const petData = await getPetByID(id);
    const updatedPet = {
      ...petData,
      ...data,
    };
    try {
      await setDoc(doc(db, "pets", id), updatedPet);
      setSelectedPet(updatedPet);

      const updateUserPetsArray = user.pets.includes(id)
        ? [...user.pets]
        : [...user.pets, id];
      if (!(await updateUserByID(user.uid, { pets: [...updateUserPetsArray] })))
        return false;

      if (message)
        sendDiscordNotification(
          `Novo Pet Adicionado pelo tutor: ${
            user.name
          } no app\n\n**Pet:** ${JSON.stringify(data)}`,
          "doguinho"
        );
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao ${
          message ? "adicionar" : "atualizar dados do"
        } pet\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao ${
          message ? "adicionar" : "atualizar dados do"
        } pet. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function updateUserByID(id, data) {
    const userData = await getUserByID(id);
    const userUpdated = {
      ...userData,
      ...data,
    };
    try {
      await setDoc(doc(db, "users", id), userUpdated);
      setUser(userUpdated);
      return true;
    } catch (err) {
      Alert.alert(
        "Erro",
        `Houve um erro ao atualizar dados do usuário. Tente novamente mais tarde`
      );
      return false;
    }
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
          return true;
        } catch (err) {
          sendDiscordNotification(
            `Houve um erro ao cadastrar o usuário\n\n ${JSON.stringify(
              data
            )}\n\nlog do erro:\n\n${err}`,
            "doguinho"
          );
          Alert.alert(
            "Erro",
            "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde"
          );
          return false;
        }
      })
      .catch((err) => {
        Alert.alert("Erro", AuthErrorHandler[err.code]);
        return false;
      });
  }

  async function updateContextData() {
    const loggedUser = await getUserByID(user.uid);

    let currentPetList = [];

    loggedUser.pets.map(async (id) => {
      const loadedPet = await getPetByID(id);
      if (loadedPet) currentPetList.push(loadedPet);
    });

    setUser(loggedUser);
    setPetList(currentPetList);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        RegisterUser,
        isLoggedIn,
        setIsLoggedIn,
        updateUserByID,
        getPetByID,
        selectedPet,
        setSelectedPet,
        getNewPetID,
        updatePetByID,
        petList,
        setPetList,
        isLoaded,
        setIsLoaded,
        updateContextData,
      }}
    >
      {isLoaded ? <Loading /> : <>{props.children}</>}
    </AuthContext.Provider>
  );
}
