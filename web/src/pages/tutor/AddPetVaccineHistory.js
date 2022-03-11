import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/AddPetVaccineHistory.module.css";
import { date } from "../../utils/masks";
import {
  dateToString,
  isStringEmpty,
  stringToDate,
  yearNow,
} from "../../utils/string";

function AddPetVaccineHistory() {
  const location = useLocation();
  const navigate = useNavigate();

  const { props, functions } = useAuth();
  const { selectedPet, selectedVaccine, isLoggedIn } = props;
  const { updateVaccineByID, getNewVaccineID, updateContextData } = functions;

  const [isView, setIsView] = useState(false);

  const [vacina, setVacina] = useState();
  const [dt_aplicacao, setDtAplicacao] = useState();
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
    if (isStringEmpty(vacina)) {
      alert("O campo vacina não foi preenchido");
      return true;
    }
    if (!file) {
      alert("Imagem não selecionada");
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

    let uploadURLImage = "";
    if (file) {
      uploadURLImage = await uploadImageAsync(file, "vaccine");
    }

    const vaccineID = await getNewVaccineID();

    const data = {
      uid: vaccineID,
      vaccine: vacina,
      vaccine_receipt: uploadURLImage,
      vaccine_application_date: stringToDate(dt_aplicacao).getTime(),
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updateVaccineByID(vaccineID, data, selectedPet))
      return navigate("/tutor/petvaccinehistory");
  }

  useEffect(() => {
    setIsView(location.pathname === "/tutor/petvaccinehistory/view");
  }, [location.pathname]);

  useEffect(() => {
    if (selectedVaccine) {
      if (isView) {
        setVacina(selectedVaccine.vaccine);
        setDtAplicacao(dateToString(selectedVaccine.vaccine_application_date));
        setSelectedImage(selectedVaccine.vaccine_receipt);
      } else {
        setVacina(null);
        setDtAplicacao(null);
        setSelectedImage(null);
      }
    }
  }, [isView, selectedVaccine]);

  useEffect(() => {
    const executeAsync = async () => {
      if (await updateContextData()) return navigate("/tutor");
    };
    executeAsync();
    // eslint-disable-next-line
  }, []);

  if (!isLoggedIn) {
    navigate("/tutor");
    return null;
  }

  if (!selectedPet) {
    navigate("/tutor/petlist");
    return null;
  }

  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petvaccinehistory" />
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
        <div className={styles.inputForm}>
          <Input
            disabled={isView}
            required
            id="vacina"
            placeholder="Vacina"
            value={vacina}
            onChange={(e) => setVacina(e.target.value)}
          />
          <Input
            disabled={isView}
            required
            maxLength={10}
            id="dt_aplicacao"
            placeholder="Data da aplicação"
            value={dt_aplicacao}
            onChange={(e) => setDtAplicacao(date(e.target.value))}
          />
        </div>
      </div>
      {!isView && <Button onClick={handleCreateVaccine}>Salvar</Button>}
    </div>
  );
}

export default AddPetVaccineHistory;
