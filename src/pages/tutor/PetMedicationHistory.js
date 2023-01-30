import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import noDataImg from "../../assets/images/no_data.svg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetMedicationHistory.module.css";
import { dateToString, yearNow } from "../../utils/string";

function PetMedicationHistory() {
  const navigate = useNavigate();

  const { props, setFunctions, functions } = useAuth();
  const { selectedPet, medicationList, isLoggedIn } = props;
  const { handleSetSelectedMedication } = setFunctions;
  const { updateContextData } = functions;

  function handleSelectMedication(medication) {
    handleSetSelectedMedication(medication);
    navigate("/tutor/petmedicationhistory/view");
  }

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
      <h4 className={styles.headerTitle}>Historico de Vermífugos</h4>
      <div className={styles.content}>
        {medicationList && medicationList.length > 0 ? (
          <>
            {medicationList.map((medication) => (
              <div
                key={medication.uid}
                onClick={() => handleSelectMedication(medication)}
                className={styles.wContainer}
              >
                <div className={styles.itemRow}>
                  <p className={styles.itemTitle}>{medication.medication}</p>
                  <div className={styles.divider}></div>
                  <p className={styles.itemDate}>
                    {dateToString(medication.medication_application_date)}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.noData}>
            <h2 className={styles.noDataTitle}>
              Não há registro de Vermífugos disponível.
            </h2>
            <img
              className={styles.noDataImg}
              src={noDataImg}
              alt="Sem registros"
            />
          </div>
        )}
        <Button
          transparent={medicationList.length > 0}
          onClick={() => navigate("/tutor/petmedicationhistory/add")}
        >
          <FaPlus />
          Adicionar aplicação
        </Button>
      </div>
      <Version />
      <Widget />
    </div>
  );
}

export default PetMedicationHistory;
