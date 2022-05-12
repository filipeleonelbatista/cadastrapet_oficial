import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import CodigoPetImage from "../../assets/codigopet.png";
import QrImage from "../../assets/qr.png";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/vet/CreateQuickAppoinment.module.css";
import {
  cnpj as cnpjMask,
  cpf as cpfMask,
  phone as telefoneMask,
} from "../../utils/masks";
import { isStringEmpty } from "../../utils/string";

function CreateQuickAppoinment() {
  const navigate = useNavigate();

  const { functions } = useAuth();
  const { RegisterUser } = functions;

  const [searchParams, setSearchParams] = useSearchParams();

  const [isInteractive, setIsInteractive] = useState(false);

  const [name, setname] = useState("");
  const [cpf, setcpf] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [nomeFantasia, setnomeFantasia] = useState("");
  const [cnpj, setcnpj] = useState("");
  const [crmv, setcrmv] = useState("");

  const [codigopet, setcodigopet] = useState("");
  const [selectedDocument, setselectedDocument] = useState(
    "/veterinario/medicalappointment/add"
  );

  function ValidateFields() {
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
    if (phone.length < 15) {
      if (isStringEmpty(phone)) {
        alert("O campo Telefone não foi preenchido");
        return true;
      } else {
        alert("O campo Telefone não está completo");
        return true;
      }
    }
    if (isStringEmpty(nomeFantasia)) {
      alert("O campo Nome Fantasia não foi preenchido");
      return true;
    }
    if (isStringEmpty(crmv)) {
      alert("O campo CRMV não foi preenchido");
      return true;
    }
    if (cnpj.length < 18) {
      if (isStringEmpty(cnpj)) {
        alert("O campo CNPJ não foi preenchido");
        return true;
      } else {
        alert("O campo CNPJ não está completo");
        return true;
      }
    }
  }

  async function handleRegister() {
    if (ValidateFields()) return;

    if (isStringEmpty(codigopet)) {
      alert("O campo CódigoPet não foi preenchido");
      return true;
    }

    const data = {
      email,
      password: "cadastrapet@12345",
      user: {
        is_admin: false,
        user_role: "veterinario",
        name,
        avatar: "",
        cpf,
        email,
        phone,
        birth_date: "",
        cnpj,
        crmv,
        nome_fantasia: nomeFantasia,
        endereco: {
          logradouro: "",
          numero: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          pais: "",
        },
        pets: [],
        emergency_contacts: [],
        medical_appointments: {
          medical_history: [],
          vaccine_history: [],
          medication_history: [],
        },
      },
    };

    if (await RegisterUser(data)) navigate(selectedDocument);
  }

  function handleFirstPartForm() {
    if (ValidateFields()) return;
    setIsInteractive(true);
  }

  useEffect(() => {
    if (searchParams.get("petUid")) {
      setcodigopet(searchParams.get("petUid"));
      sessionStorage.setItem("petUid", searchParams.get("petUid"));
    } else {
      const scannedPetId = sessionStorage.getItem("petUid");
      if (scannedPetId !== null) {
        setcodigopet(scannedPetId);
      }
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
      <BackButton path="/" />
      <div className={styles.content}>
        <div className={styles.userInfo}>
          <h2>Olá, tudo bem?</h2>
          <p>
            Para deixar o cadastro de informações do pet mais completo,
            precisamos de algumas informações suas:
          </p>
          <div>
            <Input
              required
              placeholder="Nome do Veterinário"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <Input
              required
              placeholder="CPF"
              maxLength={14}
              value={cpf}
              onChange={(e) => setcpf(cpfMask(e.target.value))}
            />
            <Input
              required
              placeholder="Email do veterinário"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <Input
              required
              placeholder="Telefone do veterinário"
              maxLength={15}
              value={phone}
              onChange={(e) => setphone(telefoneMask(e.target.value))}
            />
            <Input
              required
              placeholder="Nome Fantasia/Rasão Social"
              value={nomeFantasia}
              onChange={(e) => setnomeFantasia(e.target.value)}
            />
            <Input
              required
              maxLength={18}
              placeholder="CNPJ"
              value={cnpj}
              onChange={(e) => setcnpj(cnpjMask(e.target.value))}
            />
            <Input
              required
              placeholder="CRMV"
              value={crmv}
              onChange={(e) => setcrmv(e.target.value)}
            />
          </div>
          <Button
            onClick={handleFirstPartForm}
            transparent
            style={{ marginLeft: "auto" }}
          >
            Seguinte <FaArrowRight />
          </Button>
        </div>
        <div className={styles.divider}></div>
        <div
          className={styles.petInfo}
          style={{ opacity: isInteractive ? "1" : " 0.8" }}
        >
          <div className={styles.logoContainer}>
            <img
              src={QrImage}
              alt="QrCode"
              className={styles.qrCode}
              style={{ marginLeft: "-5px" }}
            />
            <img
              src={CodigoPetImage}
              alt="CodigoPet"
              className={styles.codigoPet}
            />
          </div>
          <p>
            Digite o código existente no APP do tutor para adicionar informações
            sobre a consulta com o Pet
          </p>
          <Input
            disabled={!isInteractive}
            placeholder="CodigoPet"
            value={codigopet}
            onChange={(e) => setcodigopet(e.target.value)}
          />
          <Select
            disabled={!isInteractive}
            label="Qual documento deseja inserir?"
            options={[
              {
                value: "Histórico Médico",
                key: "/veterinario/medicalappointment/add",
              },
              { value: "Vacinação", key: "/veterinario/vaccinehistory/add" },
              {
                value: "Aplicação de Vermífugos",
                key: "/veterinario/medicationhistory/add",
              },
            ]}
            required
            setSelectedOption={setselectedDocument}
            value={selectedDocument}
          />
          <Button
            onClick={handleRegister}
            disabled={!isInteractive}
            style={{ marginLeft: "auto" }}
          >
            Prosseguir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuickAppoinment;
