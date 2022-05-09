import React, { useEffect, useState } from "react";
import { FaCamera, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Version from "../../components/Version";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/TutorProfile.module.css";
import {
  cpf as cpfMask,
  date,
  phone as phoneMask,
  cep as cepMask,
} from "../../utils/masks";
import { dateToString, isStringEmpty, stringToDate } from "../../utils/string";
import { Widget } from "../../components/Widget";
import { getCepInformation } from "../../utils/cep";
import { uploadImageAsync } from "../../firebase/functions";
import EmergencyContacts from "../../components/EmergencyContacts";

function TutorProfile() {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions, props } = useAuth();
  const { logout, updateUserByID } = functions;
  const { isLoggedIn, user } = props;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");

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
    if (isStringEmpty(phone)) {
      alert("O campo Celular/Whats não foi preenchido");
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
    if (isStringEmpty(CEP)) {
      alert("O campo Cep não foi preenchido");
      return true;
    }
    if (isStringEmpty(Logradouro)) {
      alert("O campo Logradouro não foi preenchido");
      return true;
    }
    if (isStringEmpty(Numero)) {
      alert("O campo Número não foi preenchido");
      return true;
    }
    if (isStringEmpty(Bairro)) {
      alert("O campo Bairro não foi preenchido");
      return true;
    }
    if (isStringEmpty(Cidade)) {
      alert("O campo Cidade não foi preenchido");
      return true;
    }
    if (isStringEmpty(UF)) {
      alert("O campo UF não foi preenchido");
      return true;
    }
    if (isStringEmpty(Pais)) {
      alert("O campo País não foi preenchido");
      return true;
    }
  };

  const handleCep = async () => {
    if (CEP.length === 9) {
      const resultCep = await getCepInformation(CEP);
      if (resultCep.status === 200) {
        setBairro(resultCep.data.bairro);
        setLogradouro(resultCep.data.logradouro);
        setCidade(resultCep.data.localidade);
        setUF(resultCep.data.uf);
        setPais("Brasil");
      }
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
      uploadURLImage = await uploadImageAsync(file, "users");
    } else {
      uploadURLImage = selectedImage;
    }

    const data = {
      uid: user.uid,
      is_admin: user.is_admin,
      user_role: user.user_role,
      name,
      avatar: uploadURLImage,
      cpf,
      email,
      phone,
      birth_date: stringToDate(birth_date).getTime(),
      cnpj: user.cnpj,
      crmv: user.crmv,
      nome_fantasia: user.nome_fantasia,
      endereco: {
        logradouro: Logradouro,
        numero: Numero,
        bairro: Bairro,
        cep: CEP,
        cidade: Cidade,
        uf: UF,
        pais: Pais,
      },
      pets: user.pets,
      emergency_contacts: user.emergency_contacts,
      medical_appointments: user.medical_appointments,
      created_at: user.created_at,
      updated_at: Date.now(),
    };

    if (await updateUserByID(user.uid, data)) {
      return navigate("/tutor/tutorprofile/view");
    }
  }

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/");
    }
  };

  if (!isLoggedIn) {
    navigate("/entrar");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
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
            {user.avatar ? (
              <div
                style={{
                  background: `url(${user.avatar}) no-repeat center center`,
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                }}
              ></div>
            ) : (
              <FaCamera />
            )}
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
            alignItems: "center",
            justifyContent: "center",
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
          {isView && (
            <Button
              transparent={!(selectedNav === "contatos-seguranca")}
              onClick={() => setSelectedNav("contatos-seguranca")}
            >
              Contatos de segurança
            </Button>
          )}
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
              maxLength={10}
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
          <div className={styles.inputForm}>
            <Input
              disabled={isView}
              required
              id="CEP"
              label="CEP"
              value={CEP}
              onBlur={handleCep}
              maxLength={9}
              onChange={(e) => setCEP(cepMask(e.target.value))}
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
        )}

        {isView && (
          <>
            {selectedNav === "contatos-seguranca" && (
              <div className={styles.inputForm}>
                <EmergencyContacts />
              </div>
            )}
          </>
        )}
      </div>
      {isView ? (
        <>
          {selectedNav !== "contatos-seguranca" && (
            <Button
              id="nome"
              onClick={() => {
                navigate("/tutor/tutorprofile/edit");
              }}
            >
              Editar
            </Button>
          )}
        </>
      ) : (
        <Button id="nome" onClick={handlUpdatePet}>
          Salvar
        </Button>
      )}
      <Button transparent onClick={handleLogout} style={{ color: "red" }}>
        <FaSignOutAlt /> Sair
      </Button>
      <Version />
      <Widget />
    </div>
  );
}

export default TutorProfile;
