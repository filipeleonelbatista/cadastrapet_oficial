import React from "react";
import { CgPill } from "react-icons/cg";
import { MdHealing } from "react-icons/md";
import { RiSyringeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import styles from "../../styles/pages/vet/VetProfile.module.css";

function VetProfile() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <BackButton path="/veterinario/vetprofile" />
      <div className={styles.content}>
        <button
          onClick={() => navigate("/veterinario/vetmedicalhistory")}
          className={styles.wContainer}
        >
          <MdHealing size={64} />
          <h4 className={styles.title}>Histórico de consultas</h4>
        </button>
        <button
          onClick={() => navigate("/veterinario/vetvaccinehistory")}
          className={styles.wContainer}
        >
          <RiSyringeLine size={64} />
          <h4 className={styles.title}>Vacinas</h4>
        </button>
        <button
          onClick={() => navigate("/veterinario/vetmedicationhistory")}
          className={styles.wContainer}
        >
          <CgPill size={64} />
          <h4 className={styles.title}>Medicações</h4>
        </button>
      </div>
    </div>
  );
}

export default VetProfile;
