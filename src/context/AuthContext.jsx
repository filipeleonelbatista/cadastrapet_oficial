import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { isStringEmpty } from "../utils/string";

import { uuidv4 } from '@firebase/util';
import dayjs from 'dayjs';
import { FaBirthdayCake, FaDog, FaMobile, FaSearchLocation } from "react-icons/fa";

import database from '../database.json';

const userObject = {
  is_admin: false,
  user_role: ["tutor"],
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
    position: {
      lat: 0,
      lng: 0,
    },
    ratio: 10,
  },
  pets: [],
  emergency_contacts: [],
  medical_appointments: {
    medical_history: [],
    vaccine_history: [],
    medication_history: [],
  },
  created_at: 0,
  updated_at: 0,
};

const petObject = {
  uid: "",
  name: "",
  avatar: "",
  tutor: [],
  adoption_date: 0,
  birth_date: 0,
  pelage: "",
  species: "",
  animal_race: "",
  sex: "",
  castration: "",
  pin_number: "",
  events: [],
  vaccines: [],
  medications: [],
  created_at: 0,
  updated_at: 0,
  currentLocation: {
    lat: 0,
    lng: 0,
  }
};

const medicalHistoryObject = {
  uid: "",
  pet_uid: "",
  attachment: [],
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
  vaccine_receipt: [],
  vaccine_application_date: "",
  vaccine_next_application_date: "",
  created_at: "",
  updated_at: "",
};

const medicationObject = {
  uid: "",
  medication: "",
  medication_application_date: "",
  medication_receipe: [],
  created_at: "",
  updated_at: "",
};

const feedbackObject = {
  uid: "",
  screenshot: "",
  comment: "",
  user: "",
  created_at: "",
};

const locationObject = {
  uid: "",
  pet_uid: "",
  status: false,
  location: {
    lat: 0,
    lng: 0,
  },
  created_at: "",
};

const conversionObject = {
  converted: false,
  created_at: "",
  email: "",
  from: "",
  ip: "",
  message: "",
  name: "",
  phone: "",
  url: "",
};

export const AuthContext = createContext({});

