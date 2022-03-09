import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetHistory.module.css";
import { dateToString, yearNow } from "../../utils/string";

function PetHistory() {
  const navigate = useNavigate();
  const { props, setFunctions } = useAuth();
  const { selectedPet, medicalHistoryList } = props;
  const { setSelectedMedicalHistory } = setFunctions;
  function handleSelectMedicalHistory(history) {
    setSelectedMedicalHistory(history);
    navigate("/tutor/pethistory/view");
  }
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
      <h4 className={styles.headerTitle}>Historico Médico</h4>
      <div className={styles.content}>
        {medicalHistoryList &&
          medicalHistoryList.map((history) => (
            <div
              key={history.uid}
              onClick={() => handleSelectMedicalHistory(history)}
              className={styles.wContainer}
            >
              <div className={styles.itemRow}>
                <p className={styles.itemTitle}>{history.title}</p>
                <div className={styles.divider}></div>
                <p className={styles.itemDate}>
                  {dateToString(history.event_date)}
                </p>
              </div>
              <p className={styles.itemNotation}>{history.notes}</p>
            </div>
          ))}
        <Button transparent onClick={() => navigate("/tutor/pethistory/add")}>
          <FaPlus />
          Adicionar histórico
        </Button>
      </div>
    </div>
  );
}

export default PetHistory;
