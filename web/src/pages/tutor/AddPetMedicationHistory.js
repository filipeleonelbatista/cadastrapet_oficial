import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputUpload from "../../components/InputUpload";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/AddPetMedicationHistory.module.css";
import { date } from "../../utils/masks";
import {
  dateToString,
  isStringEmpty,
  stringToDate,
  yearNow,
} from "../../utils/string";

function AddPetMedicationHistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const { props, functions } = useAuth();
  const { selectedPet, selectedMedication, isLoggedIn } = props;
  const { updateMedicationByID, getNewMedicationID, updateContextData } =
    functions;

  const [isView, setIsView] = useState(false);

  const [vacina, setVacina] = useState();
  const [dt_aplicacao, setDtAplicacao] = useState();
  const [files, setFiles] = useState([]);

  const handleFilePreview = (e) => {
    setFiles(e.target.files);
  };

  const ValidateFields = () => {
    if (isStringEmpty(vacina)) {
      alert("O campo vacina não foi preenchido");
      return true;
    }
    if (isStringEmpty(dt_aplicacao)) {
      if (dt_aplicacao.length < 10) {
        alert("O campo Data da aplicação não está completo");
        return true;
      }
      alert("O campo Data da aplicação não foi preenchido");
      return true;
    }
  };

  async function handleCreateVaccine() {
    if (ValidateFields()) return;

    let uploadURLImage = [];
    if (files) {
      for (const file of files) {
        const newUrl = await uploadImageAsync(file, "medication");
        uploadURLImage.push(newUrl);
      }
    }

    const medicationId = await getNewMedicationID();

    const data = {
      uid: medicationId,
      medication: vacina,
      medication_application_date: stringToDate(dt_aplicacao).getTime(),
      medication_receipe: uploadURLImage,
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updateMedicationByID(medicationId, data, selectedPet))
      return navigate("/tutor/petmedicationhistory");
  }

  useEffect(() => {
    setIsView(location.pathname === "/tutor/petmedicationhistory/view");
  }, [location.pathname]);

  useEffect(() => {
    if (selectedMedication) {
      if (isView) {
        setVacina(selectedMedication.medication);
        setDtAplicacao(
          dateToString(selectedMedication.medication_application_date)
        );
      } else {
        setVacina(null);
        setDtAplicacao(null);
      }
    }
  }, [isView, selectedMedication]);

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
      <BackButton path="/tutor/petmedicationhistory" />
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
        <div className={styles.inputForm}>
          <Input
            disabled={isView}
            required
            id="vermifugo"
            label="Tipo/Marca"
            value={vacina}
            onChange={(e) => setVacina(e.target.value)}
          />
          <Input
            disabled={isView}
            required
            maxLength={10}
            id="dt_aplicacao"
            placeholder="DD/MM/AAAA"
            label="Data da aplicação"
            value={dt_aplicacao}
            onChange={(e) => setDtAplicacao(date(e.target.value))}
          />
        </div>

        <h4 className={styles.petName}>
          {isView
            ? "Comprovante de aplicação do vermífugo"
            : "Envie o comprovante de aplicação do vermífugo"}
        </h4>
        <InputUpload
          id="vaccineHistory"
          label={"Enviar documentos"}
          onChange={(e) => handleFilePreview(e)}
          accept="image/png, image/jpeg"
          disabled={isView}
          attachment={isView && selectedMedication.medication_receipt}
          required
        />
      </div>
      {!isView && <Button onClick={handleCreateVaccine}>Salvar</Button>}
      <Version />
      <Widget />
    </div>
  );
}

export default AddPetMedicationHistory;
