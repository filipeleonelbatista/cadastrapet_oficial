import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import PetHistoryFormPage from './pages/PetHistoryFormPage';
import NotFound from './pages/NotFound';
import LoginAdmin from './pages/admin/LoginAdmin';
import ListContatos from './pages/admin/ListContatos';
import LoginTutor from './pages/tutor/LoginTutor';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact element={<Home />} />
                <Route path="/admin" exact element={<LoginAdmin />} />
                <Route path="/admin/contatos" exact element={<ListContatos />} />
                <Route path="/veterinario" exact element={<LoginPage />} />
                <Route path="/tutor" exact element={<LoginTutor />} />
                <Route path="/historico-pet" exact element={<PetHistoryFormPage />} />
                <Route path="*" element={<NotFound />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;