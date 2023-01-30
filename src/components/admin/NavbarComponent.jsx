/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import "../../styles/components/admin/navbar-component.css";

function NavbarComponentHOC() {
  const { props } = useAuth();
  const { user, isLoggedIn } = props;

  if (!user || !isLoggedIn) return <h1>Carregando....</h1>;

  return (
    <ul id="navbar-component">
      <li className="navbrand">
        <img src={logo} alt="Perform" />
      </li>
      <li>
        <div className="text">Olá, {user.name}</div>
      </li>
      <li>
        <NavLink activeClassName="active" to="/admin/contatos" exact>
          Contatos
        </NavLink>
      </li>
      <li>
        <NavLink to="/" exact>
          Sair
        </NavLink>
      </li>
    </ul>
  );
}

function NavbarComponent() {
  return (
    <AuthContextProvider>
      <NavbarComponentHOC />
    </AuthContextProvider>
  );
}

export default NavbarComponent;
