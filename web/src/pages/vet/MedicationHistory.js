import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from "../../styles/pages/vet/MedicationHistory.module.css";
import { date } from "../../utils/masks";
import { isStringEmpty } from "../../utils/string";

function MedicationHistory() {
  const location = useLocation();

  const [isView, setIsView] = useState(false);

  const [codigoPet, setCodigoPet] = useState();
  const [nomePet, setNomePet] = useState();
  const [vacina, setVacina] = useState();
  const [laboratorio, setLaboratorio] = useState();
  const [crmv, setCrmv] = useState();
  const [dt_aplicacao, setDtAplicacao] = useState();
  const [dt_proxima_aplicacao, setDtProximaAplicacao] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [setFile] = useState(null);

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
    if (isStringEmpty(dt_aplicacao)) {
      if (dt_aplicacao.length < 10) {
        alert("O campo Data da aplicação não está completo");
        return true;
      }
      alert("O campo Data da aplicação não foi preenchido");
      return true;
    }
  };

  async function handleCreateMedicalHistory() {
    if (ValidateFields()) return;
  }

  useEffect(() => {
    setIsView(location.pathname === "/veterinario/vaccinehistory/view");
  }, [location.pathname]);

  useEffect(() => {
    if (isView) {
      // setVacina(selectedVaccine.vaccine);
      // setLaboratorio(selectedVaccine.vaccineLab);
      // setCrmv(selectedVaccine.doctorId);
      // setDtAplicacao(dateToString(selectedVaccine.vaccine_application_date));
      // setDtProximaAplicacao(
      //   selectedVaccine.vaccine_next_application_date === ""
      //     ? ""
      //     : dateToString(selectedVaccine.vaccine_next_application_date)
      // );
      // setSelectedImage(selectedVaccine.vaccine_receipt);
    } else {
      setVacina(null);
      setDtAplicacao(null);
      setSelectedImage(null);
      setLaboratorio(null);
      setCrmv(null);
      setDtProximaAplicacao(null);
    }
  }, [isView]);

  return (
    <div className={styles.container}>
      <BackButton path="/veterinario/vetmedicationhistory" />

      <div className={styles.header}>
        <h3 className={styles.petInfo}>Administração de medicamentos</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.inputGroupRow}>
          <Input
            disabled={isView}
            required
            id="codigoPet"
            placeholder="Código Pet"
            value={codigoPet}
            onChange={(e) => setCodigoPet(e.target.value)}
          />
          <Input
            disabled
            required
            id="nomePet"
            placeholder="Nome do pet"
            value={nomePet}
            onChange={(e) => setNomePet(date(e.target.value))}
          />
        </div>
        <Input
          disabled={isView}
          required
          id="vacina"
          placeholder="Medicação"
          value={vacina}
          onChange={(e) => setVacina(e.target.value)}
        />
        <Input
          disabled={isView}
          required
          id="rotulo"
          placeholder="Laboratório da Medicação"
          value={laboratorio}
          onChange={(e) => setLaboratorio(e.target.value)}
        />
        <Input
          disabled={isView}
          required
          id="crmv"
          placeholder="CRMV do aplicador"
          value={crmv}
          onChange={(e) => setCrmv(e.target.value)}
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
        <Input
          disabled={isView}
          required
          maxLength={10}
          id="dt_proxima_aplicacao"
          placeholder="Data da próxima aplicação"
          value={dt_proxima_aplicacao}
          onChange={(e) => setDtProximaAplicacao(date(e.target.value))}
        />
      </div>
      <h3 className={styles.petInfo}>
        {isView
          ? "Comprovante de vacinação"
          : "Envie o comprovante de vacinação"}
      </h3>
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
          <img
            download={selectedImage}
            src={selectedImage}
            alt="Imagem Selecionada"
            style={{
              background: `url(${selectedImage}) no-repeat center center`,
              borderRadius: "50%",
              width: "100%",
              height: "100%",
              backgroundSize: "cover",
            }}
          />
        ) : (
          <FaCamera />
        )}
      </label>
      {!isView && <Button onClick={handleCreateMedicalHistory}>Salvar</Button>}
    </div>
  );
}

export default MedicationHistory;
