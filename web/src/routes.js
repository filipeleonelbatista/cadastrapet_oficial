import React from "react";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ListaMensagens from "./pages/admin/ListaMensagens";
import ListContatos from "./pages/admin/ListContatos";
import LoginAdmin from "./pages/admin/LoginAdmin";
import Home from "./pages/Home";
import LocalizaPet from "./pages/LocalizaPet";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PoliticasDePrivacidade from "./pages/PoliticasDePrivacidade";
import Register from "./pages/Register";
import TermosECondicoes from "./pages/TermosECondicoes";
import AddPetHistory from "./pages/tutor/AddPetHistory";
import AddPetVaccineHistory from "./pages/tutor/AddPetVaccineHistory";
import CreatePet from "./pages/tutor/CreatePet";
import PetCode from "./pages/tutor/PetCode";
import PetHistory from "./pages/tutor/PetHistory";
import PetInfo from "./pages/tutor/PetInfo";
import PetList from "./pages/tutor/PetList";
import PetProfile from "./pages/tutor/PetProfile";
import PetVaccineHistory from "./pages/tutor/PetVaccineHistory";
import TutorLocalizaPet from "./pages/tutor/TutorLocalizaPet";
import TutorProfile from "./pages/tutor/TutorProfile";
import MedicalAppointmenmt from "./pages/vet/MedicalAppointment";
import MedicationHistory from "./pages/vet/MedicationHistory";
import VaccineHistory from "./pages/vet/VaccineHistory";
import VetMedicalHistory from "./pages/vet/VetMedicalHistory";
import VetMedicationHistory from "./pages/vet/VetMedicationHistory";
import VetProfile from "./pages/vet/VetProfile";
import VetVaccineHistory from "./pages/vet/VetVaccineHistory";
import Veterinario from "./pages/Veterinario";

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
          <Route path="/entrar" exact element={<Login />} />
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
          <Route path="/admin" exact element={<LoginAdmin />} />
          <Route path="/admin/contatos" exact element={<ListContatos />} />
          <Route path="/admin/listamsg" exact element={<ListaMensagens />} />

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
            path="/veterinario/medicalappointment/add"
            exact
            element={<MedicalAppointmenmt />}
          />
          <Route
            path="/veterinario/medicalappointment/view"
            exact
            element={<MedicalAppointmenmt />}
          />
          <Route
            path="/veterinario/vaccinehistory/view"
            exact
            element={<VaccineHistory />}
          />
          <Route
            path="/veterinario/vaccinehistory/add"
            exact
            element={<VaccineHistory />}
          />
          <Route
            path="/veterinario/vetvaccinehistory"
            exact
            element={<VetVaccineHistory />}
          />
          <Route
            path="/veterinario/vetmedicationhistory"
            exact
            element={<VetMedicationHistory />}
          />
          <Route
            path="/veterinario/medicationhistory/add"
            exact
            element={<MedicationHistory />}
          />
          <Route
            path="/veterinario/medicationhistory/view"
            exact
            element={<MedicationHistory />}
          />
          <Route path="*" element={<NotFound />} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;
