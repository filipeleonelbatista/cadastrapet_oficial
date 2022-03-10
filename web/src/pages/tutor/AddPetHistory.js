import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
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

  const { props, functions } = useAuth();
  const { selectedPet, selectedMedicalHistory } = props;
  const { updateMedicalHistoryByID, getNewMedicalHistoryID } = functions;

  const [isView, setIsView] = useState(false);
  const [selectedNav, setSelectedNav] = useState("anotacoes");

  const [consulta, setConsulta] = useState();
  const [dt_consulta, setDtConsulta] = useState();
  const [anotacoes, setAnotacoes] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    setFile(file);
    reader.onloadend = (e) => {
      setSelectedImage(reader.result);
    };
  };

  const ValidateFields = () => {
    if (isStringEmpty(consulta)) {
      alert("O campo titulo da consulta não foi preenchido");
      return true;
    }
    if (!file) {
      alert("Imagem não selecionada");
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

    let uploadURLImage = "";
    if (file) {
      uploadURLImage = await uploadImageAsync(file, "medical-history");
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
    if (isView) {
      setConsulta(selectedMedicalHistory.title);
      setDtConsulta(dateToString(selectedMedicalHistory.event_date));
      setSelectedImage(selectedMedicalHistory.attachment);
      setAnotacoes(selectedMedicalHistory.notes);
    } else {
      setConsulta(null);
      setDtConsulta(null);
      setSelectedImage(null);
      setAnotacoes(null);
    }
  }, [isView, selectedMedicalHistory]);

  return (
    <div className={styles.container}>
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
            <label className={styles.uploadButton}>
              <input
                disabled={isView}
                required
                className={styles.uploadInput}
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) => handleFilePreview(e)}
              ></input>
              {selectedImage ? (
                <div
                  alt="Imagem Selecionada"
                  style={{
                    background: `url(${selectedImage}) no-repeat center center`,
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                ></div>
              ) : (
                <FaCamera />
              )}
            </label>
          )}
        </div>
      </div>
      {!isView && <Button onClick={handleCreateMedicalHistory}>Salvar</Button>}
    </div>
  );
}

export default AddPetHistory;
