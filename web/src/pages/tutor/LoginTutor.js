import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/admin/logo.png';
// import api from "../../services/api";
import '../../styles/pages/tutor/login-page.css';


function LoginTutor() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error] = useState("");

    async function handleOnSubmit(event) {
        event.preventDefault();
        navigate("/tutor/petlist");
        // if ((email === "") || (password === "")) {
        //     setError("Opa, faltou alguma informação!");
        //     return;
        // }
        // let result;

        // try {
        //     result = await api.get("login", {
        //         params: {
        //             email,
        //             password
        //         }
        //     });
        // } catch (error) {
        //     setError("Houve um problema ao comunicar com o servidor, tente mais tarde!");
        //     return;
        // }

        // if (result.data.success) {
        //     if (remember) {
        //         const data = JSON.stringify({
        //             email,
        //             password: result.data.usuario[0].password,
        //             validade: 7,
        //             loginDate: Date.now()
        //         })
        //         localStorage.setItem("@CadastraPet:login", data);
        //     } else {
        //         const data = JSON.stringify({
        //             email,
        //             password: result.data.usuario[0].password,
        //             validade: 1,
        //             loginDate: Date.now()
        //         })
        //         localStorage.setItem("@CadastraPet:login", data);

        //     }
        //     navigate("/admin/contatos");
        // } else {
        //     setError("Usuario ou senha inválidos!");
        //     return;
        // }


    }
    return (
        <div id="login-page">
            <div className="image-container">

            </div>
            <div className="login-form">
                <a href="/">
                    <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
                </a>
                <h1>Bem vindo novamente</h1>
                <p>Entre para continuar usando o sistema</p>
                <form onSubmit={(e) => {
                    handleOnSubmit(e)
                }}>
                    <div className="error">
                        {error}
                    </div>
                    <div className="input-container">
                        <input id="email" type="text"
                            value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-container">
                        <input id="password" type="password"
                            value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <label htmlFor="password">Senha</label>
                    </div>
                    <div className="input-group">
                        <div className="remember">
                            <input id="check" type="checkbox"
                                value={remember} onChange={(e) => { setRemember(e.target.value) }} />
                            <label htmlFor="check">Manter conectado</label>
                        </div>
                        <Link to="/tutor/esqueci-a-senha">Esqueceu sua senha?</Link>
                    </div>
                    <button className="login-btn" type="submit">Login</button>

                    <Link to="/tutor/cadastrar" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        textDecoration: 'none',
                        color: '#566dea',
                        fontWeight: 800,
                    }}>Não possui cadastro? <br />então cadastre-se agora mesmo!</Link>
                </form>
            </div>
        </div>
    );
}

export default LoginTutor;