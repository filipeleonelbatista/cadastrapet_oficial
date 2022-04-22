import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetHistory.module.css";
import noDataImg from "../../assets/images/no_data.svg";
import { dateToString, yearNow } from "../../utils/string";
import Version from "../../components/Version";

function PetHistory() {
  const navigate = useNavigate();
  const { props, setFunctions, functions } = useAuth();
  const { selectedPet, medicalHistoryList, isLoggedIn } = props;
  const { handleSetSelectedMedicalHistory } = setFunctions;
  const { updateContextData } = functions;

  useEffect(() => {
    const executeAsync = async () => {
      if (await updateContextData()) return navigate("/entrar");
    };
    executeAsync();
    // eslint-disable-next-line
  }, []);

  if (!isLoggedIn) {
    navigate("/entrar");
    return null;
  }

  if (!selectedPet) {
    navigate("/tutor/petlist");
    return null;
  }

  function handleSelectMedicalHistory(history) {
    handleSetSelectedMedicalHistory(history);
    navigate("/tutor/pethistory/view");
  }

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
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
        {medicalHistoryList && medicalHistoryList.length > 0 ? (
          <>
            {medicalHistoryList.map((history) => (
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
          </>
        ) : (
          <div className={styles.noData}>
            <h2 className={styles.noDataTitle}>
              Não há registros médicos disponíveis.
            </h2>
            <img
              className={styles.noDataImg}
              src={noDataImg}
              alt="Sem registros"
            />
          </div>
        )}
        <Button
          transparent={medicalHistoryList.length > 0}
          onClick={() => navigate("/tutor/pethistory/add")}
        >
          <FaPlus />
          Adicionar histórico
        </Button>
      </div>

      <Version />
    </div>
  );
}

export default PetHistory;
