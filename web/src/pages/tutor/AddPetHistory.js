import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import InputUpload from "../../components/InputUpload";
import Textarea from "../../components/Textarea";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/AddPetHistory.module.css";
import { date } from "../../utils/masks";
import {
  dateToString,
  isStringEmpty,
  stringToDate,
  yearNow,
} from "../../utils/string";

function AddPetHistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const { props, functions, deleteFunctions } = useAuth();
  const { selectedPet, selectedMedicalHistory, isLoggedIn } = props;
  const {
    updateMedicalHistoryByID,
    getNewMedicalHistoryID,
    updateContextData,
  } = functions;

  const { deleteMedicalHistory } = deleteFunctions;

  const [isView, setIsView] = useState(false);
  const [selectedNav, setSelectedNav] = useState("anotacoes");

  const [consulta, setConsulta] = useState();
  const [dt_consulta, setDtConsulta] = useState();
  const [anotacoes, setAnotacoes] = useState();
  const [files, setFiles] = useState([]);

  const handleDeleteMedicalHistory = async () => {
    if (
      window.confirm(
        "Deseja realmente deletar este registro? Esta ação é irreversível."
      )
    ) {
      await deleteMedicalHistory(selectedMedicalHistory);
      navigate("/tutor/pethistory");
    }
  };

  const handleFilePreview = (e) => {
    setFiles(e.target.files);
  };

  const ValidateFields = () => {
    if (isStringEmpty(consulta)) {
      alert("O campo titulo da consulta não foi preenchido");
      return true;
    }
    if (isStringEmpty(dt_consulta)) {
      if (dt_consulta.length < 10) {
        alert("O campo Data da consulta não está completo");
        return true;
      }
      alert("O campo Data da consulta não foi preenchido");
      return true;
    }
  };

  async function handleCreateMedicalHistory() {
    if (ValidateFields()) return;

    let uploadURLImage = [];
    if (files) {
      for (const file of files) {
        const newUrl = await uploadImageAsync(file, "medical-history");
        uploadURLImage.push(newUrl);
      }
    }

    const medicalHistoryID = await getNewMedicalHistoryID();

    const data = {
      uid: medicalHistoryID,
      pet_uid: selectedPet.uid,
      attachment: uploadURLImage,
      title: consulta,
      notes: anotacoes,
      event_date: stringToDate(dt_consulta).getTime(),
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updateMedicalHistoryByID(medicalHistoryID, data, selectedPet))
      return navigate("/tutor/pethistory");
  }

  useEffect(() => {
    setIsView(location.pathname === "/tutor/pethistory/view");
  }, [location.pathname]);

  useEffect(() => {
    if (selectedMedicalHistory) {
      if (isView) {
        setConsulta(selectedMedicalHistory.title);
        setDtConsulta(dateToString(selectedMedicalHistory.event_date));
        setAnotacoes(selectedMedicalHistory.notes);
      } else {
        setConsulta(null);
        setDtConsulta(null);
        setAnotacoes(null);
      }
    }
  }, [isView, selectedMedicalHistory]);

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
      <BackButton path="/tutor/pethistory" />
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
            id="consulta"
            placeholder="Consulta"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
          />
          <Input
            disabled={isView}
            required
            maxLength={10}
            id="dt_consulta"
            placeholder="Data da consulta"
            value={dt_consulta}
            onChange={(e) => setDtConsulta(date(e.target.value))}
          />

          <div
            style={{
              width: "100%",
              display: "flex",
              margin: "0.8rem 0",
              gap: "0.8rem",
            }}
          >
            <Button
              transparent={!(selectedNav === "anotacoes")}
              onClick={() => setSelectedNav("anotacoes")}
            >
              Anotações
            </Button>
            <Button
              transparent={!(selectedNav === "documentos")}
              onClick={() => setSelectedNav("documentos")}
            >
              Documentos
            </Button>
          </div>
          {selectedNav === "anotacoes" && (
            <Textarea
              disabled={isView}
              required
              id="anotacoes"
              placeholder="Digite aqui suas anotações..."
              value={anotacoes}
              onChange={(e) => setAnotacoes(e.target.value)}
            />
          )}
          {selectedNav === "documentos" && (
            <InputUpload
              id="medicalhistory"
              label={"Enviar documentos"}
              onChange={(e) => handleFilePreview(e)}
              accept="image/png, image/jpeg"
              disabled={isView}
              attachment={isView && selectedMedicalHistory.attachment}
              required
            />
          )}
        </div>
      </div>
      {!isView && <Button onClick={handleCreateMedicalHistory}>Salvar</Button>}
      {isView && (
        <Button
          onClick={handleDeleteMedicalHistory}
          style={{ backgroundColor: "red", cursor: "pointer" }}
        >
          <FaTrash />
          Deletar Registro
        </Button>
      )}
      <Version />
      <Widget />
    </div>
  );
}

export default AddPetHistory;
