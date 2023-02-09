import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { DataGrid, ptBR } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { FaEdit, FaEye, FaPlus, FaTrash } from "react-icons/fa";
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";
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

export default function ListarVermifugos() {
  const navigate = useNavigate();
  const { props, setFunctions, functions, deleteFunctions } = useAuth();
  const { selectedPet, medicationList } = props;
  const { setSelectedMedication } = setFunctions;
  const { deleteMedication } = deleteFunctions;
  const { updateContextData } = functions;

  return (
    <DrawerComponent title="Histórico de Vermifugos">
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
              <Typography variant="h5" color="primary">Histórico de Vermifugos e Medicamentos</Typography>
              <Typography variant="body2">Aplicações do <b>{selectedPet?.name}</b></Typography>
            </Box>
            <Button type='button' onClick={() => navigate("/tutor/historico-vermifugos/adicionar")} variant="contained" color="primary" startIcon={<FaPlus />}>Adicionar</Button>
          </Box>
          <Box sx={{ height: 350, width: '100%', mt: 2 }}>
            <DataGrid
              initialState={{
                sorting: {
                  sortModel: [{ field: 'created_at', sort: 'desc' }],
                },
              }}
              rows={medicationList}
              getRowId={(row) => row.uid}
              columns={[
                { field: 'medication', headerName: 'Medicamento', flex: 1 },
                { field: 'medication_receipe', headerName: 'Anexos', width: 80, renderCell: (params) => <Typography variant="caption">{params?.row?.medication_receipe?.length} Anexos</Typography> },
                { field: 'medication_application_date', headerName: 'Dt. Aplicação', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.medication_application_date)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                { field: 'created_at', headerName: 'Dt. criação', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                { field: 'updated_at', headerName: 'Dt. atualização', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.updated_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
                {
                  field: "action",
                  headerName: "Ações",
                  sortable: false,
                  renderCell: (params) => {
                    const handleViewMedicalRecord = (event) => {
                      event.stopPropagation();
                      setSelectedMedication(params.row)
                      navigate("/tutor/historico-vermifugos/visualizar")
                    };

                    const handleEditMedicalRecord = (event) => {
                      event.stopPropagation();
                      setSelectedMedication(params.row)
                      navigate("/tutor/historico-vermifugos/editar")
                    };

                    const handleDelete = async (event) => {
                      event.stopPropagation();
                      if (
                        window.confirm(
                          "Deseja realmente deletar este registro? Esta ação é irreversível."
                        )
                      ) {
                        await deleteMedication(params.row);
                        await updateContextData();
                      }
                    };

                    return (
                      <>
                        <IconButton size="small" variant="contained" color="primary" onClick={handleViewMedicalRecord}>
                          <FaEye />
                        </IconButton>
                        <IconButton size="small" variant="contained" color="success" onClick={handleEditMedicalRecord}>
                          <FaEdit />
                        </IconButton>
                        <IconButton size="small" variant="contained" color="error" onClick={handleDelete}>
                          <FaTrash />
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