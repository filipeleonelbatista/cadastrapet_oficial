import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/pages/tutor/register-page.css";
import { isStringEmpty } from "../../utils/string";

function RegisterComponent() {
  const navigate = useNavigate();
  const { functions } = useAuth();
  const { RegisterUser } = functions;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");

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
  };

  async function handleOnSubmit(event) {
    event.preventDefault();
    if (ValidateFields()) return;
    const data = {
      email,
      password,
      user: {
        is_admin: false,
        name,
        avatar: "",
        cpf,
        email,
        birth_date: "",
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

    if (RegisterUser(data)) navigate("/tutor/petlist");
  }

  return (
    <div id="login-page">
      <div className="image-container"></div>
      <div className="login-form">
        <a href="/">
          <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
        </a>
        <h1>Bem vindo!</h1>
        <p>Complete o cadastro para continuar cuidando do seu pet</p>
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
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
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
          <button className="login-btn" type="submit">
            Cadastrar
          </button>

          <Link
            to="/tutor"
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
