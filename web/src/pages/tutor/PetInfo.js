import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Version from "../../components/Version";
import { uploadImageAsync } from "../../firebase/functions";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetInfo.module.css";
import { date } from "../../utils/masks";
import { dateToString, isStringEmpty, stringToDate } from "../../utils/string";
import { Widget } from "../../components/Widget";

function PetInfo() {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions, props } = useAuth();
  const { updatePetByID, updateContextData } = functions;
  const { selectedPet, isLoggedIn, user } = props;

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
            value={birth_date}
            onChange={(e) => setBirthDate(date(e.target.value))}
          />
          <Input
            disabled={isView}
            required
            id="dt_adocao"
            label="Data de Adoção"
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
      </div>
      {isView ? (
        <Button id="nome" onClick={() => navigate("/tutor/petinfo/edit")}>
          Editar
        </Button>
      ) : (
        <Button id="nome" onClick={handlUpdatePet}>
          Salvar
        </Button>
      )}
      <Version />
      <Widget />
    </div>
  );
}

export default PetInfo;
