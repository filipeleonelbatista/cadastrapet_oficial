import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import { db } from "../firebase/firebase-config";
import { useAuth } from "../hooks/useAuth";
import { sendDiscordNotification } from "../services/discord-notify";

export const PetContext = createContext({});

export function PetContextProvider(props) {
  const [selectedPet, setSelectedPet] = useState();
  const {updateUserByID} = useAuth();

  async function getNewPetID() {
    const petRef = collection(db, "pets");
    const newPet = await addDoc(petRef, {});
    return newPet.id;
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

      const updateUserPetsArray = user.pets.includes(id) ? [...user.pets] : [...user.pets, id ]
      if(!await updateUserByID(user.uid, {pets:[...updateUserPetsArray]})) return false

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

  async function getPetByID(id) {
    const petsRef = doc(db, "pets", id);
    const petSnap = await getDoc(petsRef);
    const pet = petSnap.data();
    return pet;
  }

  return (
    <PetContext.Provider
      value={{
        getPetByID,
        selectedPet,
        setSelectedPet,
        getNewPetID,
        updatePetByID,
      }}
    >
      {props.children}
    </PetContext.Provider>
  );
}
