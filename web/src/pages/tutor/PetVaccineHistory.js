import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetVaccineHistory.module.css";
import noDataImg from "../../assets/images/no_data.svg";
import { dateToString, isStringEmpty, yearNow } from "../../utils/string";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";

function PetVaccineHistory() {
  const navigate = useNavigate();

  const { props, setFunctions, functions } = useAuth();
  const { selectedPet, vaccineList, isLoggedIn } = props;
  const { handleSetSelectedVaccine } = setFunctions;
  const { updateContextData } = functions;

  function handleSelectVaccine(vaccine) {
    handleSetSelectedVaccine(vaccine);
    navigate("/tutor/petvaccinehistory/view");
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
      <h4 className={styles.headerTitle}>Historico de Vacinas</h4>
      <div className={styles.content}>
        {vaccineList && vaccineList.length > 0 ? (
          <>
            {vaccineList.map((vaccine) => (
              <div
                key={vaccine.uid}
                onClick={() => handleSelectVaccine(vaccine)}
                className={styles.wContainer}
              >
                <div className={styles.itemRow}>
                  <p className={styles.itemTitle}>{vaccine.vaccine}</p>
                  <div className={styles.divider}></div>
                  <p className={styles.itemDate}>
                    {dateToString(vaccine.vaccine_application_date)}
                  </p>
                </div>
                <div className={styles.itemRow}>
                  {!isStringEmpty(vaccine.doctorId) && (
                    <p className={styles.itemNotation}>
                      <strong style={{ marginRight: "0.4rem" }}>CRMV</strong>
                      {vaccine.doctorId}
                    </p>
                  )}
                  {!isStringEmpty(vaccine.vaccineLab) && (
                    <p className={styles.itemNotation}>
                      <strong style={{ marginRight: "0.4rem" }}>
                        Laboratorio
                      </strong>
                      {vaccine.vaccineLab}
                    </p>
                  )}
                  {!isStringEmpty(vaccine.vaccine_next_application_date) && (
                    <p className={styles.itemNotation}>
                      <strong style={{ marginRight: "0.4rem" }}>
                        Prox. Aplicação
                      </strong>
                      {dateToString(vaccine.vaccine_next_application_date)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className={styles.noData}>
            <h2 className={styles.noDataTitle}>
              Não há registro de vacinas disponível.
            </h2>
            <img
              className={styles.noDataImg}
              src={noDataImg}
              alt="Sem registros"
            />
          </div>
        )}
        <Button
          transparent={vaccineList.length > 0}
          onClick={() => navigate("/tutor/petvaccinehistory/add")}
        >
          <FaPlus />
          Adicionar vacinação
        </Button>
      </div>
      <Version />
      <Widget />
    </div>
  );
}

export default PetVaccineHistory;
