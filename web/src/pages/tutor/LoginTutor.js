import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/pages/tutor/login-page.css";

function LoginTutor() {
  const navigate = useNavigate();
  const { props, functions } = useAuth();
  const { isLoggedIn } = props;
  const { signInUser, handleForgotUser } = functions;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  async function handleOnSubmit(event) {
    event.preventDefault();
    const isLogged = await signInUser(email, password);
    if (isLogged.status) {
      navigate("/tutor/petlist");
    } else {
      setError(isLogged.message);
    }
  }

  useEffect(() => {
    if (isLoggedIn) navigate("/tutor/petlist");
  }, [isLoggedIn, navigate]);

  return (
    <div id="login-page">
      <div className="image-container"></div>
      <div className="login-form">
        <a href="/">
          <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
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
            {/* <div className="remember">
                            <input id="check" type="checkbox"
                                value={remember} onChange={(e) => { setRemember(e.target.value) }} />
                            <label htmlFor="check">Manter conectado</label>
                        </div> */}
            <Button
              type="button"
              transparent
              onClick={() => handleForgotUser(email)}
            >
              Esqueceu sua senha?
            </Button>
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>

          <Link
            to="/tutor/cadastrar"
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              textDecoration: "none",
              color: "#566dea",
              fontWeight: 800,
            }}
          >
            Não possui cadastro? <br />
            então cadastre-se agora mesmo!
          </Link>
        </form>
      </div>
    </div>
  );
}

export default LoginTutor;
