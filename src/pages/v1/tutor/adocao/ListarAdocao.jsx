import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { Box, Button, Card, CardMedia, IconButton, Tab, Tabs, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from "react";
import { FaCheckCircle, FaDog, FaDownload, FaEdit, FaEye, FaPlus, FaTimesCircle, FaTrash, FaUpload, FaUsers } from "react-icons/fa";
import logo from '../../../../assets/icon.png';
import { useAuth } from "../../../../hooks/useAuth";

import { DataGrid, ptBR } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";

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
      id={`adoption-tabpanel-${index}`}
      aria-labelledby={`adoption-tab-${index}`}
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
    id: `adoption-tab-${index}`,
    'aria-controls': `adoption-tabpanel-${index}`,
  };
}

export default function ListarAdocao() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();
  const { props, functions, setFunctions } = useAuth();
  const { user } = props;
  const { getAllAdoptionPets, getAllTutors } = functions;
  const { setSelectedAdoptionPet } = setFunctions;

  const [petList, setPetList] = useState([])
  const [tutorList, setTutorList] = useState([])
  const [favoritePetList, setFavoritePetList] = useState([])


  async function loadPets() {
    const allTutorsResponse = await getAllTutors()
    const response = await getAllAdoptionPets()

    response.sort((a, b) => b.created_at - a.created_at)

    if (user.adoption_pets_liked) {
      const adoption_pets_list = response.filter(pet => user.adoption_pets_liked.includes(pet.uid))
      setFavoritePetList(adoption_pets_list)
    }

    setPetList(response)

    const myPets = response.filter(pet => pet.responsable_uid === user.uid)

    const interested_tutors = []

    for (const pet of myPets) {
      const tutor_interested = allTutorsResponse.filter(tutor => pet.users_interested.includes(tutor.uid))
      if (tutor_interested.length > 0) {
        interested_tutors.push({
          ...tutor_interested[0],
          pet_info: pet
        })
      }
    }

    setTutorList(interested_tutors)

  }

  useEffect(() => {
    loadPets()
  }, [])

  return (
    <DrawerComponent title="Adoção">
      <Typography variant="body1">Adicione pets para adoção ou curta pets para adotar.</Typography>

      <Button onClick={() => navigate("/tutor/adocao/adicionar")} variant="contained" sx={{ my: 2 }} startIcon={<FaPlus />}>Adicionar pet para adoção</Button>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={handleChange} aria-label="Painel tutor">
            <Tab label="Pets curtidos" {...a11yProps(0)} />
            <Tab label="Meus pets para adoção" {...a11yProps(1)} />
            <Tab label="Adicionados Recentemente" {...a11yProps(2)} />
            <Tab label="Próximos a mim" {...a11yProps(3)} />
            <Tab label="Todos os pets para adoção" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel component="div" value={value} index={0}>
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
              favoritePetList.length === 0 && (
                <Typography>Curta pets para aparecerem aqui.</Typography>
              )
            }
            {
              favoritePetList.length > 0 && favoritePetList?.map(pet => (
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
        </TabPanel>
        <TabPanel component="div" value={value} index={1}>
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
              petList?.filter(pet => pet.responsable_uid === user.uid).length === 0 && (
                <Typography>Você não adicionou pets ainda.</Typography>
              )
            }
            {
              petList.length > 0 && petList?.filter(pet => pet.responsable_uid === user.uid).map(pet => (
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
          <Typography variant="h6">Tutores que se interessaram pelos pets</Typography>
          <Box sx={{ height: 350, width: '100%', mt: 2 }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'name', sort: 'desc' }],
                },
              }}
              rows={tutorList}
              getRowId={(row) => row.uid}
              columns={[
                {
                  field: 'name', headerName: 'Nome', flex: 1, renderCell: (params) => {
                    return (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CardMedia
                          sx={{
                            width: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            mr: 1
                          }}
                          component="img"
                          src={params.row.avatar === '' ? logo : params.row.avatar}
                          height="50"
                          alt={params.row.name}
                        />
                        <Typography>{params.row.name}</Typography>
                      </Box>
                    )
                  }
                },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'phone', headerName: 'Telefone', flex: 1 },
                {
                  field: 'interesting', headerName: 'Interesse em', flex: 1, renderCell: (params) => {
                    return (
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <CardMedia
                          sx={{
                            width: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            cursor: 'pointer',
                            mr: 1,
                          }}
                          component="img"
                          src={params.row.pet_info.avatar === '' ? logo : params.row.pet_info.avatar}
                          height="50"
                          alt={params.row.pet_info.name}
                        />
                        <Typography>{params.row.pet_info.name}</Typography>
                      </Box>
                    )
                  }
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection={false}
              disableSelectionOnClick
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>

        </TabPanel>
        <TabPanel component="div" value={value} index={2}>
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
              petList.length === 0 && (
                <Typography>Não foram encontrados pets.</Typography>
              )
            }
            {
              petList.length > 0 && petList?.slice(0, 10).map(pet => (
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
        </TabPanel>
        <TabPanel component="div" value={value} index={3}>
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
              petList?.filter(pet => pet.endereco.cidade === user.endereco.cidade).length === 0 && (
                <Typography>Não foram encontrados pets em sua localidade.</Typography>
              )
            }
            {
              petList.length > 0 && petList?.filter(pet => pet.endereco.cidade === user.endereco.cidade).map(pet => (
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
        </TabPanel>
        <TabPanel component="div" value={value} index={4}>
          <Box sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: 'wrap',
            overflowX: 'auto',
            gap: 2,
            my: 2,
            pb: 1
          }}>
            {
              petList.length === 0 && (
                <Typography>Não foram encontrados pets.</Typography>
              )
            }
            {
              petList.length > 0 && petList?.map(pet => (
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
        </TabPanel>
      </Box>
    </DrawerComponent >
  )
}