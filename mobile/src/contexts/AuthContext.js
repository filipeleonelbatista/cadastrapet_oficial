import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState, createContext, useEffect } from "react";
import { authentication, db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";
import { AuthErrorHandler } from "../utils/handleFirebaseError";
import { Alert } from "react-native";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      console.log("Estou aqui =>", user.uid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function RegisterUser({email, password, user}) {
    return createUserWithEmailAndPassword(authentication, email, password)
      .then(async re => {
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
          return true
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
          return false
        }
      })
      .catch((err) => {
        console.log(err.code);
        Alert.alert("Erro", AuthErrorHandler[err.code]);
        return false
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        RegisterUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
