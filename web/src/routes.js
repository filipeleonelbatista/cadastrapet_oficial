import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import PetHistoryFormPage from "./pages/PetHistoryFormPage";
import NotFound from "./pages/NotFound";
import LoginAdmin from "./pages/admin/LoginAdmin";
import ListContatos from "./pages/admin/ListContatos";
import LoginTutor from "./pages/tutor/LoginTutor";
import PetList from "./pages/tutor/PetList";
import PetProfile from "./pages/tutor/PetProfile";
import PetInfo from "./pages/tutor/PetInfo";
import PetHistory from "./pages/tutor/PetHistory";
import PetVaccineHistory from "./pages/tutor/PetVaccineHistory";
import PetCode from "./pages/tutor/PetCode";
import AddPetHistory from "./pages/tutor/AddPetHistory";
import AddPetVaccineHistory from "./pages/tutor/AddPetVaccineHistory";
import CreatePet from "./pages/tutor/CreatePet";
import TermosECondicoes from "./pages/TermosECondicoes";
import PoliticasDePrivacidade from "./pages/PoliticasDePrivacidade";
import Register from "./pages/tutor/Register";
import { AuthContextProvider } from "./context/AuthContext";

function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/tutor" exact element={<LoginTutor />} />
          <Route path="/tutor/cadastrar" exact element={<Register />} />
          <Route path="/tutor/createpet" exact element={<CreatePet />} />
          <Route path="/tutor/petlist" exact element={<PetList />} />
          <Route path="/tutor/petprofile" exact element={<PetProfile />} />
          <Route path="/tutor/petinfo" exact element={<PetInfo />} />
          <Route path="/tutor/pethistory" exact element={<PetHistory />} />
          <Route
            path="/tutor/petvaccinehistory"
            exact
            element={<PetVaccineHistory />}
          />
          <Route path="/tutor/petcode" exact element={<PetCode />} />
          <Route
            path="/tutor/pethistory/add"
            exact
            element={<AddPetHistory />}
          />
          <Route
            path="/tutor/pethistory/view"
            exact
            element={<AddPetHistory />}
          />
          <Route
            path="/tutor/addpetvaccinehistory"
            exact
            element={<AddPetVaccineHistory />}
          />
        </Switch>
      </AuthContextProvider>
      <Switch>
        <Route path="/" exact element={<Home />} />
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
        <Route path="/admin" exact element={<LoginAdmin />} />
        <Route path="/admin/contatos" exact element={<ListContatos />} />
        <Route path="/veterinario" exact element={<LoginPage />} />
        <Route path="/historico-pet" exact element={<PetHistoryFormPage />} />

        <Route path="*" element={<NotFound />} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
