import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import QrReader from "react-qr-scanner";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Version from "../../components/Version";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/CreatePet.module.css";
import { date } from "../../utils/masks";
import { dateToString, isStringEmpty, stringToDate } from "../../utils/string";
import { Widget } from "../../components/Widget";

function CreatePet() {
  const navigate = useNavigate();

  const { functions, props } = useAuth();
  const { getNewPetID, updatePetByID, updateContextData, getPetByID } =
    functions;
  const { user, isLoggedIn } = props;

  const [name, setName] = useState("");
  const [selectedNav, setSelectedNav] = useState("add_new");
  const [birth_date, setBirthDate] = useState("");
  const [adoption_date, setAdoptionDate] = useState("");
  const [species, setSpecies] = useState("");
  const [animal_race, setAnimalRace] = useState("");
  const [sex, setSex] = useState("");
  const [castration, setCastration] = useState("");
  const [pelage, setPelage] = useState("");
  const [pin_number, setPinNumber] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sharedPet, setSharedPet] = useState();
  const [file, setFile] = useState(null);

  const [setQrscan] = useState("No result");
  const handleScan = async (data) => {
    if (data) {
      console.error(data);
      setQrscan(data.text);
      const scannedPet = await getPetByID(data.text);
      setSharedPet(scannedPet);
      console.log(scannedPet);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

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

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (!selectedImage && !file) {
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

  async function handleCreatePet() {
    if (ValidateFields()) return;

    let uploadURLImage = await uploadImageAsync(file, "pets");

    const petID = await getNewPetID();

    const data = {
      uid: petID,
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

    if (await updatePetByID(petID, data, user, true)) {
      return navigate("/tutor/petprofile");
    }
  }

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
      <BackButton path="/tutor/petlist" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <h4 className={styles.petName}>Adicionar Pet</h4>
        </div>
      </div>
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
          transparent={!(selectedNav === "add_new")}
          onClick={() => setSelectedNav("add_new")}
        >
          Novo Pet
        </Button>
        <Button
          transparent={!(selectedNav === "add_existent")}
          onClick={() => setSelectedNav("add_existent")}
        >
          Ler Qr Code
        </Button>
      </div>
      {selectedNav === "add_existent" && (
        <div className={styles.content}>
          {sharedPet ? (
            <>
              <div className={styles.content}>
                <label className={styles.uploadButton}>
                  <div
                    alt="Imagem Selecionada"
                    style={{
                      background: `url(${sharedPet.avatar}) no-repeat center center`,
                      borderRadius: "50%",
                      width: "100%",
                      height: "100%",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </label>

                <div className={styles.inputForm}>
                  <Input
                    disabled
                    id="nome"
                    label="Nome"
                    value={sharedPet.name}
                  />
                  <Input
                    disabled
                    maxLength={10}
                    id="dt_nascimento"
                    label="Data de Nascimento"
                    value={dateToString(sharedPet.birth_date)}
                  />
                </div>
              </div>
              <p>Deseja adicionar o pet compartilhado com você?</p>
              <Button id="nome" onClick={handleCreatePet}>
                Adicionar Pet
              </Button>
            </>
          ) : (
            <QrReader
              // onImageLoad={() => console.log("imageloaded")}
              delay={500}
              facingMode="front"
              // legacyMode="true"
              // chooseDeviceId={(props) => console.log(props)}
              onError={handleError}
              onScan={handleScan}
              style={{ height: 240, width: 320 }}
            />
          )}
        </div>
      )}
      {selectedNav === "add_new" && (
        <>
          <div className={styles.content}>
            <p>Clique na câmera para adicionar uma foto do seu Pet</p>
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

            <div className={styles.inputForm}>
              <Input
                required
                id="nome"
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                required
                maxLength={10}
                id="dt_nascimento"
                label="Data de Nascimento"
                value={birth_date}
                onChange={(e) => setBirthDate(date(e.target.value))}
              />
              <Input
                required
                id="dt_adocao"
                maxLength={10}
                label="Data de Adoção"
                value={adoption_date}
                onChange={(e) => setAdoptionDate(date(e.target.value))}
              />

              <Input
                required
                id="tipo"
                label="Tipo/Especie"
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              />

              <Input
                required
                id="raca"
                label="Raça"
                value={animal_race}
                onChange={(e) => setAnimalRace(e.target.value)}
              />

              <Input
                required
                id="pelagem"
                label="Pelagem/Cor"
                value={pelage}
                onChange={(e) => setPelage(e.target.value)}
              />

              <Input
                required
                id="sexo"
                label="Sexo"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />

              <Input
                id="castrado"
                label="Data de Castração"
                value={castration}
                onChange={(e) => setCastration(date(e.target.value))}
              />

              <Input
                id="coleira"
                label="Coleira"
                value={pin_number}
                onChange={(e) => setPinNumber(e.target.value)}
              />
            </div>
          </div>

          <Button id="nome" onClick={handleCreatePet}>
            Adicionar Pet
          </Button>
        </>
      )}
      <Version />
      <Widget />
    </div>
  );
}

export default CreatePet;
