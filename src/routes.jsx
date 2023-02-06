import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import Links from "./pages/Links";
import NotFound from "./pages/NotFound";
import Pitch from "./pages/Pitch";
import PoliticasDePrivacidade from "./pages/PoliticasDePrivacidade";
import TermosECondicoes from "./pages/TermosECondicoes";
import Dashboard from "./pages/v1/Dashboard";
import Login from "./pages/v1/Login";
import Register from "./pages/v1/Register";
import AdicionarHistorico from "./pages/v1/tutor/historico/AdicionarHistorico";
import EditarHistorico from "./pages/v1/tutor/historico/EditarHistorico";
import ListarHistoricos from "./pages/v1/tutor/historico/ListarHistoricos";
import VisualizarHistorico from "./pages/v1/tutor/historico/VisualizarHistorico";
import Perfil from "./pages/v1/tutor/perfil/Perfil";
import AdicionarPet from "./pages/v1/tutor/pet/AdicionarPet";
import CodigoPet from "./pages/v1/tutor/pet/CodigoPet";
import EditarPet from "./pages/v1/tutor/pet/EditarPet";
import LocalizarPet from "./pages/v1/tutor/pet/LocalizarPet";
import VisualizarPet from "./pages/v1/tutor/pet/VisualizarPet";
import Veterinario from "./pages/Veterinario";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/pitch" exact element={<Pitch />} />
        <Route path="/links" exact element={<Links />} />
        <Route path="/tutor/cadastrar" exact element={<Register />} />
        <Route path="/veterinario/cadastrar" exact element={<Register />} />
        <Route path="/veterinario" exact element={<Veterinario />} />
        <Route
          path="/termos-e-condicoes"
          exact
          element={<TermosECondicoes />}
        />
        <Route
          path="/politicas-de-privacidade"
          exact
          element={<PoliticasDePrivacidade />}
        />
        <Route path="/entrar" exact element={<Login />} />

        <Route path="/inicio" exact element={<Dashboard />} />
        <Route path="/tutor/pet/adicionar" exact element={<AdicionarPet />} />
        <Route path="/tutor/pet/editar" exact element={<EditarPet />} />
        <Route path="/tutor/pet/visualizar" exact element={<VisualizarPet />} />
        <Route path="/tutor/historico-medico" exact element={<ListarHistoricos />} />
        <Route path="/tutor/historico-medico/visualizar" exact element={<VisualizarHistorico />} />
        <Route path="/tutor/historico-medico/adicionar" exact element={<AdicionarHistorico />} />
        <Route path="/tutor/historico-medico/editar" exact element={<EditarHistorico />} />
        <Route path="/tutor/perfil" exact element={<Perfil />} />
        <Route path="/codigo-pet" exact element={<CodigoPet />} />
        <Route path="/localizar-pet" exact element={<LocalizarPet />} />
        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
