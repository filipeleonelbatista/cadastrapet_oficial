import React, { useEffect, useState } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/icon_white.png";
import dogImg from "../../assets/images/pet.jpg";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Version from "../../components/Version";
import { Widget } from "../../components/Widget";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetInfo.module.css";
import { date } from "../../utils/masks";
import { dateToString, isStringEmpty, stringToDate } from "../../utils/string";

function PetInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions, props, deleteFunctions } = useAuth();
  const { updatePetByID, updateContextData } = functions;
  const { selectedPet, isLoggedIn, user } = props;

  const { deletePet } = deleteFunctions;

  const [name, setName] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [adoption_date, setAdoptionDate] = useState("");
  const [species, setSpecies] = useState("");
  const [animal_race, setAnimalRace] = useState("");
  const [sex, setSex] = useState("");
  const [castration, setCastration] = useState("");
  const [pelage, setPelage] = useState("");
  const [pin_number, setPinNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isView, setIsView] = useState(false);

  const [selectedNav, setSelectedNav] = useState("pet_info");

  const handleDeletePet = async () => {
    if (
      window.confirm(
        "Deseja realmente deletar este registro? Esta ação é irreversível."
      )
    ) {
      await deletePet(selectedPet);
      navigate("/tutor/petlist");
    }
  };

  useEffect(() => {
    setIsView(location.pathname === "/tutor/petinfo/view");
  }, [location.pathname]);

  useEffect(() => {
    if (selectedPet) {
      setName(selectedPet.name);
      setBirthDate(dateToString(selectedPet.birth_date));
      setAdoptionDate(dateToString(selectedPet.adoption_date));
      setSelectedImage(selectedPet.avatar);
      setSpecies(selectedPet.species);
      setAnimalRace(selectedPet.animal_race);
      setSex(selectedPet.sex);
      setPelage(selectedPet.pelage);
      setPinNumber(selectedPet.pin_number);
      setCastration(dateToString(selectedPet.castration));
    }
  }, [selectedPet]);

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (!selectedImage) {
      alert("Imagem não selecionada");
      return true;
    }
    if (isStringEmpty(birth_date)) {
      if (birth_date.length < 10) {
        alert("O campo data de nascimento não está completo");
        return true;
      }
      alert("O campo data de nascimento não foi preenchido");
      return true;
    }
    if (isStringEmpty(adoption_date)) {
      if (adoption_date.length < 10) {
        alert("O campo data de nascimento não está completo");
        return true;
      }
      alert("O campo data de nascimento não foi preenchido");
      return true;
    }

    if (isStringEmpty(species)) {
      alert("O campo Tipo/Especie não foi preenchido");
      return true;
    }

    if (isStringEmpty(pelage)) {
      alert("O campo Pelagem/Cor não foi preenchido");
      return true;
    }

    if (isStringEmpty(animal_race)) {
      alert("O campo Raça não foi preenchido");
      return true;
    }

    if (isStringEmpty(sex)) {
      alert("O campo Sexo não foi preenchido");
      return true;
    }
  };

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    setFile(file);
    reader.onloadend = (e) => {
      setSelectedImage(reader.result);
    };
  };

  async function handlUpdatePet() {
    if (ValidateFields()) return;

    let uploadURLImage = "";
    if (file) {
      uploadURLImage = await uploadImageAsync(file, "pets");
    } else {
      uploadURLImage = selectedImage;
    }

    const data = {
      uid: selectedPet.uid,
      name,
      avatar: uploadURLImage,
      tutor: [user.uid],
      adoption_date: stringToDate(adoption_date).getTime(),
      birth_date: stringToDate(birth_date).getTime(),
      pelage,
      species,
      animal_race,
      sex,
      castration: isStringEmpty(castration)
        ? ""
        : stringToDate(castration).getTime(),
      pin_number: isStringEmpty(pin_number) ? "Sem Coleira" : pin_number,
      events: [],
      vaccines: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updatePetByID(selectedPet.uid, data, user)) {
      return navigate("/tutor/petprofile");
    }
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
          <h4 className={styles.petName}>Dados Gerais</h4>
        </div>
      </div>
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
            transparent={!(selectedNav === "pet_info")}
            onClick={() => setSelectedNav("pet_info")}
          >
            Informações do pet
          </Button>
          {isView && (
            <Button
              transparent={!(selectedNav === "pet_info_doc")}
              onClick={() => setSelectedNav("pet_info_doc")}
            >
              Regitro Pet
            </Button>
          )}
        </div>

        {selectedNav === "pet_info" && (
          <>
            {isView ? (
              <div className={styles.uploadButton}>
                <div
                  style={{
                    background: `url(${selectedPet.avatar}) no-repeat center center`,
                    borderRadius: "50%",
                    width: "100%",
                    height: "100%",
                    backgroundSize: "cover",
                  }}
                ></div>
              </div>
            ) : (
              <label className={styles.uploadButton}>
                <input
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

            <div className={styles.inputForm}>
              <Input
                disabled={isView}
                required
                id="nome"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="dt_nascimento"
                label="Data de Nascimento"
                type={"date"}
                value={birth_date}
                onChange={(e) => setBirthDate(date(e.target.value))}
              />
              <Input
                disabled={isView}
                required
                id="dt_adocao"
                label="Data de Adoção"
                type={"date"}
                value={adoption_date}
                onChange={(e) => setAdoptionDate(date(e.target.value))}
              />

              <Input
                disabled={isView}
                required
                id="tipo"
                label="Tipo/Especie"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />

              <Input
                disabled={isView}
                required
                id="raca"
                label="Raça"
                value={animal_race}
                onChange={(e) => setAnimalRace(e.target.value)}
              />

              <Input
                disabled={isView}
                required
                id="pelagem"
                label="Pelagem/Cor"
                value={pelage}
                onChange={(e) => setPelage(e.target.value)}
              />

              <Input
                disabled={isView}
                required
                id="sexo"
                label="Sexo"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />

              <Input
                disabled={isView}
                id="castrado"
                label="Data de Castração"
                type={"date"}
                value={castration}
                onChange={(e) => setCastration(date(e.target.value))}
              />

              <Input
                disabled={isView}
                id="coleira"
                label="Coleira"
                value={pin_number}
                onChange={(e) => setPinNumber(e.target.value)}
              />
            </div>
          </>
        )}

        {selectedNav === "pet_info_doc" && (
          <>
            <div className={styles.border}>
              <div className={styles.bgDocumentContent}>
                <img src={logoImg} width={40} alt="Cadastrapet logo" />
                <strong className={styles.documentTitle}>
                  REGISTRO GERAL DE ANIMAIS - CADASTRAPET
                </strong>
              </div>
              <div className={styles.petData}>
                <div className={styles.imageFrame}>
                  <img
                    src={selectedPet.avatar}
                    alt="Doguinho"
                    style={{
                      backgroundImage: `url(${dogImg})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "0.8rem",
                    }}
                  />
                </div>
                <div>
                  <p>
                    <b>Nome: </b> {selectedPet.name}
                    <br />
                    <b>Tipo: </b> {selectedPet.species}
                    <br />
                    <b>Raça: </b> {selectedPet.animal_race}
                    <br />
                    <b>Sexo: </b> {selectedPet.sex}
                    <br />
                    <b>Tutor: </b> {user.name}
                    <small>
                      <br /> {user.phone} - {user.email}
                    </small>
                  </p>
                  <p>
                    <b>IdPet: </b> {selectedPet.uid}
                    <br />
                    <b>Coleira: </b> {selectedPet.pin_number}
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.border}>
              <div className={styles.bgDocumentContent}>
                <img src={logoImg} width={40} alt="Cadastrapet logo" />
                <strong className={styles.documentTitle}>
                  REGISTRO GERAL DE ANIMAIS - CADASTRAPET
                </strong>
              </div>
              <div className={styles.petData}>
                <div className={styles.qrCodeFrame}>
                  <QRCode size={190} value={`${selectedPet.uid}`} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p style={{ textAlign: "center" }}>
                    Passe o leitor de <b>QR CODE</b> do celular <br />
                    Ou digite o código no site
                    <br />
                    <b>https://cadastrapet.com.br</b>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {selectedNav === "pet_info" && (
        <>
          {isView ? (
            <>
              <Button id="nome" onClick={() => navigate("/tutor/petinfo/edit")}>
                Editar
              </Button>
              <Button
                onClick={handleDeletePet}
                style={{ backgroundColor: "red", cursor: "pointer" }}
              >
                <FaTrash />
                Deletar Registro
              </Button>
            </>
          ) : (
            <Button id="nome" onClick={handlUpdatePet}>
              Salvar
            </Button>
          )}
        </>
      )}

      <Version />
      <Widget />
    </div>
  );
}

export default PetInfo;
