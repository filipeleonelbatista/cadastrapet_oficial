import { Avatar, Box, Button, Card, CardMedia, Modal, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

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

export default function VisualizarVacina() {
  const navigate = useNavigate();
  const { props, deleteFunctions, functions } = useAuth();
  const { selectedPet, selectedVaccine } = props;
  const { deleteVaccine } = deleteFunctions;
  const { updateContextData } = functions;

  const handleDelete = async () => {
    if (
      window.confirm(
        "Deseja realmente deletar este registro? Esta ação é irreversível."
      )
    ) {
      await deleteVaccine(selectedVaccine);
      await updateContextData();
      navigate("/tutor/carteira-vacinacao");
    }
  };

  const [selectedAttachment, setSelectedAttachment] = useState('')

  return (
    <>
      <Modal
        open={selectedAttachment !== ''}
        onClose={() => setSelectedAttachment('')}

        aria-labelledby="attachment"
        aria-describedby="attachment-desc"
        sx={{
          display: 'flex',
          alignItems: "center",
          justifyContent: 'center',
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          src={selectedAttachment}
          alt="Anexo"
          sx={{
            width: '90%',
            height: '90%',
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            outline: 'none',
            border: 'none',
            zIndex: 10,
            borderRadius: 2,
            boxShadow: 3
          }}
        />
      </Modal>
      <DrawerComponent title="Visualizar Vacina">
        <Box>
          <Typography variant="caption">Pet selecionado:</Typography>
          <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedPet?.avatar} alt={selectedPet.name} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>{selectedPet?.name}</Typography>
              <Typography variant="caption">
                {dayjs().from(dayjs(new Date(selectedPet?.birth_date)), true)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <ContainerComponent>
          <Box sx={{
            display: "flex",
            alignItems: "flex-start",
            gap: 2,
            mb: 4,
          }}>
            <Button type='button' onClick={() => navigate("/tutor/carteira-vacinacao/editar")} variant="contained" color="success" startIcon={<FaEdit />}>Editar</Button>
            <Button type='button' onClick={handleDelete} variant="contained" color="error" startIcon={<FaTrash />}>Excluir</Button>
          </Box>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

            <TextField
              fullWidth
              disabled
              id="vaccine"
              label="Vacina"
              variant="outlined"
              value={selectedVaccine?.vaccine}
            />

            <TextField
              fullWidth
              disabled
              id="vaccineLab"
              label="Laboratório da vacina"
              variant="outlined"
              value={selectedVaccine?.vaccineLab}
            />

            <TextField
              fullWidth
              disabled
              id="doctorId"
              label="CRMV do aplicador ou responsável pelo procedimento"
              variant="outlined"
              value={selectedVaccine?.doctorId}
            />

            <TextField
              fullWidth
              disabled
              id="vaccine_application_date"
              label="Data de aplicação"
              variant="outlined"
              value={dayjs(selectedVaccine?.vaccine_application_date).format("DD/MM/YYYY")}
            />

            <TextField
              fullWidth
              disabled
              id="vaccine_next_application_date"
              label="Data da próxima aplicação"
              variant="outlined"
              value={dayjs(selectedVaccine?.vaccine_next_application_date).format("DD/MM/YYYY")}
            />

            <Typography variant="h6">Anexos</Typography>
            <Typography variant="body1">Adicione a imagens da vacina contendo o máximo de informações possível.</Typography>
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
                selectedVaccine?.vaccine_receipt.map((anexo, index) => (
                  <Card
                    onClick={() => setSelectedAttachment(anexo)}
                    key={index}
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
                      outline: 'none',
                      border: 'none',
                      transition: '0.2s',
                      boxShadow: 3,
                      borderRadius: 2,

                      '&:hover': {
                        filter: 'brightness(0.8)'
                      }
                    }}>
                    <CardMedia
                      component="img"
                      src={anexo}
                      alt="Anexo"
                      sx={{
                        width: 150,
                        height: 200,
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: "center",
                        outline: 'none',
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
                      <Typography variant="body1" color="#FFF"><b>Anexo {index + 1}</b></Typography>
                    </Box>
                  </Card>
                ))
              }
            </Box>
          </Box>
        </ContainerComponent>
      </DrawerComponent >
    </>
  )
}