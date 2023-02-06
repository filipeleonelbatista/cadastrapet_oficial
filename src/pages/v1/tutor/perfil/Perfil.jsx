import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useState } from 'react';
import { FaCamera, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";
import { DataGrid, ptBR } from '@mui/x-data-grid';

dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: 'alguns segundos',
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos"
  }
})

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}


export default function Perfil() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const { props, deleteFunctions, functions } = useAuth();
  const { user } = props;

  console.log("User", user)

  const [selectedImage, setSelectedImage] = useState('');

  return (
    <DrawerComponent title="Perfil">
      <ContainerComponent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={value} onChange={handleChange} aria-label="Painel tutor">
              <Tab label="Informações do Tutor" {...a11yProps(0)} />
              <Tab label="Endereço" {...a11yProps(1)} />
              <Tab label="Contatos de segurança" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 2,
              my: 2
            }}>
              <Typography>As informações do tutor são usadas para encontrar seu pet e outras funcionalidades do sistema</Typography>

              <Box>
                <IconButton color="primary" aria-label="Enviar foto" component="label">
                  <input hidden
                    id='selectedImage'
                    name='selectedImage'
                    accept="image/*"
                    type="file"
                    onChange={(event) => handleFilePreview(event)}
                  />
                  <Avatar sx={{ width: 150, height: 150 }} src={selectedImage} alt="Foto do pet">
                    <FaCamera size={48} />
                  </Avatar>
                </IconButton>
              </Box>
              <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                my: 2
              }}>
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Nome"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Celular/Whats"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="CPF"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Data de nascimento"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Email"
                  value="Teste"
                />
              </Box>
            </Box>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box>
              <Typography>As informações do tutor são usadas para encontrar seu pet e outras funcionalidades do sistema</Typography>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                my: 2
              }}>
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="CEP"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Logradouro"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Número"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Bairro"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="Cidade"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="UF"
                  value="Teste"
                />
                <TextField
                  disabled
                  fullWidth
                  id=""
                  name=""
                  label="País"
                  value="Teste"
                />
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Box>
              <Typography>As informações de contatos de segurança aparecerão caso seu pet esteja perdido e alguem leia a coleira do pet.</Typography>
              <Box sx={{ height: 350, width: '100%', my: 2 }}>
                <DataGrid
                  initialState={{
                    sorting: {
                      sortModel: [{ field: 'created_at', sort: 'desc' }],
                    },
                  }}
                  rows={user?.emergency_contacts}
                  getRowId={(row) => row.created_at}
                  columns={[
                    { field: 'name', headerName: 'Nome', flex: 1 },
                    { field: 'phone', headerName: 'Telefone', flex: 1 },
                    { field: 'email', headerName: 'Email', flex: 1 },
                    { field: 'created_at', headerName: 'Dt. criação', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                    {
                      field: "action",
                      headerName: "Ações",
                      sortable: false,
                      renderCell: (params) => {
                        const handleEditMedicalRecord = (event) => {
                          event.stopPropagation();

                        };

                        return (
                          <>
                            <IconButton size="small" variant="contained" color="error" onClick={() => { }}>
                              <FaTrash />
                            </IconButton>

                            <IconButton size="small" variant="contained" color="success" onClick={handleEditMedicalRecord}>
                              <FaEdit />
                            </IconButton>
                          </>
                        );
                      },
                    },
                  ]}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection={false}
                  disableSelectionOnClick
                  localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
                />
              </Box>
              <Button variant='contained' color="primary" fullWidth startIcon={<FaPlus />}>Adicionar contato</Button>
            </Box>
          </TabPanel>
        </Box>
      </ContainerComponent>
    </DrawerComponent >
  )
}