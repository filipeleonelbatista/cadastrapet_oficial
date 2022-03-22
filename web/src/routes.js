import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Home from "./pages/Home";
import PetHistoryFormPage from "./pages/vet/PetHistoryFormPage";
import NotFound from "./pages/NotFound";
import LoginAdmin from "./pages/admin/LoginAdmin";
import ListContatos from "./pages/admin/ListContatos";
import Login from "./pages/Login";
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
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import TutorProfile from "./pages/tutor/TutorProfile";
import LocalizaPet from "./pages/LocalizaPet";
import TutorLocalizaPet from "./pages/tutor/TutorLocalizaPet";
import ListaMensagens from "./pages/admin/ListaMensagens";
import VetProfile from "./pages/vet/VetProfile";
import VetMedicalHistory from "./pages/vet/VetMedicalHistory";
import VetMedicationHistory from "./pages/vet/VetMedicationHistory";
import VetVaccineHistory from "./pages/vet/VetVaccineHistory";

function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/localizapet/:id" exact element={<LocalizaPet />} />
          <Route
            path="/tutor/localizapet"
            exact
            element={<TutorLocalizaPet />}
          />
          <Route path="/tutor" exact element={<Login />} />
          <Route path="/tutor/cadastrar" exact element={<Register />} />
          <Route path="/tutor/createpet" exact element={<CreatePet />} />
          <Route path="/tutor/petlist" exact element={<PetList />} />
          <Route path="/tutor/petprofile" exact element={<PetProfile />} />
          <Route
            path="/tutor/tutorprofile/edit"
            exact
            element={<TutorProfile />}
          />
          <Route
            path="/tutor/tutorprofile/view"
            exact
            element={<TutorProfile />}
          />
          <Route path="/tutor/petinfo/view" exact element={<PetInfo />} />
          <Route path="/tutor/petinfo/edit" exact element={<PetInfo />} />
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
            path="/tutor/petvaccinehistory/add"
            exact
            element={<AddPetVaccineHistory />}
          />
          <Route
            path="/tutor/petvaccinehistory/view"
            exact
            element={<AddPetVaccineHistory />}
          />
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
          <Route path="/admin/listamsg" exact element={<ListaMensagens />} />

          <Route path="/veterinario" exact element={<Login />} />
          <Route path="/veterinario/cadastrar" exact element={<Register />} />
          <Route
            path="/veterinario/vetprofile"
            exact
            element={<VetProfile />}
          />
          <Route
            path="/veterinario/vetmedicalhistory"
            exact
            element={<VetMedicalHistory />}
          />
          <Route
            path="/veterinario/vetmedicationhistory"
            exact
            element={<VetMedicationHistory />}
          />
          <Route
            path="/veterinario/vetvaccinehistory"
            exact
            element={<VetVaccineHistory />}
          />
          <Route
            path="/veterinario/pethistory/view"
            exact
            element={<PetHistoryFormPage />}
          />
          <Route
            path="/veterinario/pethistory/add"
            exact
            element={<PetHistoryFormPage />}
          />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
