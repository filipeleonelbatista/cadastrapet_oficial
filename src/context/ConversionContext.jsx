import { addDoc, collection, doc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import React, { createContext } from "react";
import { db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";

export const ConversionContext = createContext({});

export function ConversionContextProvider(props) {
    async function getAllContacts() {
        const contactsRef = collection(db, "conversion-notification");
        const result = getDocs(query(contactsRef, orderBy("created_at", 'desc')))
            .then((snap) => {
                let contactList = []
                snap.docs.forEach((doc) => {
                    contactList.push({ ...doc.data(), id: doc.id })
                })
                return contactList
            })
            .catch(err => {
                console.log(err)
                return []
            })

        return result
    }

    async function conversion(name, email, from, phone, ip, url, message) {
        try {
            const data = {
                name, email, phone, from, ip, url, created_at: Date.now(), converted: false,
            }

            const conversionRef = collection(db, "conversion-notification");
            const newConversion = await addDoc(conversionRef, {});

            await setDoc(doc(db, "conversion-notification", newConversion.id), data);

            sendDiscordNotification(
                `:tada: Novo cadastro realizado em ${from}\n\n**Nome:** ${name}\n**Email:** ${email}\n**Celular:** ${phone}\n**IP:** ${ip}\n**URL:** ${url}\n\n**Mensagem:** ${message}\n\n**Whatsapp:** https://wa.me/+55${phone.replace(/\D/g, "")}`,
                "doguinho"
            );
            return true;

        } catch (err) {
            sendDiscordNotification(
                `:red_circle: Houve um erro ao cadastrar o usuário\n\nlog do erro:\n\n${err}`,
                "doguinho"
            );
            return false;
        }

    }

    function getNumberOfContacts() {
        const contactsRef = collection(db, "conversion-notification");
        const result = getDocs(contactsRef)
            .then((snap) => {
                let cont = 0
                snap.docs.forEach((doc) => {
                    cont = cont + 1;
                })
                return cont
            })
            .catch(err => {
                console.log(err)
                return []
            })

        return result
    }

    function getNumberOfContactsToday() {
        const dateToday = new Date();
        const dateZero = new Date(dateToday.getFullYear(), dateToday.getMonth(), dateToday.getDate(), 0, 0, 0).getTime()

        const contactsRef = collection(db, "conversion-notification")
        const result = getDocs(query(contactsRef, where("created_at", ">", dateZero)))
            .then((snap) => {
                let counter = 0;
                snap.docs.forEach(doc => {
                    counter = counter + 1
                });
                return counter
            })
            .catch(err => {
                console.log(err)
                return 0
            })
        return result
    }

    return (
        <ConversionContext.Provider
            value={{
                conversion,
                getAllContacts,
                getNumberOfContacts,
                getNumberOfContactsToday,
            }}
        >
            {props.children}
        </ConversionContext.Provider>
    );
}
