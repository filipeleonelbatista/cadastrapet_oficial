import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  addDoc,
} from "firebase/firestore";
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
  const [petList, setPetList] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  function getUserIDLocalStorage() {
    return localStorage.getItem("data") === null
      ? false
      : localStorage.getItem("data");
  }
  function setUserIDLocalStorage(data) {
    const hasLocalStorageData = !(localStorage.getItem("data") === null);

    if (!hasLocalStorageData) {
      localStorage.setItem("data", data);
    }
  }
  function removeUserIDLocalStorage() {
    const hasLocalStorageData = !(localStorage.getItem("data") === null);

    if (hasLocalStorageData) {
      localStorage.removeItem("data");
    }
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const loggedUser = await getUserByID(user.uid);
        let currentPetList = [];

        for (const id of loggedUser.pets) {
          const loadedPet = await getPetByID(id);
          if (loadedPet) {
            currentPetList.push(loadedPet);
          }
        }

        setUser(loggedUser);
        setUserId(loggedUser.uid);
        setPetList(currentPetList);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function getMedicalHistoryID(id) {
    const medicalHistoryRef = doc(db, "medical-history", id);
    const medicalHistorySnap = await getDoc(medicalHistoryRef);
    const medicalHistory = medicalHistorySnap.data();
    return medicalHistory;
  }

  async function getNewMedicalHistoryID() {
    const medicalHistoryRef = collection(db, "medical-history");
    const newMedicalHistory = await addDoc(medicalHistoryRef, {});
    return newMedicalHistory.id;
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
          `Novo Pet Adicionado pelo tutor: ${user.name} no app\n**Pet:** 
          Codigo pet: \`${data.uid}\`
          Nome do pet: ${data.name}
          ${data.avatar}       
          \`${JSON.stringify(data)}\``,
          "doguinho"
        );
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao ${
          message ? "adicionar" : "atualizar dados do"
        } pet\n\n \`${JSON.stringify(data)}\`\n\nlog do erro:\n\n\`${err}\``,
        "doguinho"
      );
      alert(
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
      setUserId(userUpdated.uid);

      return true;
    } catch (err) {
      alert(
        `Houve um erro ao atualizar dados do usuário. Tente novamente mais tarde`
      );
      return false;
    }
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
        `Houve um erro ao atualizar dados do pet \n\`json \n\`${JSON.stringify(
          data
        )}\`\nlog do erro:\n\`${err}\``,
        "doguinho"
      );
      alert(
        `Houve um erro ao atualizar dados do pet. Tente novamente mais tarde`
      );

      return false;
    }
  }

  async function updateMedicalHistoryList() {
    let currentMedicalHistoryList = [];

    for (const id of selectedPet.events) {
      const loadedMedicalHistory = await getMedicalHistoryID(id);
      if (loadedMedicalHistory) {
        currentMedicalHistoryList.push(loadedMedicalHistory);
      }
    }

    setMedicalHistoryList(currentMedicalHistoryList);
  }

  function getNumberOfUsers() {
    const usersRef = collection(db, "users");
    const result = getDocs(usersRef)
      .then((snap) => {
        let cont = 0;
        snap.docs.forEach((doc) => {
          if (!doc.data().is_admin) {
            cont = cont + 1;
          }
        });
        return cont;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });

    return result;
  }

  function logout() {
    signOut(authentication)
      .then(() => {
        setUser(null);
        setUserId(null);
        removeUserIDLocalStorage();
      })
      .catch((error) => {
        alert(`Houve um erro ao tentar sair. Tente novamente mais tarde`);
      });
  }

  function handleForgotUser(email) {
    if (isStringEmpty(email)) {
      alert("O campo email não foi preenchido");
      return true;
    }

    setIsLoaded(true);
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        alert("Foi enviado um email com as instruções de recuperação.");
        setIsLoaded(false);
      })
      .catch((err) => {
        console.log(err);
        alert(AuthErrorHandler[[err.code]]);
      });
  }

  async function getNewPetID() {
    const petRef = collection(db, "pets");
    const newPet = await addDoc(petRef, {});
    return newPet.id;
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

      if (
        !(await updatePetMedicalHistoryByID(pet.uid, {
          events: [...updatePetMedicalHistoryArray],
        }))
      )
        return false;
      updateMedicalHistoryList();
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao adicionar histórico medico\n\n ${JSON.stringify(
          data
        )}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      alert(
        `Houve um erro ao adicionar histórico medico. Tente novamente mais tarde`
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
      const status = {
        status: false,
        message: "O campo email não foi preenchido",
      };
      return status;
    }
    if (isStringEmpty(password)) {
      const status = {
        status: false,
        message: "O campo senha não foi preenchido",
      };
      return status;
    }

    return signInWithEmailAndPassword(authentication, email, password)
      .then((re) => {
        setUserIDLocalStorage(re.user.uid);

        setIsLoggedIn(true);
        const status = {
          status: true,
        };
        return status;
      })
      .catch((err) => {
        console.log("Erro", AuthErrorHandler[err.code]);

        const status = {
          status: false,
          message: AuthErrorHandler[err.code],
        };
        return status;
      });
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

          setUserIDLocalStorage(re.user.uid);

          sendDiscordNotification(
            `Novo cadastro realizado pelo app\n\n**Email:** ${email}`,
            "doguinho"
          );
          setUser(newUser);
          setUserId(newUser.uid);
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

  // ta ruim essa bagaça
  async function updateContextData() {
    const localUserId = getUserIDLocalStorage();
    const loggedUser = await getUserByID(localUserId);
    let currentPetList = [];
    for (const id of loggedUser.pets) {
      const loadedPet = await getPetByID(id);
      if (loadedPet) {
        currentPetList.push(loadedPet);
      }
    }
    setUser(loggedUser);
    setUserId(loggedUser.uid);
    setPetList(currentPetList);
  }

  async function updateVaccineList() {
    let currentVaccineList = [];

    for (const id of selectedPet.vaccines) {
      const loadedVaccine = await getVaccineByID(id);
      if (loadedVaccine) {
        currentVaccineList.push(loadedVaccine);
      }
    }

    setVaccineList(currentVaccineList);
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
        `Houve um erro ao atualizar dados do pet\n\n ${JSON.stringify(
          data
        )}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      alert(
        `Houve um erro ao atualizar dados do pet. Tente novamente mais tarde`
      );
      return false;
    }
  }

  async function getVaccineByID(id) {
    const vaccineRef = doc(db, "vaccine", id);
    const vaccineSnap = await getDoc(vaccineRef);
    const vaccine = vaccineSnap.data();
    return vaccine;
  }

  async function getNewVaccineID() {
    const vaccineRef = collection(db, "vaccine");
    const newVaccine = await addDoc(vaccineRef, {});
    return newVaccine.id;
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
      if (
        !(await updatePetVaccineByID(pet.uid, {
          vaccines: [...updateVaccineArray],
        }))
      )
        return false;
      updateVaccineList();
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao adicionar histórico de vacina\n\n ${JSON.stringify(
          data
        )}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      alert(
        `Houve um erro ao adicionar histórico de vacina. Tente novamente mais tarde`
      );
      return false;
    }
  }

  useEffect(() => {
    if (selectedPet) {
      const executeAsync = async () => {
        await updateMedicalHistoryList();
        await updateVaccineList();
      };
      executeAsync();
    }
    // eslint-disable-next-line
  }, [selectedPet]);

  return (
    <AuthContext.Provider
      value={{
        props: {
          user,
          user_id,
          selectedPet,
          medicalHistoryList,
          vaccineList,
          petList,
          selectedMedicalHistory,
          selectedVaccine,
          isLoggedIn,
          isLoaded,
        },
        setFunctions: {
          setUser,
          setUserId,
          setSelectedPet,
          setMedicalHistoryList,
          setVaccineList,
          setPetList,
          setSelectedMedicalHistory,
          setSelectedVaccine,
          setIsLoggedIn,
          setIsLoaded,
        },
        functions: {
          RegisterUser,
          logout,
          handleForgotUser,
          signInUser,
          getUserByID,
          getNewPetID,
          getPetByID,
          getVetByID,
          getVetByEmail,
          getNumberOfUsers,
          updateContextData,
          getMedicalHistoryID,
          getNewMedicalHistoryID,
          updatePetByID,
          updateUserByID,
          updatePetMedicalHistoryByID,
          updateMedicalHistoryList,
          updateMedicalHistoryByID,
          getNewVaccineID,
          updateVaccineByID,
          getVaccineByID,
          updatePetVaccineByID,
          updateVaccineList,
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
