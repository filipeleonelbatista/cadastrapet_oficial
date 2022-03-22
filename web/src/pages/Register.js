import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/admin/logo.png";
import { AuthContextProvider } from "../context/AuthContext";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/register-page.css";
import {
  cpf as cpfMask,
  phone as telefoneMask,
  cnpj as cnpjMask,
} from "../utils/masks";
import { isStringEmpty } from "../utils/string";

function RegisterComponent() {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions } = useAuth();
  const { RegisterUser } = functions;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [crmv, setCrmv] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      setError("O campo nome não foi preenchido");
      return true;
    }
    if (isStringEmpty(cpf)) {
      setError("O campo cpf não foi preenchido");
      return true;
    }
    if (isStringEmpty(email)) {
      setError("O campo Email não foi preenchido");
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
    if (isStringEmpty(password)) {
      setError("O campo senha não foi preenchido");
      return true;
    }
    if (isStringEmpty(passwordConfirm)) {
      setError("O campo confirmar senha não foi preenchido");
      return true;
    }
    if (password !== passwordConfirm) {
      setError(
        "Senhas digitadas não coincidem. Verifique os campos e tente novamente."
      );
      return true;
    }
    if (location.pathname.includes("veterinario")) {
      if (isStringEmpty(nomeFantasia)) {
        setError("O campo Nome Fantasia não foi preenchido");
        return true;
      }
      if (isStringEmpty(crmv)) {
        setError("O campo CRMV não foi preenchido");
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
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    if (ValidateFields()) return;
    const data = {
      email,
      password,
      user: {
        is_admin: false,
        user_role: userRole,
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
      },
    };

    if (RegisterUser(data))
      navigate(`${location.pathname.replace("/cadastrar", "")}/petlist`);
  }

  useEffect(() => {
    setUserRole(location.pathname.replace("/cadastrar", "").replace("/", ""));
  }, []);

  return (
    <div id="register-page">
      <div className="image-container"></div>
      <div className="register-form">
        <a href="/">
          <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
        </a>
        <h1>Bem vindo!</h1>
        {location.pathname.includes("veterinario") && (
          <p>Complete o cadastro para atender os pets por aqui</p>
        )}
        {location.pathname.includes("tutor") && (
          <p>Complete o cadastro para continuar cuidando do seu pet</p>
        )}
        <form
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <div className="error">{error}</div>
          <div className="input-container">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <label htmlFor="name">Nome</label>
          </div>
          <div className="input-container">
            <input
              id="cpf"
              type="text"
              maxLength={14}
              value={cpf}
              onChange={(e) => {
                setCpf(cpfMask(e.target.value));
              }}
            />
            <label htmlFor="cpf">CPF</label>
          </div>
          <div className="input-container">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-container">
            <input
              id="phone"
              type="text"
              maxLength={15}
              value={phone}
              onChange={(e) => {
                setPhone(telefoneMask(e.target.value));
              }}
            />
            <label htmlFor="phone">Telefone</label>
          </div>
          <div className="input-container">
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="password">Senha</label>
          </div>
          <div className="input-container">
            <input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
            <label htmlFor="passwordConfirm">Confirmar Senha</label>
          </div>

          {location.pathname.includes("veterinario") && (
            <>
              <div className="input-container">
                <input
                  id="nomeFantasia"
                  type="text"
                  value={nomeFantasia}
                  onChange={(e) => {
                    setNomeFantasia(e.target.value);
                  }}
                />
                <label htmlFor="nomeFantasia">Nome Fantasia</label>
              </div>
              <div className="input-container">
                <input
                  id="cnpj"
                  type="text"
                  maxLength={18}
                  value={cnpj}
                  onChange={(e) => {
                    setCnpj(cnpjMask(e.target.value));
                  }}
                />
                <label htmlFor="cnpj">Cnpj</label>
              </div>
              <div className="input-container">
                <input
                  id="crmv"
                  type="text"
                  value={crmv}
                  onChange={(e) => {
                    setCrmv(e.target.value);
                  }}
                />
                <label htmlFor="crmv">CRMV</label>
              </div>
            </>
          )}

          <button className="register-btn" type="submit">
            Cadastrar
          </button>

          <Link
            to={location.pathname.replace("/cadastrar", "")}
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              textDecoration: "none",
              color: "#566dea",
              fontWeight: 800,
            }}
          >
            Já possui cadastro? <br />
            Clique aqui para entrar!
          </Link>
        </form>
      </div>
    </div>
  );
}

function Register() {
  return (
    <AuthContextProvider>
      <RegisterComponent />
    </AuthContextProvider>
  );
}

export default Register;
