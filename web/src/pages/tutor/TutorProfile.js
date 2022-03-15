import React, { useEffect, useState } from "react";
import { FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/TutorProfile.module.css";
import { cpf as cpfMask, date, phone as phoneMask } from "../../utils/masks";
import { dateToString, isStringEmpty } from "../../utils/string";

function TutorProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions, props } = useAuth();
  const { logout } = functions;
  const { isLoggedIn, user } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [Logradouro, setLogradouro] = useState("");
  const [Numero, setNumero] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [UF, setUF] = useState("");
  const [Pais, setPais] = useState("");
  const [CEP, setCEP] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const [isView, setIsView] = useState(false);
  const [selectedNav, setSelectedNav] = useState("informacoes");

  useEffect(() => {
    setIsView(location.pathname === "/tutor/tutorprofile/view");
  }, [location.pathname]);

  useEffect(() => {
    console.log(user);
    setName(user.name);
    setEmail(user.email);
    setCpf(user.cpf);
    setPhone(user.phone);
    setBirthDate(dateToString(user.birth_date));
    setLogradouro(user.endereco.logradouro);
    setNumero(user.endereco.numero);
    setBairro(user.endereco.bairro);
    setCidade(user.endereco.cidade);
    setUF(user.endereco.uf);
    setPais(user.endereco.pais);
    setCEP(user.endereco.cep);
    setSelectedImage(user.avatar);
  }, []);

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (isStringEmpty(cpf)) {
      alert("O campo cpf não foi preenchido");
      return true;
    }
    if (isStringEmpty(email)) {
      alert("O campo Email não foi preenchido");
      return true;
    }
  };

  const handleFilePreview = (e) => {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   setFile(file);
    //   reader.onloadend = (e) => {
    //     setSelectedImage(reader.result);
    //   };
  };
  async function handlUpdatePet() {
    //   if (ValidateFields()) return;
    //   let uploadURLImage = "";
    //   if (file) {
    //     uploadURLImage = await uploadImageAsync(file, "pets");
    //   } else {
    //     uploadURLImage = selectedImage;
    //   }
    //   const data = {
    //     uid: selectedPet.uid,
    //     name,
    //     avatar: uploadURLImage,
    //     tutor: [user.uid],
    //     adoption_date: stringToDate(adoption_date).getTime(),
    //     birth_date: stringToDate(birth_date).getTime(),
    //     events: [],
    //     vaccines: [],
    //     created_at: Date.now(),
    //     updated_at: Date.now(),
    //   };
    //   if (await updatePetByID(selectedPet.uid, data, user)) {
    //     return navigate("/tutor/petprofile");
    //   }
  }

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/");
    }
  };

  if (!isLoggedIn) {
    navigate("/tutor");
    return null;
  }

  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petlist" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <div>
            <h4 className={styles.petName}>Dados do Tutor</h4>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        {isView ? (
          <div className={styles.uploadButton}>
            <div
              style={{
                background: `url(${user.avatar}) no-repeat center center`,
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
        <div
          style={{
            width: "100%",
            display: "flex",
            margin: "0.8rem 0",
            gap: "0.8rem",
          }}
        >
          <Button
            transparent={!(selectedNav === "informacoes")}
            onClick={() => setSelectedNav("informacoes")}
          >
            Informações do Tutor
          </Button>
          <Button
            transparent={!(selectedNav === "endereco")}
            onClick={() => setSelectedNav("endereco")}
          >
            Endereço
          </Button>
        </div>
        {selectedNav === "informacoes" && (
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
              id="phone"
              label="Celular/Whats"
              value={phone}
              maxLength={15}
              onChange={(e) => setPhone(phoneMask(e.target.value))}
            />
            <Input
              disabled={isView}
              required
              id="cpf"
              label="CPF"
              value={cpf}
              maxLength={14}
              onChange={(e) => setCpf(cpfMask(e.target.value))}
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
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}
        {selectedNav === "endereco" && (
          <>
            <div className={styles.inputForm}>
              <Input
                disabled={isView}
                required
                id="CEP"
                label="CEP"
                value={CEP}
                onChange={(e) => setCEP(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Logradouro"
                label="Logradouro"
                value={Logradouro}
                onChange={(e) => setLogradouro(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Numero"
                label="Numero"
                value={Numero}
                maxLength={14}
                onChange={(e) => setNumero(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Bairro"
                label="Bairro"
                value={Bairro}
                onChange={(e) => setBairro(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Cidade"
                label="Cidade"
                value={Cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="UF"
                label="UF"
                value={UF}
                onChange={(e) => setUF(e.target.value)}
              />
              <Input
                disabled={isView}
                required
                id="Pais"
                label="Pais"
                value={Pais}
                onChange={(e) => setPais(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      {isView ? (
        <Button
          id="nome"
          onClick={() => {
            //navigate("/tutor/tutorprofile/edit");
          }}
        >
          Editar
        </Button>
      ) : (
        <Button id="nome" onClick={handlUpdatePet}>
          Salvar
        </Button>
      )}
      <Button transparent onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </Button>
    </div>
  );
}

export default TutorProfile;
