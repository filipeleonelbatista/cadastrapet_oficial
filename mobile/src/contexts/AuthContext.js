import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { authentication, db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { isStringEmpty } from "../utils/string";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [user_id, setUserId] = useState();
  const [petList, setPetList] = useState([]);
  const [selectedPet, setSelectedPet] = useState();
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

  }, [isLoaded])

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setIsLoaded(true);
        const loggedUser = await getUserByID(user.uid);

        let currentPetList = [];

        for (const id of loggedUser.pets) {
          const loadedPet = await getPetByID(id);
          if (loadedPet) {
            currentPetList.push(loadedPet)
          }
        }
        setUserId(loggedUser.uid)
        setUser(loggedUser);
        setPetList(currentPetList);

        setIsLoaded(false);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const updateMedicalHistory = async () => await updateMedicalHistoryList()
  //   updateMedicalHistory()
  //   const updateVaccine = async () => await updateVaccineList()
  //   updateVaccine()
  // }, [selectedPet])

  function handleForgotUser(email) {
    if (isStringEmpty(email)) {
      Alert.alert("Campo vazio", "O campo email não foi preenchido");
      return true;
    }

    setIsLoaded(true);
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        Alert.alert("Recuperação de senha", "Foi enviado um email com as instruções de recuperação.");
        setIsLoaded(false);
      })
      .catch((err) => {
        console.log(err)
        Alert.alert(
          "Email não encontrado",
          AuthErrorHandler[[err.code]]
        );

        setIsLoaded(false);
      });
  }

  function logout() {
    setIsLoaded(true);

    signOut(authentication).then(() => {
      setUser(null)
      setUserId(null)
      setPetList([])
      setMedicalHistoryList([])
      setSelectedMedicalHistory(null)
      setSelectedPet(null)
      setIsLoggedIn(false)

      setIsLoaded(false)
    }).catch((error) => {
      Alert.alert(
        "Erro",
        `Houve um erro ao tentar sair. Tente novamente mais tarde`
      );

      setIsLoaded(false)
    });

  }

  async function RegisterUser({ email, password, user }) {
    setIsLoaded(true)
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

          setIsLoaded(false)
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
          setIsLoaded(false)
          return false;
        }
      })
      .catch((err) => {
        Alert.alert("Erro", AuthErrorHandler[err.code]);
        return false;
      });
  }

  function signInUser(email, password) {
    if (isStringEmpty(email)) {
      Alert.alert("Campo vazio", "O campo email não foi preenchido");
      return false;
    }
    if (isStringEmpty(password)) {
      Alert.alert("Campo vazio", "O campo senha não foi preenchido");
      return false;
    }
    setIsLoaded(true);
    signInWithEmailAndPassword(authentication, email, password)
      .then(() => {
        setIsLoaded(false);
        return true
      })
      .catch(err => {
        console.log(err)
        Alert.alert("Erro", AuthErrorHandler[err.code]);
        setIsLoaded(false);
        return false
      })
  }

  async function updateContextData() {
    const loggedUser = await getUserByID(user_id);

    let currentPetList = [];

    for (const id of loggedUser.pets) {
      const loadedPet = await getPetByID(id);
      if (loadedPet) {
        currentPetList.push(loadedPet)
      }
    }

    setUser(loggedUser);
    setUserId(loggedUser.uid)
    setPetList(currentPetList);
  }




  async function getNewVaccineID() {
    const vaccineRef = collection(db, "vaccine");
    const newVaccine = await addDoc(vaccineRef, {});
    return newVaccine.id;
  }

  async function updateVaccineList() {
    let currentVaccineList = []

    selectedPet.vaccines.map(async (id) => {
      const loadedVaccine = await getVaccineByID(id);
      if (loadedVaccine) currentVaccineList.push(loadedVaccine);
    })

    setVaccineList(currentVaccineList)
  }

  async function getVaccineByID(id) {
    const vaccineRef = doc(db, "vaccine", id);
    const vaccineSnap = await getDoc(vaccineRef);
    const vaccine = vaccineSnap.data();
    return vaccine;
  }

  async function updatePetVaccineByID(id, data) {
    const petData = await getPetByID(id);
    const updatedPet = {
      ...petData,
      ...data,
    };
    try {
      await setDoc(doc(db, "pets", id), updatedPet);
      setSelectedPet(updatedPet);
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao atualizar dados do pet\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao atualizar dados do pet. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function updateVaccineByID(id, data, pet) {
    const vaccineData = await getVaccineByID(id);
    const updatedVaccine = {
      ...vaccineData,
      ...data,
    };
    try {
      await setDoc(doc(db, "vaccine", id), updatedVaccine);
      setSelectedVaccine(updatedVaccine);

      const updateVaccineArray = pet.vaccines.includes(id)
        ? [...pet.vaccines]
        : [...pet.vaccines, id];
      if (!(await updatePetVaccineByID(pet.uid, { vaccines: [...updateVaccineArray] })))
        return false;
      updateVaccineList()
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao adicionar histórico de vacina\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao adicionar histórico de vacina. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function updateMedicalHistoryList() {
    let currentMedicalHistoryList = []

    selectedPet.events.map(async (id) => {
      const loadedMedicalHistory = await getMedicalHistoryID(id);
      if (loadedMedicalHistory) currentMedicalHistoryList.push(loadedMedicalHistory);
    })

    setMedicalHistoryList(currentMedicalHistoryList)
  }

  async function getNewMedicalHistoryID() {
    const medicalHistoryRef = collection(db, "medical-history");
    const newMedicalHistory = await addDoc(medicalHistoryRef, {});
    return newMedicalHistory.id;
  }

  async function getMedicalHistoryID(id) {
    const medicalHistoryRef = doc(db, "medical-history", id);
    const medicalHistorySnap = await getDoc(medicalHistoryRef);
    const medicalHistory = medicalHistorySnap.data();
    return medicalHistory;
  }

  async function updatePetMedicalHistoryByID(id, data) {
    const petData = await getPetByID(id);
    const updatedPet = {
      ...petData,
      ...data,
    };
    try {
      await setDoc(doc(db, "pets", id), updatedPet);
      setSelectedPet(updatedPet);
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao atualizar dados do pet\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao atualizar dados do pet. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function updateMedicalHistoryByID(id, data, pet) {
    const medicalHistoryData = await getMedicalHistoryID(id);
    const updatedMedicalHistory = {
      ...medicalHistoryData,
      ...data,
    };
    try {
      await setDoc(doc(db, "medical-history", id), updatedMedicalHistory);
      setSelectedMedicalHistory(updatedMedicalHistory);

      const updatePetMedicalHistoryArray = pet.events.includes(id)
        ? [...pet.events]
        : [...pet.events, id];
      if (!(await updatePetMedicalHistoryByID(pet.uid, { events: [...updatePetMedicalHistoryArray] })))
        return false;
      updateMedicalHistoryList()
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao adicionar histórico medico\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao adicionar histórico medico. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function getNewPetID() {
    const petRef = collection(db, "pets");
    const newPet = await addDoc(petRef, {});
    return newPet.id;
  }

  async function getUserByID(id) {
    setIsLoaded(true)

    const usersRef = doc(db, "users", id);
    const userSnap = await getDoc(usersRef);
    const user = userSnap.data();

    setIsLoaded(false)
    return user;
  }

  async function getPetByID(id) {
    setIsLoaded(true)
    const petsRef = doc(db, "pets", id);
    const petSnap = await getDoc(petsRef);
    const pet = petSnap.data();
    setIsLoaded(false)
    return pet;
  }

  async function updatePetByID(id, data, user, message = false) {
    const petData = await getPetByID(id);
    setIsLoaded(true)
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
      setIsLoaded(false)
      if (!(await updateUserByID(user.uid, { pets: [...updateUserPetsArray] })))
        return false;

      if (message)
        sendDiscordNotification(
          `Novo Pet Adicionado pelo tutor: ${user.name
          } no app\n\n**Pet:** ${JSON.stringify(data)}`,
          "doguinho"
        );
      setIsLoaded(false)
      return true;
    } catch (err) {
      setIsLoaded(false)
      sendDiscordNotification(
        `Houve um erro ao ${message ? "adicionar" : "atualizar dados do"
        } pet\n\n ${JSON.stringify(data)}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      Alert.alert(
        "Erro",
        `Houve um erro ao ${message ? "adicionar" : "atualizar dados do"
        } pet. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function updateUserByID(id, data) {
    const userData = await getUserByID(id);
    
    setIsLoaded(true)
    const userUpdated = {
      ...userData,
      ...data,
    };
    try {
      await setDoc(doc(db, "users", id), userUpdated);
      setUser(userUpdated);
      setUserId(userUpdated.uid)
      
      setIsLoaded(false)
      return true;
    } catch (err) {
      Alert.alert(
        "Erro",
        `Houve um erro ao atualizar dados do usuário. Tente novamente mais tarde`
      );
      setIsLoaded(false)
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        user_id,
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
        logout,
        getNewMedicalHistoryID,
        updateMedicalHistoryByID,
        selectedMedicalHistory,
        updateMedicalHistoryList,
        medicalHistoryList,
        setSelectedMedicalHistory,
        updateVaccineByID,
        updatePetVaccineByID,
        getVaccineByID,
        updateVaccineList,
        getNewVaccineID,
        selectedVaccine,
        setSelectedVaccine,
        vaccineList,
        setVaccineList,
        handleForgotUser,
        signInUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
