import { Box, Button, Card, CardMedia, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from "react";
import { FaDog, FaDownload, FaEdit, FaEye, FaPaw, FaTrash, FaUpload, FaUsers } from "react-icons/fa";
import logo from '../../../assets/icon.png';
import ContainerComponent from "../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../components/v1/DrawerComponent";
import { useAuth } from "../../../hooks/useAuth";

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

export default function Users() {
  const { props, databaseFunctions, functions } = useAuth();
  const { user } = props;
  const { updateDatabase, downloadDatabase, verifyPets, updateUserObject, updatePetObject } = databaseFunctions;
  const { getAllTutors } = functions;

  const [tutorList, setTutorList] = useState([])

  const [Database, setDatabase] = useState([]);

  async function handleDownloadDatabase() {
    const database = await downloadDatabase();
    const textFile = new Blob([
      [JSON.stringify(database)],
      { type: "text/plain" },
    ]);

    setDatabase(URL.createObjectURL(textFile));
  }

  async function handleUploadDatabase() {
    await updateDatabase();
  }

  async function loadTutors() {
    const response = await getAllTutors()

    response.sort((a, b) => b.created_at - a.created_at)

    setTutorList(response)
  }

  useEffect(() => {
    handleDownloadDatabase()
    loadTutors()
  }, [])

  return (
    <DrawerComponent title="Usuários">
      <Typography sx={{ my: 2 }} variant="h5">Bem vindo, {user?.name} 👋</Typography>
      <Typography sx={{ my: 2 }} variant="body2">Você está na àrea de Administração do CadastraPet</Typography>
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
          sx={{
            p: 2,
            width: 150,
            minWidth: 150,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            position: "relative",
            overflow: "hidden",
            border: 'none',
            gap: 1,
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '50%',

            }}
          >
            <FaUsers color="#FFF" size={28} />
          </Box>
          <Typography variant="body2"><b>Total de Usuários</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{tutorList.length}</b></Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            width: 150,
            minWidth: 150,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            position: "relative",
            overflow: "hidden",
            border: 'none',
            gap: 1,
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '50%',

            }}
          >
            <FaUsers color="#FFF" size={28} />
          </Box>
          <Typography variant="body2"><b>Total de <br /> Pets</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{tutorList.reduce((acumulador, tutor) => acumulador + tutor.pets.length, 0)}</b></Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            width: 150,
            minWidth: 150,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            position: "relative",
            overflow: "hidden",
            border: 'none',
            gap: 1,
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '50%',

            }}
          >
            <FaUsers color="#FFF" size={28} />
          </Box>
          <Typography variant="body2"><b>Usuários com pets</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{tutorList.filter(tutor => tutor.pets.length > 0).length}</b></Typography>
        </Card>
        <Card
          sx={{
            p: 2,
            width: 150,
            minWidth: 150,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            position: "relative",
            overflow: "hidden",
            border: 'none',
            gap: 1,
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: '50%',

            }}
          >
            <FaUsers color="#FFF" size={28} />
          </Box>
          <Typography variant="body2"><b>Média Pets/Usuário</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{parseFloat(tutorList.reduce((acumulador, tutor) => acumulador + tutor.pets.length, 0) / tutorList.filter(tutor => tutor.pets.length > 0).length).toFixed(2).replace(".", ",")}</b></Typography>
        </Card>
      </Box>

      <Typography variant="h6">Usuários novos</Typography>
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
          tutorList.length > 0 && tutorList?.slice(0, 10).map(tutor => (
            <Card
              onClick={() => { }}
              key={tutor?.uid}
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
                src={tutor?.avatar === '' ? logo : tutor?.avatar}
                alt={tutor?.name}
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
                <Typography variant="body1" color="#FFF"><b>{tutor?.name}</b></Typography>
                {
                  tutor?.birth_date && (
                    <Typography variant="caption" color="#FFF">
                      <b>
                        {dayjs().from(dayjs(new Date(tutor?.birth_date)), true)}
                      </b>
                    </Typography>
                  )
                }
              </Box>
            </Card>
          ))
        }

      </Box>

      <ContainerComponent>
        {
          true && (
            <>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={updateUserObject}
                startIcon={<FaDownload />}
              >
                Atualizar estrutura de dados dos usuários
              </Button>

              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={updatePetObject}
                startIcon={<FaPaw />}
              >
                Atualizar estrutura de dados dos pets
              </Button></>

          )
        }
        {
          false && (
            <>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                component="a"
                href={Database}
                download="database.json"
                target="_blank"
                startIcon={<FaDownload />}
              >
                Download Database
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={handleUploadDatabase}
                startIcon={<FaUpload />}
              >
                Upload Database
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={verifyPets}
                startIcon={<FaDog />}
              >
                Limpar pets
              </Button>
            </>
          )
        }

        <Typography variant="h6">Todos os usuários</Typography>
        <Box sx={{ height: 650, width: '100%', mt: 2 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'created_at', sort: 'desc' }],
              },
            }}
            rows={tutorList}
            getRowId={(row) => row.uid}
            columns={[
              {
                field: 'avatar', headerName: 'Avatar', flex: 1, renderCell: (params) => {
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
                        }}
                        component="img"
                        src={params.row.avatar === '' ? logo : params.row.avatar}
                        height="50"
                        alt={params.row.name}
                      />
                    </Box>
                  )
                }
              },
              { field: 'name', headerName: 'Nome do Tutor', flex: 1 },
              { field: 'email', headerName: 'Email', flex: 1 },
              { field: 'phone', headerName: 'Telefone', flex: 1 },
              { field: 'pets', headerName: 'Quant. Pets', width: 50, renderCell: (params) => <Typography variant="caption">{params?.row?.pets?.length} Pets</Typography> },
              { field: 'created_at', headerName: 'Dt. criação', width: 80, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY")}</Typography> },
              {
                field: "action",
                headerName: "Ações",
                sortable: false,
                renderCell: (params) => {
                  const handleViewMedicalRecord = (event) => {
                    event.stopPropagation();
                  };

                  const handleEditMedicalRecord = (event) => {
                    event.stopPropagation()
                  };
                  return (
                    <>
                      <IconButton size="small" variant="contained" color="error" onClick={handleEditMedicalRecord}>
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
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection={false}
            disableSelectionOnClick
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          />
        </Box>

      </ContainerComponent>
    </DrawerComponent >
  )
}