import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import PetHistoryFormPage from './pages/PetHistoryFormPage';
import NotFound from './pages/NotFound';
import { AuthContextProvider } from './context/AuthContext';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact element={<Home />} />

                <AuthContextProvider>
                    <Route path="/veterinario" exact element={<LoginPage />} />
                    <Route path="/historico-pet" exact element={<PetHistoryFormPage />} />
                </AuthContextProvider>
                <Route path="*" element={<NotFound />} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;