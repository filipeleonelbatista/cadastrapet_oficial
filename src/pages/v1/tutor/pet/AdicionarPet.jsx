import React, { useMemo, useState } from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";

import {
  Avatar, Box, Button, CardMedia, IconButton, TextField, Typography
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

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import qrImageOverlay from '../../../../assets/qr_overlay.png';
import QrReader from "react-qr-scanner";
import dayjs from 'dayjs';
import { useToast } from '../../../../hooks/useToast';
import { useLoading } from '../../../../hooks/useLoading';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`add-pet-tabpanel-${index}`}
      aria-labelledby={`add-pet-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `add-pet-tab-${index}`,
    'aria-controls': `add-pet-tabpanel-${index}`,
  };
}

export default function AdicionarPet() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const navigate = useNavigate();

  const { addToast } = useToast();
  const { setIsLoading } = useLoading();

  const { functions, props } = useAuth();
  const {
    getNewPetID,
    updatePetByID,
    updateUserByID,
    updateContextData,
    getPetByID,
  } = functions;
  const { user, isLoggedIn } = props;

  const [selectedNav, setSelectedNav] = useState("add_new");
  const [selectedImage, setSelectedImage] = useState('');

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
      selectedImage: Yup.mixed()
        .test(
          'fileFormat',
          'Arquivo deve ser uma imagem PNG ou JPG',
          value => value && (value.type === 'image/png' || value.type === 'image/jpeg')
        )
        .test(
          'fileSize',
          'Arquivo deve ter menos de 3 MB',
          value => value && value.size <= 3000000
        )
        .required("O campo Imagem do pet é obrigatório"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      birth_date: '',
      adoption_date: '',
      species: '',
      animal_race: '',
      pelage: '',
      sex: '',
      castration: '',
      pin_number: '',
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
    setIsLoading(true)
    let uploadURLImage = await uploadImageAsync(formValues.selectedImage, "pets");
    setIsLoading(false)

    const petID = await getNewPetID();

    const data = {
      uid: petID,
      name: formValues.name,
      avatar: uploadURLImage,
      tutor: [user.uid],
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
      events: [],
      vaccines: [],
      medications: [],
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updatePetByID(petID, data, user, true)) {
      addToast({
        message: "Pet cadastrado com sucesso!"
      })
      await updateContextData();
      return navigate("/inicio");
    }
  }

  const [sharedPet, setSharedPet] = useState();
  const [qrScann, setQrscan] = useState("No result");

  const handleScan = async (data) => {
    console.log("Olha o qr", data)
    if (data) {
      setQrscan(data.text);
      const scannedPet = await getPetByID(data.text);
      setSharedPet(scannedPet);

    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  async function handleSharePet() {
    if (await updateUserByID(user.uid, { pets: [...user.pets, qrScann] })) {
      return navigate("/inicio");
    }
  }

  return (
    <DrawerComponent title="Adicionar Pet">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ContainerComponent>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="Painel para adicionar pet ou vincular">
                <Tab label="Novo Pet" {...a11yProps(0)} />
                <Tab label="Ler Qr Code" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
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
                  Clique na camera para adicionar uma foto do seu Pet
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

                <Button type='submit' variant="contained" color="primary">Adicionar Pet</Button>

              </Box>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {
                !sharedPet
                  ? (
                    <>
                      <Typography variant="body2" sx={{
                        width: '100%',
                        textAlign: 'center',
                        mb: 2
                      }}>
                        Para adicionar um pet compartilhado com você<br />
                        Leia o Código do Pet localizado em <br />
                        <b>Menu lateral</b> {">"} <b>CódigoPet</b><br />
                        Selecione a opção <b>Tutor</b>
                      </Typography>
                      <Box
                        sx={{
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          height: 500,
                          overflow: 'hidden',
                          borderRadius: 2,
                        }}
                      >
                        <CardMedia
                          component="img"
                          src={qrImageOverlay}
                          alt="Leitor do QR Code"
                          sx={{
                            position: 'absolute',
                            zIndex: 15
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            zIndex: 10
                          }}>
                          <QrReader
                            delay={500}
                            facingmode="rear"
                            onError={handleError}
                            onScan={handleScan}
                            sx={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Typography variant="body2">
                          Deseja vincular o pet compartilhado com você?
                        </Typography>
                        <Box>
                          <Avatar sx={{ width: 150, height: 150 }} src={sharedPet?.avatar} alt="Foto do pet">
                            <FaCamera size={48} />
                          </Avatar>
                        </Box>

                        <TextField
                          fullWidth
                          disabled
                          label="Nome do Pet"
                          variant="outlined"
                          value={sharedPet?.name}
                        />

                        <TextField
                          fullWidth
                          disabled
                          label="Data de Nascimento"
                          variant="outlined"
                          value={dayjs(new Date(sharedPet?.birth_date)).format('DD/MM/YYYY')}
                        />

                        <Button type="button" onClick={handleSharePet} variant="contained" color="primary">Vincular Pet</Button>
                      </Box>
                    </>
                  )
              }
            </TabPanel>
          </Box>

        </ContainerComponent>
      </LocalizationProvider>
    </DrawerComponent >
  )
}