import { Box, Button, Card, CardMedia, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useEffect, useState } from "react";
import { FaCheckCircle, FaDog, FaDownload, FaEdit, FaEye, FaTimesCircle, FaTrash, FaUpload, FaUsers } from "react-icons/fa";
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
export default function Pets() {
  const { props, functions } = useAuth();
  const { user } = props;
  const { getAllPets } = functions;

  const [petList, setPetList] = useState([])


  async function loadPets() {
    const response = await getAllPets()

    response.sort((a, b) => b.created_at - a.created_at)

    setPetList(response)
  }

  useEffect(() => {
    loadPets()
  }, [])

  return (
    <DrawerComponent title="Pets">
      <Typography variant="h5">Bem vindo, {user?.name} 👋</Typography>
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
          <Typography variant="body2"><b>Total de  <br />Pets</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{petList.length}</b></Typography>
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
          <Typography variant="body2"><b>Pets com Historicos</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{petList.filter(pet => pet.events.length > 0).length}</b></Typography>
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
          <Typography variant="body2"><b>Pets com Vacinas</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{petList.filter(pet => pet.vaccines.length > 0).length}</b></Typography>
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
          <Typography variant="body2"><b>Pets com Medicamentos</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{petList.filter(pet => pet.medications.length > 0).length}</b></Typography>
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
          <Typography variant="body2"><b>Pets com <br />Coleira</b></Typography>
          <Typography variant="h4" textAlign="right"><b>{petList.filter(pet => pet.pin_number !== 'Sem Coleira').length}</b></Typography>
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
          petList.length > 0 && petList?.slice(0, 10).map(pet => (
            <Card
              onClick={() => { }}
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
      <ContainerComponent>
        <Typography variant="h6">Todos os usuários</Typography>
        <Box sx={{ height: 650, width: '100%', mt: 2 }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: 'created_at', sort: 'desc' }],
              },
            }}
            rows={petList}
            getRowId={(row) => row.uid}
            columns={[
              {
                field: 'avatar', headerName: 'Avatar', width: 100, renderCell: (params) => {
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
              { field: 'name', headerName: 'Nome do pet', flex: 1 },
              { field: 'birth_date', headerName: 'Dt. Nasccimento', width: 80, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.birth_date)).format("DD/MM/YYYY")}</Typography> },
              { field: 'created_at', headerName: 'Dt. criação', width: 80, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY")}</Typography> },
              { field: 'pin_number', headerName: 'Coleira', width: 60, renderCell: (params) => params.row.pin_number === 'Sem Coleira' || params.row.pin_number === '' ? <FaTimesCircle color="red" size={24} /> : <FaCheckCircle color="green" size={24} /> },
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