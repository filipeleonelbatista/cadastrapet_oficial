import React from "react";
import { CgPill } from "react-icons/cg";
import { FaBookMedical, FaBookOpen, FaTh } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CodigoPetImage from "../../assets/codigopet.png";
import LocalizaPetImage from "../../assets/localizapet.png";
import MarkerImage from "../../assets/marker.png";
import QrImage from "../../assets/qr.png";
import BackButton from "../../components/BackButton";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetProfile.module.css";
import { yearNow } from "../../utils/string";

function PetProfile() {
  const navigate = useNavigate();
  const { props } = useAuth();
  const { selectedPet, isLoggedIn } = props;

  if (!isLoggedIn) {
    navigate("/entrar");
    return null;
  }

  if (!selectedPet) {
    navigate("/tutor/petlist");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
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
          onClick={() => navigate("/tutor/petmedicationhistory")}
          className={styles.wContainer}
        >
          <CgPill size={64} />
          <h4 className={styles.title}>Histórico de Vermífugos</h4>
        </button>
        <button
          onClick={() => navigate("/tutor/localizapet")}
          className={styles.wContainer}
        >
          <img src={MarkerImage} alt="Marker" className={styles.qrCode} />
          <img
            src={LocalizaPetImage}
            alt="LocalizaPet"
            className={styles.codigoPet}
          />
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

      <Version />
      <Widget />
    </div>
  );
}

export default PetProfile;
