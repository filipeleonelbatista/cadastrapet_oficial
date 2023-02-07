import { Avatar, Box, Button, IconButton, TextField, Typography } from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import React, { useMemo, useState } from 'react';
import { FaCamera, FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import { useAuth } from "../../../../../hooks/useAuth";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useLoading } from '../../../../../hooks/useLoading';
import { useToast } from '../../../../../hooks/useToast';
import { uploadImageAsync } from '../../../../../firebase/functions';

import { phone as phoneMask } from '../../../../../utils/masks';

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

export default function DadosTutor() {
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();

  const { props, functions } = useAuth();
  const { updateUserByID, updateContextData } = functions;
  const { user } = props;

  const [selectedImage, setSelectedImage] = useState(user?.avatar);
  const [isEditable, setIsEditable] = useState(false);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      birth_date: Yup.string().required("O campo Data de nascimento é obrigatório"),
      phone: Yup.string().required("O campo Celular/Whats é obrigatório"),
      cpf: Yup.string().required("O campo CPF é obrigatório"),
      email: Yup.string(),
      selectedImage: Yup.mixed(),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: user?.name,
      birth_date: dayjs(user?.birth_date).format("YYYY-MM-DD"),
      phone: user?.phone,
      cpf: user?.cpf,
      email: user?.email,
      selectedImage: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  const handleFilePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    formik.setFieldValue("selectedImage", file);

    reader.onloadend = (e) => {
      setSelectedImage(reader.result);
    };
  };

  const handleSubmitForm = async (formValues) => {
    let uploadURLImage = "";
    setIsLoading(true)
    if (formValues.selectedImage !== '') {
      uploadURLImage = await uploadImageAsync(formValues.selectedImage, "users");
    } else {
      uploadURLImage = selectedImage;
    }
    setIsLoading(false)

    const data = {
      ...user,
      avatar: uploadURLImage,
      name: formValues.name,
      phone: formValues.phone,
      cpf: formValues.cpf,
      birth_date: new Date(formValues.birth_date).getTime(),
      updated_at: Date.now(),
    };

    if (await updateUserByID(user.uid, data)) {
      addToast({
        message: "Informações do Tutor atualizadas com sucesso!",
        severity: 'success'
      })
      await updateContextData()
      setIsEditable(false)
    }

  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    >
      <Box sx={{
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
        <Typography>As informações do tutor são usadas para encontrar seu pet e outras funcionalidades do sistema</Typography>
        <Box>
          <IconButton color="primary" aria-label="Enviar foto" component="label">
            <input hidden
              id='selectedImage'
              name='selectedImage'
              accept="image/*"
              type="file"
              disabled={!isEditable}
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
            disabled={!isEditable}
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
            disabled={!isEditable}
            fullWidth
            label="Celular/Whats"
            id="phone"
            name="phone"
            inputProps={{ maxLength: 15 }}
            value={formik.values.phone}
            error={!!formik.errors.phone}
            helperText={formik.errors.phone}
            onChange={(event) => formik.setFieldValue('phone', phoneMask(event.target.value))}
          />
          <TextField
            disabled={!isEditable}
            fullWidth
            label="CPF"
            id="cpf"
            name="cpf"
            value={formik.values.cpf}
            error={!!formik.errors.cpf}
            helperText={formik.errors.cpf}
            onChange={formik.handleChange}
          />

          <DatePicker
            disabled={!isEditable}
            label="Data de nascimento"
            inputFormat="DD/MM/YYYY"
            value={formik.values.birth_date}
            onChange={(value) => { value && formik.setFieldValue('birth_date', dayjs(new Date(value)).format("DD/MM/YYYY")) }}
            renderInput={(params) => (
              <TextField
                fullWidth
                disabled={!isEditable}
                value={formik.values.birth_date}
                error={!!formik.errors.birth_date}
                helperText={formik.errors.birth_date}
                name="birth_date"
                variant="outlined"
                {...params}
              />
            )}
          />

          <TextField
            disabled
            fullWidth
            label="Email"
            id="email"
            name="email"
            value={formik.values.email}
            error={!!formik.errors.email}
            helperText={formik.errors.email}
            onChange={formik.handleChange}
          />

          {
            !isEditable ? (
              <>
                <TextField
                  disabled
                  fullWidth
                  label="Data de criação"
                  defaultValue={dayjs(user?.created_at).format("DD/MM/YYYY HH:mm:ss")}
                />
                <TextField
                  disabled
                  fullWidth
                  label="Data de atualização"
                  defaultValue={dayjs(user?.updated_at).format("DD/MM/YYYY HH:mm:ss")}
                />
                <Button
                  fullWidth
                  type='button'
                  variant="contained"
                  color="primary"
                  startIcon={<FaEdit />}
                  onClick={() => setIsEditable(true)}
                >
                  Editar
                </Button>
              </>
            ) : (
              <>
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
                      setIsEditable(false)
                    }
                  }}
                >
                  Descartar alterações
                </Button>
              </>
            )
          }
        </Box>
      </Box>
    </LocalizationProvider>
  )
}