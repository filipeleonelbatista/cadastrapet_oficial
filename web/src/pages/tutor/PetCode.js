import React from "react";
import QRCode from "react-qr-code";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetCode.module.css";
import { yearNow } from "../../utils/string";

function PetCode() {
  const { props } = useAuth();
  const { selectedPet } = props;
  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petprofile" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <div
            alt={selectedPet.name}
            style={{
              background: `url(${selectedPet.avatar}) no-repeat center center`,
              borderRadius: "50%",
              width: "6.4rem",
              height: "6.4rem",
              margin: "0 0.8rem",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <h4 className={styles.petName}>{selectedPet.name}</h4>
            <h4 className={styles.petAge}>
              {yearNow(selectedPet.birth_date) >= 1
                ? yearNow(selectedPet.birth_date) + " Anos"
                : yearNow(selectedPet.birth_date) + " Ano"}
            </h4>
          </div>
        </div>
      </div>
      <h4 className={styles.headerTitle}>Use a camera para ler o Código QR</h4>
      <div className={styles.content}>
        <div className={styles.wContainer}>
          <QRCode value={selectedPet.uid} />
        </div>
      </div>
    </div>
  );
}

export default PetCode;
