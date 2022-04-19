import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/pages/admin/login-page.css";

function LoginAdminComponent() {
  const navigate = useNavigate();
  const { props, functions } = useAuth();
  const { isLoggedIn } = props;
  const { signInUser } = functions;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  async function handleOnSubmit(event) {
    event.preventDefault();
    if (email === "" || password === "") {
      setError("Opa, faltou alguma informação!");
      return;
    }
    if (await signInUser(email, password)) navigate("/admin/principal");
  }

  useEffect(() => {
    if (isLoggedIn) navigate("/admin/principal");
  }, [isLoggedIn, navigate]);

  return (
    <div id="login-page">
      <div className="image-container"></div>
      <div className="login-form">
        <a href="/">
          <img src={logo} alt="Cadastra Pet Admin" width="270" />
        </a>
        <h1>Bem vindo novamente</h1>
        <p>Entre para continuar usando o sistema</p>
        <form
          onSubmit={(e) => {
            handleOnSubmit(e);
          }}
        >
          <div className="error">{error}</div>
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
          <div className="input-group">
            <div className="remember">
              <input
                id="check"
                type="checkbox"
                value={remember}
                onChange={(e) => {
                  setRemember(e.target.value);
                }}
              />
              <label htmlFor="check">Manter conectado</label>
            </div>
            <Link to="/admin/login">Esqueceu sua senha?</Link>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginAdmin() {
  return (
    <AuthContextProvider>
      <LoginAdminComponent />
    </AuthContextProvider>
  );
}
export default LoginAdmin;
