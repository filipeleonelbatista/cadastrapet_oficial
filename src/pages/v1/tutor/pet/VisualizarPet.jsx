import React from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";

import {
  Avatar, Box, Button, IconButton, TextField, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import { FaCamera, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../hooks/useAuth';

export default function VisualizarPet() {

  const navigate = useNavigate();
  const { props, deleteFunctions, functions } = useAuth();
  const { selectedPet } = props;
  const { deletePet } = deleteFunctions;
  const { updateContextData } = functions;

  const handleDeletePet = async () => {
    if (
      window.confirm(
        "Deseja realmente deletar este registro? Esta ação é irreversível."
      )
    ) {
      await deletePet(selectedPet);
      await updateContextData();
      navigate("/inicio");
    }
  };

  return (
    <DrawerComponent title="Visualizar Pet">
      <ContainerComponent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2">
            Veja aqui as informações do seu Pet
          </Typography>
          <Box>
            <IconButton color="primary" aria-label="Enviar foto" component="label">
              <Avatar sx={{ width: 150, height: 150 }} src={selectedPet?.avatar} alt="Foto do pet">
                <FaCamera size={48} />
              </Avatar>
            </IconButton>
          </Box>

          <TextField
            fullWidth
            disabled
            id="name"
            label="Nome do Pet"
            variant="outlined"
            value={selectedPet?.name}
          />

          <TextField
            fullWidth
            disabled
            id="birth_date"
            label="Data de Nascimento"
            variant="outlined"
            value={dayjs(new Date(selectedPet?.birth_date)).format("DD/MM/YYYY")}
          />

          <TextField
            fullWidth
            disabled
            id="adoption_date"
            label="Data de Adoção"
            variant="outlined"
            value={dayjs(new Date(selectedPet?.adoption_date)).format("DD/MM/YYYY")}
          />

          <TextField
            fullWidth
            disabled
            id="species"
            label="Tipo/Espécie"
            variant="outlined"
            value={selectedPet?.species}
          />

          <TextField
            fullWidth
            disabled
            id="animal_race"
            label="Raça"
            variant="outlined"
            value={selectedPet?.animal_race}
          />

          <TextField
            fullWidth
            disabled
            id="pelage"
            label="Pelagem/Cor"
            variant="outlined"
            value={selectedPet?.pelage}
          />

          <TextField
            fullWidth
            disabled
            id="sex"
            label="Sexo"
            variant="outlined"
            value={selectedPet?.sex}
          />

          <TextField
            fullWidth
            disabled
            id="castration"
            label="Data de Castração"
            variant="outlined"
            value={dayjs(new Date(selectedPet?.castration)).format("DD/MM/YYYY")}
          />

          <TextField
            fullWidth
            disabled
            id="pin_number"
            label="Coleira"
            variant="outlined"
            value={selectedPet?.pin_number}
          />

          <Button type='button' onClick={() => navigate("/tutor/pet/editar")} variant="contained" color="success" startIcon={<FaEdit />}>Editar Pet</Button>
          <Button type='button' onClick={handleDeletePet} variant="contained" color="error" startIcon={<FaTrash />}>Excluir Pet</Button>

        </Box>
      </ContainerComponent>
    </DrawerComponent >
  )
}