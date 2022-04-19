import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { isStringEmpty } from "../utils/string";

const userObject = {
  is_admin: false,
  user_role: "tutor",
  name: "",
  avatar: "",
  cpf: "",
  email: "",
  phone: "",
  birth_date: "",
  cnpj: "",
  crmv: "",
  nome_fantasia: "",
  endereco: {
    logradouro: "",
    numero: "",
    bairro: "",
    cep: "",
    cidade: "",
    uf: "",
    pais: "",
  },
  pets: [],
  medical_appointments: {
    medical_history: [],
    vaccine_history: [],
    medication_history: [],
  },
};

const petObject = {
  uid: "",
  name: "",
  avatar: "",
  tutor: [],
  adoption_date: 0,
  birth_date: 0,
  events: [],
  vaccines: [],
  created_at: 0,
  updated_at: 0,
};

const medicalHistoryObject = {
  uid: "",
  pet_uid: "",
  attachment: "",
  title: "",
  notes: "",
  event_date: "",
  created_at: "",
  updated_at: "",
};

const vaccineObject = {
  uid: "",
  vaccine: "",
  vaccineLab: "",
  doctorId: "",
  vaccine_receipt: "",
  vaccine_application_date: "",
  vaccine_next_application_date: "",
  created_at: "",
  updated_at: "",
};

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

  function getKeyLocalStorage(key) {
    return localStorage.getItem(key) === null
      ? false
      : localStorage.getItem(key);
  }
  function setKeyLocalStorage(key, value) {
    return localStorage.setItem(key, value);
  }
  function removeKeyLocalStorage(key) {
    const hasLocalStorageData = !(localStorage.getItem(key) === null);

    if (hasLocalStorageData) {
      localStorage.removeItem(key);
    }
  }

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        setKeyLocalStorage("UID", user.uid);
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

  async function getAllPets() {
    const petsRef = collection(db, "pets");
    const result = getDocs(petsRef)
      .then((snap) => {
        const petsArray = [];
        snap.docs.forEach((doc) => {
          petsArray.push(doc.data());
        });
        return petsArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }
  async function getAllTutors() {
    const usersRef = collection(db, "users");
    const result = getDocs(usersRef)
      .then((snap) => {
        const usersArray = [];
        snap.docs.forEach((doc) => {
          usersArray.push(doc.data());
        });
        return usersArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }
  async function getAllvaccines() {
    const vaccinesRef = collection(db, "vaccine");
    const result = getDocs(vaccinesRef)
      .then((snap) => {
        const vaccineArray = [];
        snap.docs.forEach((doc) => {
          vaccineArray.push(doc.data());
        });
        return vaccineArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }
  async function getAllmedicalHistory() {
    const medicalHistoryRef = collection(db, "medical-history");
    const result = getDocs(medicalHistoryRef)
      .then((snap) => {
        const medicalHistoryArray = [];
        snap.docs.forEach((doc) => {
          medicalHistoryArray.push(doc.data());
        });
        return medicalHistoryArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }

  async function getAllContacts() {
    const medicalHistoryRef = collection(db, "conversion-notification");
    const result = getDocs(medicalHistoryRef)
      .then((snap) => {
        const medicalHistoryArray = [];
        snap.docs.forEach((doc) => {
          medicalHistoryArray.push(doc.data());
        });
        return medicalHistoryArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }

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
      removeKeyLocalStorage("SPUID");
      setKeyLocalStorage("SPUID", id);
      const updateUserPetsArray = user.pets.includes(id)
        ? [...user.pets]
        : [...user.pets, id];
      if (!(await updateUserByID(user.uid, { pets: [...updateUserPetsArray] })))
        return false;

      if (message)
        sendDiscordNotification(
          `Novo Pet Adicionado pelo tutor: ${user.name} na WEB\n**Pet:** 
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
        setIsLoggedIn(false);
        setPetList([]);
        setMedicalHistoryList([]);
        setSelectedMedicalHistory(null);
        setSelectedPet(null);
        removeKeyLocalStorage("UID");
        removeKeyLocalStorage("SPUID");
        removeKeyLocalStorage("SMHUID");
        removeKeyLocalStorage("SVUID");
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
      .then(async (re) => {
        setKeyLocalStorage("UID", re.user.uid);
        const currentUser = await getUserByID(re.user.uid);
        setIsLoggedIn(true);
        const status = {
          user: currentUser,
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

          setKeyLocalStorage("UID", re.user.uid);

          sendDiscordNotification(
            `Novo cadastro realizado pelo web app
            **ID:** ${newUser.uid}
            **Nome:** ${newUser.name}
            **Email:** ${newUser.email}
            **Telefone:** ${newUser.phone}`,
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

  async function handleSetSelectedPet(pet) {
    setSelectedPet(pet);
    setKeyLocalStorage("SPUID", pet.uid);
  }

  async function handleSetSelectedMedicalHistory(history) {
    setSelectedMedicalHistory(history);
    setKeyLocalStorage("SMHUID", history.uid);
  }

  async function handleSetSelectedVaccine(vaccine) {
    setSelectedVaccine(vaccine);
    setKeyLocalStorage("SVUID", vaccine.uid);
  }

  async function updateContextData() {
    const uid = getKeyLocalStorage("UID");
    const localUserId = uid ? uid : user_id;

    if (localUserId) {
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
      setIsLoggedIn(true);

      const spuid = getKeyLocalStorage("SPUID");
      if (spuid) {
        const sp = await getPetByID(spuid);
        setSelectedPet(sp);
      }

      const smhuid = getKeyLocalStorage("SMHUID");
      if (smhuid) {
        const smh = await getMedicalHistoryID(smhuid);
        setSelectedMedicalHistory(smh);
      }

      const svuid = getKeyLocalStorage("SVUID");
      if (svuid) {
        const sv = await getMedicalHistoryID(svuid);
        setSelectedMedicalHistory(sv);
      }
    }
    return false;
  }

  useEffect(() => {
    if (isLoggedIn) {
      const executeAsync = async () => {
        await updateContextData();
      };
      executeAsync();
    }
    // eslint-disable-next-line
  }, []);

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

  function normalizeArray(toNormalizeArray, referenceObject) {
    let normalizedArray = [];

    for (const item of toNormalizeArray) {
      const userNormalized = {
        ...referenceObject,
        ...item,
      };
      normalizedArray.push(userNormalized);
    }

    return normalizedArray;
  }

  async function downloadDatabase() {
    const users = await getAllTutors();
    const usersNormalized = normalizeArray(users, userObject);
    const pets = await getAllPets();
    const petsNormalized = normalizeArray(pets, petObject);
    const vaccines = await getAllvaccines();
    const vaccinesNormalized = normalizeArray(vaccines, vaccineObject);
    const medicalHistory = await getAllmedicalHistory();
    const medicalHistoryNormalized = normalizeArray(
      medicalHistory,
      medicalHistoryObject
    );
    const contacts = await getAllContacts();

    const database = {
      users: {
        title: "users",
        content: usersNormalized,
      },
      pets: {
        title: "pets",
        content: petsNormalized,
      },
      vaccine: {
        title: "vaccine",
        content: vaccinesNormalized,
      },
      medicalHistory: {
        title: "medical-history",
        content: medicalHistoryNormalized,
      },
      conversionNotification: {
        title: "conversion-notification",
        content: contacts,
      },
    };

    return database;
  }

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
          handleSetSelectedPet,
          handleSetSelectedMedicalHistory,
          handleSetSelectedVaccine,
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
          getAllPets,
          getAllTutors,
        },
        databaseFunctions: {
          downloadDatabase,
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
