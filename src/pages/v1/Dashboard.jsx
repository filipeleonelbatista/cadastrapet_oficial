import { Box, Button, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FaDog, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import ContainerComponent from "../../components/v1/ContainerComponent";
import DrawerComponent from "../../components/v1/DrawerComponent";
import { useAuth } from "../../hooks/useAuth";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

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

export default function Dashboard() {
  const navigate = useNavigate();
  const { props, setFunctions, functions } = useAuth();
  const { user, petList, selectedPet, medicalHistoryList } = props;
  const { handleSetSelectedPet, setSelectedMedicalHistory, setSelectedAdoptionPet } = setFunctions;
  const { getAllAdoptionPets } = functions;

  const [position, setPosition] = useState(selectedPet?.currentLocation);
  const [petAdoptionList, setPetAdoptionList] = useState([])

  if (!position) {
    setPosition([-29.9357, -51.0166]);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    });
  }

  const loadedAdoptionPetList = async () => {
    const response = await getAllAdoptionPets()

    response.sort((a, b) => b.created_at - a.created_at)

    if (user.adoption_pets_liked && user.adoption_pets_liked.length > 0) {
      const adoption_pets_list = response.filter(pet => user.adoption_pets_liked.includes(pet.uid))
      setFavoritePetList(adoption_pets_list)
    }

    setPetAdoptionList(response)
  }

  useEffect(() => {
    if (petList.length > 0) {
      if (!selectedPet) {
        handleSetSelectedPet(petList[0])
      }
    }
  }, [petList.length])

  useEffect(() => {
    loadedAdoptionPetList();
  }, [])

  return (
    <DrawerComponent title="Inicio">
      <Typography variant="h5">Bem vindo, {user?.name} 👋</Typography>

      <Typography variant="h6">Seus pets</Typography>
      <Box sx={{
        display: "flex",
        alignItems: "flex-start",
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: 2,
        my: 2,
        pb: 1
      }}>
        <Card
          onClick={() => navigate('/tutor/pet/adicionar')}
          component="button" sx={{
            border: '2px dashed #1976d2',
            p: 2,
            width: 150,
            minWidth: 150,
            height: 200,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Box sx={{
              border: '2px dashed #1976d2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: "50%",
            }}>
              <FaPlus color="#1976d2" />
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }} color="#1976d2">Adicionar Pet</Typography>
          </Box>
        </Card>
        {
          petList.length > 0 && petList?.map(pet => (
            <Card
              onClick={() => handleSetSelectedPet(pet)}
              key={pet?.uid}
              component="button"
              sx={{
                p: 2,
                width: 150,
                minWidth: 150,
                height: 200,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                border: 'none',
                transition: '0.2s',

                '&:hover': {
                  filter: 'brightness(0.8)'
                }
              }}>
              <CardMedia
                component="img"
                src={pet?.avatar}
                alt="Doguinho"
                sx={{
                  width: 150,
                  height: 200,
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 10,
                }}
              />
              <Box
                sx={{
                  width: 150,
                  height: 200,
                  display: 'flex',
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "absolute",
                  zIndex: 15,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(148,148,148,0) 55%, rgba(0,0,0,1) 100%)',
                  pb: 1,
                }}
              >
                <Typography variant="body1" color="#FFF"><b>{pet?.name}</b></Typography>
                <Typography variant="caption" color="#FFF">
                  <b>
                    {dayjs().from(dayjs(new Date(pet?.birth_date)), true)}
                  </b>
                </Typography>
              </Box>
              {
                selectedPet?.uid === pet?.uid && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      position: "absolute",
                      zIndex: 15,
                      py: 0.5,
                      px: 1,
                      borderRadius: 12,
                      backgroundColor: '#2fcd2f',
                      top: 8,
                      right: 8,
                    }}
                  >
                    <Typography variant="caption" color="#FFF"><b>Selecionado</b></Typography>
                  </Box>
                )
              }
            </Card>
          ))
        }
      </Box>
      <ContainerComponent>
        {
          selectedPet?.pin_number === 'Sem Coleira'
            ? (
              <Box sx={{ width: '100%', display: "flex", flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Typography>Seu pet não possui coleria localizadora?</Typography>
                <Button variant="contained" color="primary">Comprar coleira</Button>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" color="primary">Localização do seu pet</Typography>
                <Typography variant="body2">Ultimo local onde sua Tag da coleira foi lida ou a posição do rastreador</Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 2,
                    mt: 2,
                    overflow: 'hidden',
                  }}
                >
                  <MapContainer
                    key="pet-location"
                    id="pet-location"
                    center={[-29.9357, -51.0166]}
                    zoom={15}
                    style={{ width: "100%", height: "100%", zIndex: 1 }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[-29.9357, -51.0166]}>
                      <Popup>"Teste"</Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              </Box>
            )
        }

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="primary">Históricos médicos</Typography>
          <Typography variant="body2">Históricos medicos do pet selecionado</Typography>
          <Box sx={{ height: 350, width: '100%', mt: 2 }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'created_at', sort: 'desc' }],
                },
              }}
              rows={medicalHistoryList}
              getRowId={(row) => row.uid}
              columns={[
                { field: 'title', headerName: 'Titulo', flex: 1 },
                { field: 'notes', headerName: 'Notas', flex: 1 },
                { field: 'attachment', headerName: 'Anexos', width: 80, renderCell: (params) => <Typography variant="caption">{params.row.attachment.length} Anexos</Typography> },
                { field: 'created_at', headerName: 'Dt. criação', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                { field: 'updated_at', headerName: 'Dt. atualização', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.updated_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                {
                  field: "action",
                  headerName: "Ações",
                  sortable: false,
                  renderCell: (params) => {
                    const handleViewMedicalRecord = (event) => {
                      event.stopPropagation();
                      setSelectedMedicalHistory(params.row)
                      navigate("/tutor/historico-medico/visualizar")
                    };

                    const handleEditMedicalRecord = (event) => {
                      event.stopPropagation();
                      setSelectedMedicalHistory(params.row)
                      navigate("/tutor/historico-medico/editar")
                    };
                    return (
                      <>
                        <IconButton size="small" variant="contained" color="primary" onClick={handleViewMedicalRecord}>
                          <FaEye />
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
        </Box>

        {
          false && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h5" color="primary">Petshops/Clinicas Próximas</Typography>
              <Box
                sx={{
                  width: '100%',
                  height: 300,
                  borderRadius: 2,
                  mt: 2,
                  overflow: 'hidden',
                }}
              >
                <MapContainer
                  key="pet-location"
                  id="pet-location"
                  center={[-29.9377, -51.0176]}
                  zoom={15}
                  style={{ width: "100%", height: "100%", zIndex: 1 }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[-29.9357, -51.0166]}>
                    <Popup>Local 1</Popup>
                  </Marker>
                  <Marker position={[-29.9386, -51.0185]}>
                    <Popup>Local 2</Popup>
                  </Marker>
                </MapContainer>
              </Box>
            </Box>
          )
        }

        <Box sx={{ mt: 2 }}>
          <Typography variant="h5" color="primary">Pets para adoção</Typography>
          <Typography variant="body1">Pets proximos a você.</Typography>
          {
            petAdoptionList?.filter(pet => pet.endereco.cidade === user.endereco.cidade).length === 0 && (
              <Typography sx={{ mt: 2 }}>Não foram encontrados pets em sua localidade.</Typography>
            )
          }
          <Box sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: 'nowrap',
            overflowX: 'auto',
            gap: 2,
            my: 2,
            pb: 1
          }}>
            {
              petAdoptionList.length > 0 && petAdoptionList?.filter(pet => pet.endereco.cidade === user.endereco.cidade).slice(0, 10).map(pet => (
                <Card
                  onClick={() => {
                    setSelectedAdoptionPet(pet)
                    navigate("/tutor/adocao/visualizar")
                  }}
                  key={pet?.uid}
                  component="button"
                  sx={{
                    p: 2,
                    width: 150,
                    minWidth: 150,
                    height: 200,
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                    border: 'none',
                    transition: '0.2s',
                    cursor: 'pointer',

                    '&:hover': {
                      filter: 'brightness(0.8)'
                    }
                  }}>
                  <CardMedia
                    component="img"
                    src={pet?.avatar === '' ? logo : pet?.avatar}
                    alt={pet?.name}
                    sx={{
                      width: 150,
                      height: 200,
                      display: 'flex',
                      alignItems: "center",
                      justifyContent: "center",
                      position: "absolute",
                      zIndex: 10,
                    }}
                  />
                  <Box
                    sx={{
                      width: 150,
                      height: 200,
                      display: 'flex',
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      position: "absolute",
                      zIndex: 15,
                      background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(148,148,148,0) 55%, rgba(0,0,0,1) 100%)',
                      pb: 1,
                    }}
                  >
                    <Typography variant="body1" color="#FFF"><b>{pet?.name}</b></Typography>
                    {
                      pet?.birth_date && (
                        <Typography variant="caption" color="#FFF">
                          <b>
                            {dayjs().from(dayjs(new Date(pet?.birth_date)), true)}
                          </b>
                        </Typography>
                      )
                    }
                  </Box>
                </Card>
              ))
            }
          </Box>
          <Button onClick={() => navigate("/tutor/adocao")} variant="contained" color="primary" startIcon={<FaDog />}>Ver todos os pets para adoção</Button>
        </Box>


      </ContainerComponent>
    </DrawerComponent >
  )
}