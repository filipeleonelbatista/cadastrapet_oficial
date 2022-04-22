import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Version from "../../components/Version";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetCode.module.css";
import { yearNow } from "../../utils/string";

function PetCode() {
  const navigate = useNavigate();
  const [selectedNav, setSelectedNav] = useState("veterinario");
  const { props, functions } = useAuth();
  const { selectedPet, isLoggedIn } = props;
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
      <h4 className={styles.headerTitle}>Use a camera para ler o Código QR</h4>
      <div className={styles.content}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "0.8rem 0",
            gap: "0.8rem",
          }}
        >
          <Button
            transparent={!(selectedNav === "veterinario")}
            onClick={() => setSelectedNav("veterinario")}
          >
            Veterinário
          </Button>
          <Button
            transparent={!(selectedNav === "tutor")}
            onClick={() => setSelectedNav("tutor")}
          >
            Tutor
          </Button>
        </div>
        <p className={styles.aboutQr}>
          {selectedNav === "veterinario" ? (
            <>
              Leia o <strong>Qr Code</strong> para adicionar informações medicas
              ao pet.
            </>
          ) : (
            <>
              Entre no app em <b>Adicionar pet {">"} Ler Qr Code</b> para
              <br />
              compartilhar os dados do pet com outro tutor
              <br />
              <br />
              Leia o <strong>Qr Code</strong> para compartilhar os dados do pet
              com outro tutor
            </>
          )}
        </p>
        <div className={styles.wContainer}>
          <QRCode
            value={
              selectedNav === "veterinario"
                ? `https://cadastrapet.com.br/veterinario/medicalappointment/add?petUid=${selectedPet.uid}`
                : `${selectedPet.uid}`
            }
          />
        </div>
      </div>
      <h4 className={styles.headerTitle}>
        Codigo do pet: <br />
        <strong>{selectedPet.uid}</strong>
      </h4>
      <Version />
    </div>
  );
}

export default PetCode;
