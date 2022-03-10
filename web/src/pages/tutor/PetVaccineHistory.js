import React from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetVaccineHistory.module.css";
import noDataImg from "../../assets/images/no_data.svg";
import { dateToString, yearNow } from "../../utils/string";

function PetVaccineHistory() {
  const navigate = useNavigate();

  const { props, setFunctions } = useAuth();
  const { selectedPet, vaccineList } = props;
  const { setSelectedVaccine } = setFunctions;

  function handleSelectVaccine(vaccine) {
    setSelectedVaccine(vaccine);
    navigate("/tutor/petvaccinehistory/view");
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
                {/* <p className={styles.itemNotation}>{history.notes}</p> */}
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
    </div>
  );
}

export default PetVaccineHistory;
