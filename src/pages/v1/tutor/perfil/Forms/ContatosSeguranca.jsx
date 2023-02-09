import { Avatar, Box, Button, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { FaSave, FaTrash } from 'react-icons/fa';
import * as Yup from 'yup';
import { useAuth } from "../../../../../hooks/useAuth";
import { useLoading } from '../../../../../hooks/useLoading';
import { useToast } from '../../../../../hooks/useToast';

import { IconButton } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa';

import { uuidv4 } from '@firebase/util';
import { phone as phoneMask } from '../../../../../utils/masks';


export default function ContatosSeguranca() {
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();

  const { props, functions } = useAuth();
  const { updateUserByID, updateContextData } = functions;
  const { user } = props;

  const [showForm, setShowForm] = useState(false);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      phone: Yup.string().required("O campo Telefone é obrigatório"),
      email: Yup.string().required("O campo Email é obrigatório").email("Digite um email válido"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      console.log("Entrei")

      handleSubmitForm(values)
    },
  });

  const handleSubmitForm = async (formValues) => {
    const data = {
      ...user,
      emergency_contacts: [
        ...user.emergency_contacts,
        {
          uid: uuidv4(),
          name: formValues.name,
          email: formValues.email,
          phone: formValues.phone,
          created_at: Date.now(),
        }
      ],
      updated_at: Date.now(),
    };

    if (await updateUserByID(user?.uid, data)) {
      addToast({
        message: "Informações do Tutor atualizadas com sucesso!",
        severity: 'success'
      })
      await updateContextData()
      setShowForm(false)
      formik.resetForm()
    }
  }

  return (
    <Box>
      <Typography sx={{ mt: 2 }} variant="body2">As informações de contatos de segurança aparecerão caso seu pet esteja perdido e alguem leia a coleira do pet.</Typography>
      <Typography variant="body2" >Não ultilizamos para nenhuma outra finalidade os contatos adicionados aqui a não ser mostrar para quem localizar seu pet!</Typography>
      {
        !showForm && (
          <Button
            sx={{ my: 2 }}
            variant='contained'
            color="primary"
            startIcon={<FaPlus />}
            type="button"
            onClick={() => setShowForm(true)}
          >
            Adicionar Contato
          </Button>
        )
      }
      {
        showForm && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              gap: 2,
              my: 2
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              fullWidth
              label="Nome"
              id="name"
              name="name"
              value={formik.values.name}
              error={!!formik.errors.name}
              helperText={formik.errors.name}
              onChange={formik.handleChange}
            />
            <TextField
              fullWidth
              label="Celular/Telefone/Whatsapp"
              id="phone"
              name="phone"
              inputProps={{ maxLength: 15 }}
              value={formik.values.phone}
              error={!!formik.errors.phone}
              helperText={formik.errors.phone}
              onChange={(event) => formik.setFieldValue('phone', phoneMask(event.target.value))}
            />
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              value={formik.values.email}
              error={!!formik.errors.email}
              helperText={formik.errors.email}
              onChange={formik.handleChange}
            />
            <Button
              fullWidth
              type='submit'
              variant="contained"
              color="success"
              startIcon={<FaSave />}
            >
              Salvar
            </Button>
            <Button
              fullWidth
              type='button'
              variant="contained"
              color="error"
              startIcon={<FaTrash />}
              onClick={() => {
                if (window.confirm("As alterações serão perdidas. Deseja continuar?")) {
                  formik.resetForm()
                  setShowForm(false)
                }
              }}
            >
              Descartar alterações
            </Button>
          </Box>
        )
      }
      <Box sx={{ height: 350, width: '100%', my: 2 }}>
        <DataGrid
          initialState={{
            sorting: {
              sortModel: [{ field: 'created_at', sort: 'desc' }],
            },
          }}
          rows={user?.emergency_contacts}
          getRowId={(row) => row.uid}
          columns={[
            {
              field: 'avatar',
              headerName: '',
              width: 60,
              sortable: false,
              renderCell: (params) => {
                return <Avatar src="" alt="contato" />
              },
            },
            { field: 'name', headerName: 'Nome', flex: 1 },
            { field: 'phone', headerName: 'Telefone', flex: 1 },
            { field: 'email', headerName: 'Email', flex: 1 },
            { field: 'created_at', headerName: 'Dt. criação', flex: 1, renderCell: (params) => <Typography variant="caption">{dayjs(new Date(params.row.created_at)).format("DD/MM/YYYY HH:mm:ss")}</Typography> },
            {
              field: "action",
              headerName: "",
              width: 50,
              sortable: false,
              renderCell: (params) => {
                const deleteContact = async (event) => {
                  event.stopPropagation();

                  if (window.confirm("Deseja remover este registro? Essa ação é irreverssível.")) {
                    const updatedContactsArray = user.emergency_contacts.filter(item => item.uid !== params.row.uid)

                    const data = {
                      ...user,
                      emergency_contacts: [
                        ...updatedContactsArray
                      ],
                      updated_at: Date.now(),
                    };

                    if (await updateUserByID(user?.uid, data)) {
                      addToast({
                        message: "Contato removido com sucesso!",
                        severity: 'success'
                      })
                      await updateContextData()
                    }
                  }
                };

                return (
                  <IconButton size="small" variant="contained" color="error" onClick={deleteContact}>
                    <FaTrash />
                  </IconButton>
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
  )
}