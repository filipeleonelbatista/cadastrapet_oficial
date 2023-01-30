import React from "react";
import { RiSyringeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import doguinhoimg from "../../assets/doginho.png";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import styles from "../../styles/pages/vet/VetVaccineHistory.module.css";

function VetVaccineHistory() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <BackButton path="/veterinario/vetprofile" />
      <div className={styles.header}>
        <div className={styles.headerTitlePage}>
          <RiSyringeLine size={22} />
          <h4 className={styles.title}>Vacinas</h4>
        </div>
        <Button onClick={() => navigate("/veterinario/vaccinehistory/add")}>
          Adicionar vacina
        </Button>
      </div>
      <div className={styles.content}>
        <button onClick={() => {}} className={styles.wContainer}>
          <div
            style={{
              background: `url(${doguinhoimg}) no-repeat center center`,
              borderRadius: "50%",
              width: "6.4rem",
              height: "6.4rem",
              margin: "0 0.8rem",
              backgroundSize: "cover",
            }}
          ></div>
          <div className={styles.itemData}>
            <div className={styles.itemRow}>
              <p className={styles.itemTitle}>Doguinho</p>
              <div className={styles.divider}></div>
              <p className={styles.itemDate}> 11/01/2020</p>
            </div>
            <div
              className={styles.itemRow}
              style={{
                justifyContent: "space-between",
              }}
            >
              <div>
                <p className={styles.itemNotation}>Vacina Polivalente</p>
                <p className={styles.itemNotation}>Proxima dose: 23/04/2022</p>
              </div>
              <Button transparent>Avisar tutor para a próxima dose</Button>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default VetVaccineHistory;
