/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../../styles/components/admin/navbar-component.css';

import logo from '../../assets/admin/logo.png';
import api from '../../services/api';

function NavbarComponent() {
    const history = useNavigate()
    const [load, setLoad] = useState(true);
    const [currentUser, setCurrentUser] = useState([]);

    useEffect(() => {
        async function validateLogin(){
        const data = JSON.parse(localStorage.getItem("@CadastraPet:login"));

        let result;
        try {
            result = await api.get("loginValidate", {
                params: {
                    email: data.email,
                    password: data.password
                }
            });            
        } catch (error) {
            alert("Sua sessão expirou!");
            localStorage.clear();
            history.push("/");
            return;
        }
               
        if((data.loginDate - Date.now) > (data.validade * 86400000 )){            
            alert("Sua sessão expirou!");
            localStorage.clear();
            history.push("/");
            return;
        }
        setCurrentUser(result.data);
        setLoad(false);
        return;
    }
        validateLogin();
    }, [])

    if(!load){
        return (
            <ul id="navbar-component">
                <li className="navbrand">                
                    <img src={logo} alt="Perform" />
                </li>
                <li>                
                    <div className="text">
                        Olá, {currentUser[0].name}
                    </div>
                </li>
                <li>
                    <NavLink activeClassName="active" to="/admin/contatos" exact>Contatos</NavLink>
                </li>
                <li>
                    <NavLink to="/" exact>Sair</NavLink>
                </li>
            </ul>
        )
    }else{
        return (<h1>Carregando....</h1>)
    }
    
}

export default NavbarComponent;