import React from "react";
import { FaBookMedical, FaBookOpen, FaTh } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CodigoPetImage from "../../assets/codigopet.png";
import DogImage from "../../assets/images/pet.jpg";
import QrImage from "../../assets/qr.png";
import BackButton from "../../components/BackButton";
import { AuthContextProvider } from "../../context/AuthContext";
import styles from "../../styles/pages/tutor/PetProfile.module.css";

function PetProfileComponent() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petlist" />
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
        <button
          onClick={() => navigate("/tutor/petinfo")}
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

function PetProfile() {
  return (
    <AuthContextProvider>
      <PetProfileComponent />
    </AuthContextProvider>
  );
}

export default PetProfile;
