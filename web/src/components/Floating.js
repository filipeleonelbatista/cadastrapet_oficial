import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useConversion } from "../hooks/useConversion";

export default function Floating({ location = "" }) {
  const { conversion } = useConversion();

  const [whatsNome, setWhatsNome] = useState("");
  const [whatsFone, setWhatsFone] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    document.getElementById("call-to-action").classList.toggle("hidden");

    const timer = setTimeout(() => {
      document.getElementById("call-to-action").classList.toggle("hidden");
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmitForm() {
    if (whatsNome === "") {
      setErrorMsg("Nome não foi digitado!");

      document.getElementById("errorMsg").classList.toggle("hidden");
      setTimeout(() => {
        document.getElementById("errorMsg").classList.toggle("hidden");
        setErrorMsg("");
      }, 3000);
      return;
    }
    if (whatsFone === "") {
      setErrorMsg("Número não foi digitado!");

      document.getElementById("errorMsg").classList.toggle("hidden");
      setTimeout(() => {
        document.getElementById("errorMsg").classList.toggle("hidden");
        setErrorMsg("");
      }, 3000);
      return;
    }

    if (whatsFone.length < 15) {
      setErrorMsg("Numero digitado incorreto!");

      document.getElementById("errorMsg").classList.toggle("hidden");
      setTimeout(() => {
        document.getElementById("errorMsg").classList.toggle("hidden");
        setErrorMsg("");
      }, 3000);
      return;
    }
    // Enviando pra base o contato
    let myIp;

    await fetch("https://api.ipify.org/?format=json")
      .then((results) => results.json())
      .then((data) => {
        myIp = data.ip;
      });

    const isConversionSaved = await conversion(
      whatsNome,
      "",
      `Modal Whatsapp Button - ${location}`,
      whatsFone,
      myIp,
      window.location.href,
      ""
    );

    if (!isConversionSaved)
      alert(
        `Houve um problema ao enviar seu contato. 
         Estaremos encaminhando voce para o nosso whatsapp`
      );

    let whatsPhone = `+5551986320477`;
    let whatsMsg = `Olá, me chamo *${whatsNome}* vi seu app e gostaria de conversar mais com você.`;
    let url = `https://api.whatsapp.com/send?phone=${whatsPhone}&text=${encodeURI(
      whatsMsg
    )}`;

    window.open(url, "_blank");

    setErrorMsg("");
    setWhatsFone("");
    setWhatsNome("");
    document.getElementById("whats-form").classList.toggle("hidden");
  }

  function setMaskPhone(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    setWhatsFone(value);
  }
  function handleShowForm() {
    document.getElementById("whats-form").classList.toggle("hidden");
  }

  return (
    <div>
      <button id="whats-btn" onClick={handleShowForm} className="whats-btn">
        <FaWhatsapp size={32} color="#FFF" />
      </button>
      <div id="call-to-action" className="call-to-action hidden">
        Chama no WhatsApp!
      </div>
      <div id="whats-form" className="whats-form hidden">
        <div className="form-header">
          Digite seu Nome/WhatsApp para entrar em contato.
        </div>
        <div className="form-body">
          <div id="errorMsg" className="error hidden">
            {errorMsg}
          </div>
          <div className="form-input-group">
            <label className="whats-form-label" htmlFor="whats-name">
              Seu Nome
            </label>
            <input
              id="whats-name"
              value={whatsNome}
              onChange={(e) => {
                setWhatsNome(e.target.value);
              }}
              className="whats-form-input"
            />
          </div>

          <div className="form-input-group">
            <label className="whats-form-label" htmlFor="whats-phone">
              Seu WhatsApp
            </label>
            <input
              id="whats-phone"
              maxLength={15}
              onChange={(e) => {
                setWhatsFone(e.target.value);
              }}
              onKeyUp={(e) => {
                setMaskPhone(e.target.value);
              }}
              value={whatsFone}
              className="whats-form-input"
            />
          </div>

          <button onClick={handleSubmitForm} className="whats-form-button">
            Chamar no WhatsApp
          </button>
        </div>
        <div className="form-footer">
          Não enviamos nada além do contato. É uma promessa!
        </div>
      </div>
    </div>
  );
}
