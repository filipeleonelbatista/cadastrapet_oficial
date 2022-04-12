import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/vet/MedicalAppointment.module.css";
import { date } from "../../utils/masks";
import { isStringEmpty } from "../../utils/string";

function MedicalAppointmenmt() {
  const location = useLocation();
  const navigate = useNavigate();

  const { props, functions } = useAuth();
  const { isLoggedIn } = props;
  const { getPetByID } = functions;

  const [searchParams, setSearchParams] = useSearchParams();
  const [petUid, setPetUid] = useState();

  const [isView, setIsView] = useState(false);
  const [selectedNav, setSelectedNav] = useState("anotacoes");

  const [consulta, setConsulta] = useState();
  const [codigoPet, setCodigoPet] = useState();
  const [dieta, setDieta] = useState();
  const [nomePet, setNomePet] = useState();
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
  }

  async function handleLoadScannedPet() {
    if (searchParams.get("petUid")) {
      setPetUid(searchParams.get("petUid"));
      sessionStorage.setItem("petUid", searchParams.get("petUid"));
    } else {
      const scannedPetId = sessionStorage.getItem("petUid");
      if (scannedPetId !== null) {
        const scannedPetData = await getPetByID(scannedPetId);
        setCodigoPet(scannedPetData.uid);
        setNomePet(scannedPetData.name);
      }
    }
  }

  useEffect(() => {
    setIsView(location.pathname === "/veterinario/medicalappointment/view");
  }, [location.pathname]);

  useEffect(() => {
    if (isView) {
      // setConsulta(selectedMedicalHistory.title);
      // setDtConsulta(dateToString(selectedMedicalHistory.event_date));
      // setSelectedImage(selectedMedicalHistory.attachment);
      // setAnotacoes(selectedMedicalHistory.notes);
    } else {
      setConsulta(null);
      setDtConsulta(null);
      setSelectedImage(null);
      setAnotacoes(null);
    }
  }, [isView]);

  useEffect(() => {
    handleLoadScannedPet();
  }, []);

  if (!isLoggedIn) {
    navigate("/entrar");
    return null;
  }

  return (
    <div className={styles.container}>
      <BackButton path="/veterinario/vetmedicalhistory" />

      <div className={styles.header}>
        <h3 className={styles.petInfo}>Nova consulta (Anamnése)</h3>
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
        <div className={styles.inputForm}>
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
            <>
              <Input
                disabled={isView}
                required
                id="consulta"
                placeholder="Motivo da consulta"
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
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Digite aqui suas anotações..."
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Dieta"
                placeholder="Dieta"
                value={dieta}
                onChange={(e) => setDieta(e.target.value)}
              />

              <h3 className={styles.petInfo}>Exame físico</h3>

              <div className={styles.inputGroupRow}>
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Peso (KG)"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="T.R.(°C)"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="F.R. (m.p.m.)"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="T.P.C (seg)"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="LFN"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
              </div>
              <div className={styles.inputGroupRow}>
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Hidratação"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Pressão Arterial"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
              </div>
              <div className={styles.inputGroupRow}>
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Pulso arterial"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Comportamento"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Mucosa"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
              </div>
              <div className={styles.inputGroupRow}>
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Nível de consciência"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
                <Input
                  disabled={isView}
                  required
                  id="Dieta"
                  placeholder="Estado corporal"
                  value={dieta}
                  onChange={(e) => setDieta(e.target.value)}
                />
              </div>
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Anotações sobre o estado físico"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <h3 className={styles.petInfo}>Diagnóstico e tratamento</h3>

              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Diagnostico"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Exames complementares"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Tratamentos"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Próximos passos"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Observações"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Textarea
                disabled={isView}
                rows={3}
                required
                id="anotacoes"
                placeholder="Diagnostico"
                value={anotacoes}
                onChange={(e) => setAnotacoes(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                maxLength={10}
                id="dt_consulta"
                placeholder="Data de retorno"
                value={dt_consulta}
                onChange={(e) => setDtConsulta(date(e.target.value))}
              />
            </>
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

export default MedicalAppointmenmt;
