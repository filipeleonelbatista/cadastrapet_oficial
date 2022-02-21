import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import React, { createContext } from "react";
import { db } from "../firebase/firebase-config";
import { sendDiscordNotification } from "../services/discord-notify";

export const ConversionContext = createContext({});

export function ConversionContextProvider(props) {

    async function conversion(name, email, from, phone, ip, url, message) {
        try {
            const data = {
                name, email, phone, from, ip, url, created_at: Date.now(), converted: false,
            }
            
            const conversionRef = collection(db, "conversion-notification");
            const newConversion = await addDoc(conversionRef, {});

            await setDoc(doc(db, "conversion-notification",newConversion.id), data);

            sendDiscordNotification(
                `:tada: Novo cadastro realizado em ${from}\n\n**Nome:** ${name}\n**Email:** ${email}\n**Celular:** ${phone}\n**IP:** ${ip}\n**URL:** ${url}\n\n**Mensagem:** ${message}\n\n**Whatsapp:** https://wa.me/+55${phone.replace(/\D/g, "")}`,
                "doguinho"
            );
            alert(
                "Cadastro realizado com sucesso!"
            );
            return true;
            
        } catch (err) {
            sendDiscordNotification(
                `:red_circle: Houve um erro ao cadastrar o usuário\n\nlog do erro:\n\n${err}`,
                "doguinho"
            );
            alert(
                "Houve um erro ao cadastrar o usuario. Tente novamente mais tarde"
            );
            return false;
        }

    }

    return (
        <ConversionContext.Provider
            value={{
                conversion,
            }}
        >
            {props.children}
        </ConversionContext.Provider>
    );
}
