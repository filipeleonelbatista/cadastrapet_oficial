import React from "react";
import { FaCamera } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import DogImage from "../../assets/images/pet.jpg";
import styles from "../../styles/pages/tutor/AddPetHistory.module.css";
import { useState } from "react";

function AddPetHistory() {
  const [selectedNav, setSelectedNav] = useState("anotacoes");
  return (
    <div className={styles.container}>
      <BackButton path="/tutor/pethistory" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <img src={DogImage} alt="Doguinho" className={styles.headerImage} />
          <div>
            <h4 className={styles.petName}>Doguinho</h4>
            <h4 className={styles.petAge}>2 Anos</h4>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.inputForm}>
          <Input id="consulta" placeholder="Consulta" value="Teste" />
          <Input
            id="dt_nascimento"
            placeholder="Data da consulta"
            value="11/01/2020"
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "0.8rem 0",
              gap: "0.8rem",
            }}
          >
            <Button
              transparent={!(selectedNav === "anotacoes")}
              onClick={() => setSelectedNav("anotacoes")}
            >
              Anotações
            </Button>
            <Button
              transparent={!(selectedNav === "documentos")}
              onClick={() => setSelectedNav("documentos")}
            >
              Documentos
            </Button>
          </div>
          {selectedNav === "anotacoes" && (
            <Textarea
              id="dt_nascimento"
              placeholder="Digite aqui suas anotações..."
              value="11/01/2020"
            />
          )}
          {selectedNav === "documentos" && (
            <button className={styles.uploadButton}>
              <FaCamera size={64} />
            </button>
          )}
        </div>
      </div>
      <Button onClick={() => {}}>Salvar</Button>
    </div>
  );
}

export default AddPetHistory;
