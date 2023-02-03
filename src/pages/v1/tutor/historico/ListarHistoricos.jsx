import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

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

export default function ListarHistoricos() {
  const navigate = useNavigate();
  const { props, setFunctions } = useAuth();
  const { selectedPet, medicalHistoryList } = props;
  const { setSelectedMedicalHistory } = setFunctions;

  return (
    <DrawerComponent title="Histórico médico">
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
        <Box sx={{ mt: 2 }}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" color="primary">Históricos médicos</Typography>
              <Typography variant="body2">Históricos medicos do <b>{selectedPet?.name}</b></Typography>
            </Box>
            <Button type='button' onClick={() => navigate("/tutor/historico-medico/adicionar")} variant="contained" color="primary" startIcon={<FaPlus />}>Adicionar</Button>
          </Box>
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
      </ContainerComponent>
    </DrawerComponent >
  )
}