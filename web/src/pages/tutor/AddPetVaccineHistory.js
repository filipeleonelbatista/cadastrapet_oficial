import React from "react";
import { FaCamera } from "react-icons/fa";
import DogImage from "../../assets/images/pet.jpg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/pages/tutor/AddPetVaccineHistory.module.css";

function AddPetVaccineHistory() {
  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petvaccinehistory" />
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
        <button className={styles.uploadButton}>
          <FaCamera size={64} />
        </button>
        <div className={styles.inputForm}>
          <Input id="vacina" label="Vacina" value="Teste" />
          <Input
            id="dt_nascimento"
            label="Data da aplicação"
            value="11/01/2020"
          />
        </div>
      </div>
      <Button onClick={() => {}}>Salvar</Button>
    </div>
  );
}

export default AddPetVaccineHistory;
