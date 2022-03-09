import React from "react";
import { FaCamera } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/pages/tutor/PetInfo.module.css";

function PetInfo() {
  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petprofile" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <h4 className={styles.petName}>Dados Gerais</h4>
        </div>
      </div>
      <div className={styles.content}>
        <button className={styles.uploadButton}>
          <FaCamera size={64} />
        </button>

        <div className={styles.inputForm}>
          <Input disabled id="nome" label="Nome" value="Teste" />
          <Input
            disabled
            id="dt_nascimento"
            label="Data de Nascimento"
            value="11/01/2020"
          />
          <Input
            disabled
            id="dt_adocao"
            label="Data de Adoção"
            value="11/01/2020"
          />
        </div>
      </div>

      <Button id="nome" onClick={() => {}}>
        Editar
      </Button>
    </div>
  );
}

export default PetInfo;