export function AuthContextProvider(props) {

  const { addToast } = useToast();
  const { setIsLoading } = useLoading();

  const [user, setUser] = useState();
  const [user_id, setUserId] = useState();
  const [selectedPet, setSelectedPet] = useState();
  const [medicalHistoryList, setMedicalHistoryList] = useState([]);
  const [vaccineList, setVaccineList] = useState([]);
  const [medicationList, setMedicationList] = useState([]);
  const [petList, setPetList] = useState([]);
  const [selectedMedicalHistory, setSelectedMedicalHistory] = useState();
  const [selectedVaccine, setSelectedVaccine] = useState();
  const [selectedMedication, setSelectedMedication] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [notificationList, setNotificationList] = useState([])

  const notificationIcons = {
    'dog': <FaDog size={24} color="#FFF" />,
    'birthday': <FaBirthdayCake size={24} color="#FFF" />,
    'system': <FaMobile size={24} color="#FFF" />,
    'location': <FaSearchLocation size={24} color="#FFF" />
  }

  const loadUserNotification = async () => {
    const notificationArray = []
    setIsLoading(true)
    const user_created_at = new Date(user?.created_at)
    const birth_date = new Date(user?.birth_date)
    const now = new Date(Date.now())

    if (user_created_at.getMonth() === now.getMonth() && user_created_at.getDate() === now.getDate()) {
      notificationArray.push({
        icon: 'birthday',
        uid: uuidv4(),
        title: 'Bem vindo ao CadastraPet 😸🐶',
        message: 'Adicinone seus pets e comece agora a cuidar dos seus pets! 😸🐶',
        date: Date.now()
      })
    }

    if (user.pets.length === 0) {
      notificationArray.push({
        icon: 'dog',
        uid: uuidv4(),
        title: 'Adicione seus pets 😸🐶',
        message: 'Adicinone seus pets e comece agora a cuidar dos seus pets! 😸🐶',
        date: Date.now()
      })
    }

    if (user.emergency_contacts.length === 0) {
      notificationArray.push({
        icon: 'dog',
        uid: uuidv4(),
        title: 'Adicione contatos de emergência',
        message: 'As informações de contatos de emergência ajudam a encontrar seu pet! 😸🐶 Fica em Perfil > Contatos de emergência',
        date: Date.now()
      })
    }

    if (birth_date.getMonth() === now.getMonth() && birth_date.getDate() === now.getDate()) {
      notificationArray.push({
        icon: 'birthday',
        uid: uuidv4(),
        title: 'Parabéns para você! 🎂',
        message: 'Que você tenha muita saúde, alegrias e felicidades com sua família e seus pets! 😸🐶',
        date: Date.now()
      })
    }

    if (user.birth_date === 0 || user.avatar === '') {
      notificationArray.push({
        icon: 'system',
        uid: uuidv4(),
        title: 'Complete seu perfil!',
        message: 'Complete seu Perfil para ter acesso a todos os recursos do sistema!',
        date: Date.now()
      })
    }

    if (user.endereco.cep === '' || user.endereco.logradouro === '' || user.endereco.cidade === '' || user.endereco.uf === '' || user.endereco.pais === '') {
      notificationArray.push({
        icon: 'system',
        uid: uuidv4(),
        title: 'Complete seu perfil com endereço!',
        message: 'Cadastre seu endereço para ajudar encontrar seu pet! 😸🐶 vá em Perfil para atualizar seus dados!',
        date: Date.now()
      })
    }

    for (const id of user.pets) {
      const loadedPet = await getPetByID(id);
      if (loadedPet) {
        if (loadedPet.birth_date) {
          const pet_birth_date = new Date(loadedPet?.birth_date)
          if (pet_birth_date.getMonth() === now.getMonth() && pet_birth_date.getDate() === now.getDate()) {
            notificationArray.push({
              icon: 'birthday',
              uid: uuidv4(),
              title: 'Parabéns para seu pet! 🎂',
              message: `Seu pet ${loadedPet.name} está completando ${dayjs().from(dayjs(new Date(loadedPet?.birth_date)), true)} hoje! Desejamos um excelente dia para vocês! 😸🐶`,
              date: Date.now()
            })
          }
        }
        if (loadedPet.adoption_date) {
          const pet_adoption_date = new Date(loadedPet?.adoption_date)
          if (pet_adoption_date.getMonth() === now.getMonth() && pet_adoption_date.getDate() === now.getDate()) {
            notificationArray.push({
              icon: 'birthday',
              uid: uuidv4(),
              title: 'Aniversário de adoção! 🎂',
              message: `Seu pet ${loadedPet.name} está completando ${dayjs().from(dayjs(new Date(loadedPet?.adoption_date)), true)} com você hoje! Parabéns pela adoção e desejamos um excelente dia para vocês! 😸🐶`,
              date: Date.now()
            })
          }
        }
      }
    }

    const notificationRef = collection(db, "notifications");
    const notificationResult = query(notificationRef, where("user_uid", "==", user?.uid));

    const querySnapshot = await getDocs(notificationResult);

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      const notification_date = new Date(data.date);
      const now = new Date(Date.now());
      if (notification_date > now) {
        notificationArray.push({
          ...data
        })
      }
    });

    setIsLoading(false)
    setNotificationList(notificationArray.sort((a, b) => b.date - a.date))
  }

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
        setIsLoading(true);
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

        setIsLoading(false);
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
  async function getAllmedications() {
    const medicationsRef = collection(db, "medication");
    const result = getDocs(medicationsRef)
      .then((snap) => {
        const medicationArray = [];
        snap.docs.forEach((doc) => {
          medicationArray.push(doc.data());
        });
        return medicationArray;
      })
      .catch((err) => {
        console.log(err);
        return [];
      });
    return result;
  }
  async function getAllfeedbacks() {
    const feedbackRef = collection(db, "feedback");
    const result = getDocs(feedbackRef)
      .then((snap) => {
        const feedbackArray = [];
        snap.docs.forEach((doc) => {
          feedbackArray.push(doc.data());
        });
        return feedbackArray;
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

  async function getAllLocation() {
    const locationRef = collection(db, "location");
    const result = getDocs(locationRef)
      .then((snap) => {
        const locationArray = [];
        snap.docs.forEach((doc) => {
          locationArray.push(doc.data());
        });
        return locationArray;
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
  async function updatePetByIDLocalization(id, data) {
    const petData = await getPetByID(id);

    const updatedPet = {
      ...petData,
      ...data,
    };

    try {
      setIsLoading(true)
      await setDoc(doc(db, "pets", id), updatedPet);

      sendDiscordNotification(
        `Localização do pet atualizada: 
          **Pet:** 
          Codigo pet: \`${updatedPet.uid}\`
          Nome do pet: ${updatedPet.name}
          ${updatedPet.avatar}`,
        "doguinho"
      );

      setIsLoading(false)
      return true;
    } catch (err) {
      console.log("ERRO", err)
      addToast({
        message: `Houve um erro ao atualizar dados do pet. Tente novamente mais tarde`,
        severity: "error"
      })
      return false;
    }
  }

  async function updatePetByID(id, data, user, message = false) {
    const petData = await getPetByID(id);

    const updatedPet = {
      ...petData,
      ...data,
    };
    try {
      setIsLoading(true)
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

      setIsLoading(false)
      return true;
    } catch (err) {
      console.log("ERRO", err)
      addToast({
        message: `Houve um erro ao ${message ? "adicionar" : "atualizar dados do"
          } pet. Tente novamente mais tarde`,
        severity: "error"
      })
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
      console.error(err);
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

    setIsLoading(true);
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        alert("Foi enviado um email com as instruções de recuperação.");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        alert(AuthErrorHandler[[err.code]]);
      });
  }

  async function createFeedback(data) {
    try {
      await addDoc(collection(db, "feedback"), data);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function getNewPetID() {
    setIsLoading(true)
    const petRef = collection(db, "pets");
    const newPet = await addDoc(petRef, {});
    setIsLoading(false)
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
        setIsLoading(true)
        setIsLoggedIn(true);
        setKeyLocalStorage("UID", re.user.uid);
        const currentUser = await getUserByID(re.user.uid);
        let currentPetList = [];

        for (const id of currentUser.pets) {
          const loadedPet = await getPetByID(id);
          if (loadedPet) {
            currentPetList.push(loadedPet);
          }
        }

        setUser(currentUser);
        setUserId(currentUser.uid);
        setPetList(currentPetList);

        setIsLoading(false)
        const status = {
          user: currentUser,
          status: true,
        };
        return status;
      })
      .catch((err) => {
        const status = {
          status: false,
          message: AuthErrorHandler[err.code],
          err,
        };

        console.log("Erro", status);
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
          setIsLoading(true)
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
          setIsLoading(false)
          return true;
        } catch (err) {
          addToast({
            message: "Houve um erro ao cadastrar usuário! Tente mais tarde",
            severity: "error"
          })
          sendDiscordNotification(
            `Houve um erro ao cadastrar o usuário\n\nlog do erro:\n\n${err}`,
            "doguinho"
          );
          return false;
        }
      })
      .catch((err) => {
        addToast({ message: AuthErrorHandler[err.code], severity: 'warning' });
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

  async function updateMedicationList() {
    let currentMedicationList = [];

    for (const id of selectedPet.medications) {
      const loadedMedication = await getMedicationByID(id);
      if (loadedMedication) {
        currentMedicationList.push(loadedMedication);
      }
    }

    setMedicationList(currentMedicationList);
  }

  async function getMedicationByID(id) {
    const medicationRef = doc(db, "medication", id);
    const medicationSnap = await getDoc(medicationRef);
    const medication = medicationSnap.data();
    return medication;
  }

  async function getNewMedicationID() {
    const medicationRef = collection(db, "medication");
    const newMedication = await addDoc(medicationRef, {});
    return newMedication.id;
  }

  async function updateMedicationByID(id, data, pet) {
    const medicationData = await getMedicationByID(id);

    const updatedMedication = {
      ...medicationData,
      ...data,
    };
    try {
      await setDoc(doc(db, "medication", id), updatedMedication);
      setSelectedMedication(updatedMedication);

      const updateMedicationsArray = pet.medications.includes(id)
        ? [...pet.medications]
        : [...pet.medications, id];
      if (
        !(await updatePetVaccineByID(pet.uid, {
          medications: [...updateMedicationsArray],
        }))
      )
        return false;
      updateMedicationList();
      return true;
    } catch (err) {
      sendDiscordNotification(
        `Houve um erro ao adicionar histórico de vermífugos\n\n ${JSON.stringify(
          data
        )}\n\nlog do erro:\n\n${err}`,
        "doguinho"
      );
      alert(
        `Houve um erro ao adicionar histórico de vermífugos. Tente novamente mais tarde`
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
      console.log(err)
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

  async function handleSetSelectedMedication(medication) {
    setSelectedMedication(medication);
    setKeyLocalStorage("SMUID", medication.uid);
  }

  async function updateContextData() {
    setIsLoading(true)
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

      const smuid = getKeyLocalStorage("SMUID");
      if (smuid) {
        const sm = await getMedicationByID(smuid);
        setSelectedMedication(sm);
      }
    }

    setIsLoading(false)
    return false;
  }
  async function updatePetLists() {
    await updateMedicalHistoryList();
    await updateVaccineList();
    await updateMedicationList();
  }

  useEffect(() => {
    if (user) {
      loadUserNotification();
    }
  }, [user])

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
        setIsLoading(true)
        await updateMedicalHistoryList();
        await updateVaccineList();
        await updateMedicationList();
        setIsLoading(false)
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

  async function loadDatabase(table, content) {
    console.log(content, table);
    for (const row of content) {
      await setDoc(doc(db, table, row.uid), row);
    }
  }

  async function loadDatabaseConversion(table, content) {
    for (const row of content) {
      await addDoc(collection(db, table), row);
    }
  }

  async function updateDatabase() {
    const {
      conversionNotification,
      feedback,
      medicalHistory,
      medicationHistory,
      pets,
      users,
      vaccine,
      location
    } = database;

    setIsLoading(true);

    console.log(medicalHistory.title)
    await loadDatabase(medicalHistory.title, medicalHistory.content);

    console.log(conversionNotification.title)
    await loadDatabaseConversion(
      conversionNotification.title,
      conversionNotification.content
    );

    console.log(feedback.title)
    await loadDatabase(feedback.title, feedback.content);

    console.log(medicationHistory.title)
    await loadDatabase(medicationHistory.title, medicationHistory.content);

    console.log(pets.title)
    await loadDatabase(pets.title, pets.content);

    console.log(users.title)
    await loadDatabase(users.title, users.content);

    console.log(vaccine.title)
    await loadDatabase(vaccine.title, vaccine.content);

    console.log(location.title)
    await loadDatabase(location.title, location.content);

    setIsLoading(false);

    console.log("Finito", database);
  }

  async function downloadDatabase() {
    const users = await getAllTutors();
    const usersNormalized = normalizeArray(users, userObject);
    const pets = await getAllPets();
    const petsNormalized = normalizeArray(pets, petObject);
    const vaccines = await getAllvaccines();
    const vaccinesNormalized = normalizeArray(vaccines, vaccineObject);
    const medications = await getAllmedications();
    const medicationsNormalized = normalizeArray(medications, medicationObject);
    const feedbacks = await getAllfeedbacks();
    const feedbacksNormalized = normalizeArray(feedbacks, feedbackObject);
    const medicalHistory = await getAllmedicalHistory();
    const medicalHistoryNormalized = normalizeArray(
      medicalHistory,
      medicalHistoryObject
    );
    const contacts = await getAllContacts();
    const locations = await getAllLocation();

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
      medicationHistory: {
        title: "medication",
        content: medicationsNormalized,
      },
      conversionNotification: {
        title: "conversion-notification",
        content: contacts,
      },
      feedback: {
        title: "feedback",
        content: feedbacksNormalized,
      },
      location: {
        title: "location",
        content: locations,
      },
    };

    return database;
  }

  async function deleteMedication(medication) {
    await deleteDoc(doc(db, "medication", medication.uid));
    return true;
  }

  async function deleteVaccine(vaccine) {
    await deleteDoc(doc(db, "vaccine", vaccine.uid));
    return true;
  }

  async function deleteMedicalHistory(medicalHistory) {
    await deleteDoc(doc(db, "medical-history", medicalHistory.uid));
    return true;
  }

  async function deletePet(selectedPet) {
    setIsLoading(true)
    if (selectedPet.medications.length > 0) {
      selectedPet.medications.map(async (item) => {
        await deleteMedication(item);
      });
    }

    if (selectedPet.vaccines.length > 0) {
      selectedPet.vaccines.map(async (item) => {
        await deleteVaccine(item);
      });
    }

    if (selectedPet.events.length > 0) {
      selectedPet.events.map(async (item) => {
        await deleteMedicalHistory(item);
      });
    }

    const newPetsArray = user.pets.filter((item) => item !== selectedPet.uid);

    await updateUserByID(user.uid, { pets: [...newPetsArray] });

    await deleteDoc(doc(db, "pets", selectedPet.uid));

    setIsLoading(false)
    return true;
  }

  async function verifyPets() {
    console.log("Iniciando limpeza de dogs!");
    setIsLoading(true)
    const { users } = database;
    let petsArray = [];

    for (const user of users.content) {
      if (user.pets.length > 0) {
        for (const pet of user.pets) {
          petsArray.push(pet);
        }
      }
    }

    const allPets = await getAllPets();

    const allPetsUidArray = [];

    for (const pet of allPets) {
      allPetsUidArray.push(pet.uid);
    }

    const trashPetsArray = allPetsUidArray.filter(
      (pet) => !petsArray.includes(pet)
    );

    for (const pet of trashPetsArray) {
      if (pet) {
        const selectedPetForExclusion = await getPetByID(pet);
        await deletePet(selectedPetForExclusion);
      }
    }

    setIsLoading(false)
    console.log("Concluido!");
  }

  async function verifyUser(key, value) {
    const usersRef = collection(db, "users");
    const queryResult = query(usersRef, where(key, "==", value));

    let data = {
      status: false,
      user: [],
      key,
      value,
    };

    const querySnapshot = await getDocs(queryResult);
    querySnapshot.forEach((doc) => {
      data.user.push(doc.data());
      data.status = true;
    });

    return data;
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
          medicationList,
          selectedMedication,
          notificationList,
          notificationIcons,
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
          handleSetSelectedMedication,
          setMedicationList,
          setSelectedMedication,
          setNotificationList
        },
        functions: {
          createFeedback,
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
          updatePetByIDLocalization,
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
          updateMedicationList,
          getMedicationByID,
          getNewMedicationID,
          updateMedicationByID,
          updatePetLists,
          verifyUser,
          loadUserNotification,
        },
        databaseFunctions: {
          downloadDatabase,
          updateDatabase,
          verifyPets,
        },
        deleteFunctions: {
          deleteMedication,
          deleteVaccine,
          deleteMedicalHistory,
          deletePet,
        },
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
