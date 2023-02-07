import React, { useMemo, useState } from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";

import {
  Avatar, Box, Button, IconButton, TextField, Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import { FaCamera } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { uploadImageAsync } from '../../../../firebase/functions';
import { useAuth } from '../../../../hooks/useAuth';
import { isStringEmpty } from '../../../../utils/string';
import { useToast } from '../../../../hooks/useToast';
import { useLoading } from '../../../../hooks/useLoading';

export default function EditarPet() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { setIsLoading } = useLoading();
  const { functions, props } = useAuth();
  const { updatePetByID, updateContextData } = functions;
  const { user, selectedPet } = props;

  const [selectedImage, setSelectedImage] = useState(selectedPet?.avatar);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      birth_date: Yup.string().required("O campo Data de nascimento é obrigatório"),
      adoption_date: Yup.string(),
      species: Yup.string().required("O campo Tipo/Especie é obrigatório"),
      animal_race: Yup.string().required("O campo Raça é obrigatório"),
      pelage: Yup.string().required("O campo Pelagem/Cor é obrigatório"),
      sex: Yup.string().required("O campo Sexo é obrigatório"),
      castration: Yup.string(),
      pin_number: Yup.string(),
      selectedImage: Yup.mixed(),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: selectedPet?.name,
      birth_date: selectedPet?.birth_date,
      adoption_date: selectedPet?.adoption_date,
      species: selectedPet?.species,
      animal_race: selectedPet?.animal_race,
      pelage: selectedPet?.pelage,
      sex: selectedPet?.sex,
      castration: selectedPet?.castration,
      pin_number: selectedPet?.pin_number,
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
      uploadURLImage = await uploadImageAsync(formValues.selectedImage, "pets");
    } else {
      uploadURLImage = selectedImage;
    }
    setIsLoading(false)

    const data = {
      ...selectedPet,
      uid: selectedPet?.uid,
      name: formValues.name,
      avatar: uploadURLImage,
      adoption_date: new Date(formValues.adoption_date).getTime(),
      birth_date: new Date(formValues.birth_date).getTime(),
      pelage: formValues.pelage,
      species: formValues.species,
      animal_race: formValues.animal_race,
      sex: formValues.sex,
      castration: isStringEmpty(formValues.castration)
        ? ""
        : new Date(formValues.castration).getTime(),
      pin_number: isStringEmpty(formValues.pin_number)
        ? "Sem Coleira"
        : formValues.pin_number,
      updated_at: Date.now(),
    };

    if (await updatePetByID(selectedPet.uid, data, user)) {
      addToast({
        message: "Informações do Pet atualizadas com sucesso!",
        severity: 'success'
      })
      await updateContextData()
      return navigate("/tutor/pet/visualizar");
    }
  }

  return (
    <DrawerComponent title="Editar Pet">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ContainerComponent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
            component="form"
            onSubmit={formik.handleSubmit}
          >
            <Typography variant="body2">
              Clique na camera para alterar uma foto do seu Pet
            </Typography>
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

            <TextField
              fullWidth
              id="name"
              name="name"
              label="Nome do Pet"
              variant="outlined"
              helperText={formik.errors.name}
              error={!!formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <DatePicker
              label="Data de nascimento"
              inputFormat="DD/MM/YYYY"
              value={formik.values.birth_date}
              onChange={(value) => { value && formik.setFieldValue('birth_date', new Date(value)) }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  value={formik.values.birth_date}
                  error={!!formik.errors.birth_date}
                  helperText={formik.errors.birth_date}
                  name="birth_date"
                  variant="outlined"
                  {...params}
                />
              )}
            />

            <DatePicker
              label="Data de adoção"
              inputFormat="DD/MM/YYYY"
              value={formik.values.adoption_date}
              onChange={(value) => { value && formik.setFieldValue('adoption_date', new Date(value)) }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  value={formik.values.adoption_date}
                  error={!!formik.errors.adoption_date}
                  helperText={formik.errors.adoption_date}
                  name="adoption_date"
                  variant="outlined"
                  {...params}
                />
              )}
            />

            <TextField
              fullWidth
              id="species"
              name="species"
              label="Tipo/Espécie"
              variant="outlined"
              helperText={formik.errors.species}
              error={!!formik.errors.species}
              value={formik.values.species}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              id="animal_race"
              name="animal_race"
              label="Raça"
              variant="outlined"
              helperText={formik.errors.animal_race}
              error={!!formik.errors.animal_race}
              value={formik.values.animal_race}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              id="pelage"
              name="pelage"
              label="Pelagem/Cor"
              variant="outlined"
              helperText={formik.errors.pelage}
              error={!!formik.errors.pelage}
              value={formik.values.pelage}
              onChange={formik.handleChange}
            />

            <TextField
              fullWidth
              id="sex"
              name="sex"
              label="Sexo"
              variant="outlined"
              helperText={formik.errors.sex}
              error={!!formik.errors.sex}
              value={formik.values.sex}
              onChange={formik.handleChange}
            />

            <DatePicker
              label="Data de castração"
              inputFormat="DD/MM/YYYY"
              value={formik.values.castration}
              onChange={(value) => { value && formik.setFieldValue('castration', new Date(value)) }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  value={formik.values.castration}
                  error={!!formik.errors.castration}
                  helperText={formik.errors.castration}
                  name="castration"
                  variant="outlined"
                  {...params}
                />
              )}
            />

            <TextField
              fullWidth
              id="pin_number"
              name="pin_number"
              label="Coleira"
              variant="outlined"
              helperText={formik.errors.pin_number}
              error={!!formik.errors.pin_number}
              value={formik.values.pin_number}
              onChange={formik.handleChange}
            />

            <Button type='submit' variant="contained" color="primary">Salar alterações</Button>

          </Box>
        </ContainerComponent>
      </LocalizationProvider>
    </DrawerComponent >
  )
}