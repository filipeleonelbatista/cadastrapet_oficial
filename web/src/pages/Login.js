import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/admin/logo.png";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import "../styles/pages/login-page.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { props, functions } = useAuth();
  const { isLoggedIn, user } = props;
  const { signInUser, handleForgotUser } = functions;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleOnSubmit() {
    const isLogged = await signInUser(email, password);
    if (isLogged.status) {
      if (isLogged.user.user_role === "tutor") navigate("/tutor/petlist");
      if (isLogged.user.user_role === "veterinario")
        navigate("/veterinario/vetprofile");
    } else {
      setError(isLogged.message);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (user) {
        if (user.user_role === "tutor") navigate("/tutor/petlist");
        if (user.user_role === "veterinario")
          navigate("/veterinario/vetprofile");
      }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div id="login-page">
      <div className="image-container"></div>
      <div className="login-form">
        <a href="/">
          <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
        </a>
        <h1>Bem vindo novamente</h1>
        <p>Entre para continuar usando o sistema</p>
        <form>
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
            <Button
              type="button"
              transparent
              onClick={() => handleForgotUser(email)}
            >
              Esqueceu sua senha?
            </Button>
          </div>
          <button className="login-btn" type="button" onClick={handleOnSubmit}>
            Login
          </button>

          <Link
            to={`${location.pathname}/cadastrar`}
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

export default Login;
