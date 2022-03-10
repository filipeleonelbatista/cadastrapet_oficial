import React from "react";
import { FaBookMedical, FaBookOpen, FaTh } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CodigoPetImage from "../../assets/codigopet.png";
import QrImage from "../../assets/qr.png";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetProfile.module.css";
import { yearNow } from "../../utils/string";

function PetProfile() {
  const navigate = useNavigate();
  const { props } = useAuth();
  const { selectedPet } = props;

  // if (!selectedPet) return navigate("/tutor/petlist");

  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petlist" />
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
      <div className={styles.content}>
        <button
          onClick={() => navigate("/tutor/petinfo/view")}
          className={styles.wContainer}
        >
          <FaBookOpen size={64} />
          <h4 className={styles.title}>Dados Gerais</h4>
        </button>
        <button
          onClick={() => navigate("/tutor/pethistory")}
          className={styles.wContainer}
        >
          <FaBookMedical size={64} />
          <h4 className={styles.title}>Histórico de Consultas</h4>
        </button>
        <button
          onClick={() => navigate("/tutor/petvaccinehistory")}
          className={styles.wContainer}
        >
          <FaTh size={64} />
          <h4 className={styles.title}>Carteira de Vacinação</h4>
        </button>
        <button
          onClick={() => navigate("/tutor/petcode")}
          className={styles.wContainer}
        >
          <img src={QrImage} alt="QrCode" className={styles.qrCode} />
          <img
            src={CodigoPetImage}
            alt="CodigoPet"
            className={styles.codigoPet}
          />
        </button>
      </div>
    </div>
  );
}

export default PetProfile;
