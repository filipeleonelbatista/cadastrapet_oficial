import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {
  Avatar, Box, Button, CardMedia, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, IconButton, InputAdornment, InputLabel, MenuItem, Select, Switch, TextField, Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import React, { useMemo, useState } from 'react';
import { BsBatteryFull, BsEmojiSmile } from 'react-icons/bs';
import { FaBed, FaBell, FaCamera, FaGlobeAmericas, FaHeart, FaHeartbeat, FaSearch } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';
import { IoWarningOutline } from 'react-icons/io5';
import { RiHeartAddFill, RiUserUnfollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { uploadImageAsync } from '../../../../firebase/functions';
import { useAuth } from '../../../../hooks/useAuth';
import { useToast } from '../../../../hooks/useToast';

export default function AdicionarPetAdocao() {
  const navigate = useNavigate();

  const { addToast } = useToast();

  const { functions, props } = useAuth();
  const {
    getNewAdoptionPetID,
    updateContextData,
    updateAdoptionPetByID,
  } = functions;
  const { user } = props;

  const [selectedImage, setSelectedImage] = useState('');

  const [attachments, setAttachments] = useState([]);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      birth_date: Yup.string().required("O campo Data de nascimento é obrigatório"),
      species: Yup.string().required("O campo Tipo/Especie é obrigatório"),
      animal_race: Yup.string().required("O campo Raça é obrigatório"),
      pelage: Yup.string().required("O campo Pelagem/Cor é obrigatório"),
      sex: Yup.string().required("O campo Sexo é obrigatório"),
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
      adoption_description: Yup.string().required("O campo Descrição do pet é obrigatório"),
      galery_images: Yup.mixed(),
      pedigree: Yup.boolean(),
      afetuoso: Yup.boolean(),
      agressivo: Yup.boolean(),
      alerta: Yup.boolean(),
      assustado: Yup.boolean(),
      ativo: Yup.boolean(),
      curioso: Yup.boolean(),
      docil: Yup.boolean(),
      explorador: Yup.boolean(),
      preguicoso: Yup.boolean(),
      timido: Yup.boolean(),
      tranquilo: Yup.boolean(),
      phisical_size: Yup.string().required("O campo Porte físico é obrigatório"),
      weight: Yup.number().required("O Campo Peso é obrigatório. Pode ser o peso aproximado."),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      birth_date: '',
      species: '',
      animal_race: '',
      pelage: '',
      sex: '',
      castration: '',
      pin_number: '',
      selectedImage: '',
      adoption_description: '',
      galery_images: [],
      pedigree: false,
      afetuoso: false,
      agressivo: false,
      alerta: false,
      assustado: false,
      ativo: false,
      curioso: false,
      docil: false,
      explorador: false,
      preguicoso: false,
      timido: false,
      tranquilo: false,
      phisical_size: '',
      weight: 0,
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
    let uploadURLImage = await uploadImageAsync(formValues.selectedImage, "adoption_pets");

    let uploadURLGaleryImage = [];
    if (formValues.galery_images) {
      for (const file of formValues.galery_images) {
        const newUrl = await uploadImageAsync(file, "adoption_pets");
        uploadURLGaleryImage.push(newUrl);
      }
    }

    const newAdoptionPetId = await getNewAdoptionPetID();

    const data = {
      uid: newAdoptionPetId,
      name: formValues.name,
      avatar: uploadURLImage,
      is_adopted: false,
      pedigree: formValues.pedigree,
      tutor: [],
      adoption_date: 0,
      birth_date: formValues.birth_date ? new Date(formValues.birth_date).getTime() : 0,
      pelage: formValues.pelage,
      species: formValues.species,
      animal_race: formValues.animal_race,
      sex: formValues.sex,
      castration: formValues.castration ? new Date(formValues.castration).getTime() : 0,
      pin_number: "Sem Coleira",
      events: [],
      vaccines: [],
      medications: [],
      created_at: 0,
      updated_at: 0,
      currentLocation: {
        lat: 0,
        lng: 0,
      },
      adoption_description: formValues.adoption_description,
      endereco: {
        ...user.endereco
      },
      galery_images: uploadURLGaleryImage,
      personality: {
        afetuoso: formValues.afetuoso,
        agressivo: formValues.agressivo,
        alerta: formValues.alerta,
        assustado: formValues.assustado,
        ativo: formValues.ativo,
        curioso: formValues.curioso,
        docil: formValues.docil,
        explorador: formValues.explorador,
        preguicoso: formValues.preguicoso,
        timido: formValues.timido,
        tranquilo: formValues.tranquilo,
      },
      phisical_size: formValues.phisical_size,
      responsable_uid: user.uid,
      weight: formValues.weight,
    }

    if (await updateAdoptionPetByID(newAdoptionPetId, data)) {
      addToast({
        message: "Pet adicionado com sucesso!"
      })
      await updateContextData();
      navigate("/tutor/adocao")
    }

  }

  const handleLoadAttachments = (event) => {
    event.stopPropagation()
    formik.setFieldValue('galery_images', event.target.files)
    const files = Array.from(event.target.files);
    if (files.length > 0) {
      const arrImg = [];
      for (let i = 0; i < files.length; i++) {
        arrImg.push({
          path: files[i].path,
          url: String(URL.createObjectURL(files[i]))
        });
      }
      setAttachments(arrImg);
    }
  };

  return (
    <DrawerComponent title="Adicionar Pet para Adoção">
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
              Clique na camera para adicionar a foto principal do pet
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
            <FormHelperText error={!!formik.errors.selectedImage}>
              {formik.errors.selectedImage}
            </FormHelperText>

            <Button
              sx={{ width: '100%' }}
              variant="contained"
              component="label"
              startIcon={<AddAPhotoIcon />}
            >
              Adicionar galeria de imagens
              <input
                id="galery_images"
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={(event) => handleLoadAttachments(event)}
              />
            </Button>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 2
              }}
            >
              {attachments.length > 0 ? (
                attachments.map((item, index) => (
                  <CardMedia
                    component="img"
                    key={index}
                    src={item.url}
                    alt="Prévia da imagem selecionada"
                    sx={{ height: '64px', width: '64px', borderRadius: 2 }}
                  />
                ))
              ) : (
                <Typography variant="body2" sx={{ my: 2 }}>
                  Nenhuma galeria de imagens enviada!
                </Typography>
              )}
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
              rows={8}
              multiline
              id="adoption_description"
              name="adoption_description"
              label="Descreva o pet"
              variant="outlined"
              helperText={formik.errors.adoption_description}
              error={!!formik.errors.adoption_description}
              value={formik.values.adoption_description}
              onChange={formik.handleChange}
            />

            <FormLabel component="legend">Pedigree</FormLabel>

            <FormGroup sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              my: 2,
            }}>
              <FormControlLabel
                control={
                  <Switch checked={formik.values.pedigree} onChange={(event) => formik.setFieldValue('pedigree', event.target.checked)} name="pedigree" />
                }
                label="Possui Pedigree"
              />
            </FormGroup>

            <FormLabel component="legend">Personalidade do pet</FormLabel>
            <FormGroup sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              my: 2,
            }}>
              <FormControlLabel
                control={
                  <Switch checked={formik.values.afetuoso} onChange={(event) => formik.setFieldValue('afetuoso', event.target.checked)} name="afetuoso" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RiHeartAddFill size={24} /> Afetuoso</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.agressivo} onChange={(event) => formik.setFieldValue('agressivo', event.target.checked)} name="agressivo" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IoWarningOutline size={24} /> Agressivo</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.alerta} onChange={(event) => formik.setFieldValue('alerta', event.target.checked)} name="alerta" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaBell size={24} /> Alerta</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.assustado} onChange={(event) => formik.setFieldValue('assustado', event.target.checked)} name="assustado" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaHeartbeat size={24} /> Assustado</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.ativo} onChange={(event) => formik.setFieldValue('ativo', event.target.checked)} name="ativo" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><BsBatteryFull size={24} /> Ativo</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.docil} onChange={(event) => formik.setFieldValue('docil', event.target.checked)} name="docil" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaHeart size={24} /> Dócil</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.curioso} onChange={(event) => formik.setFieldValue('curioso', event.target.checked)} name="curioso" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaSearch size={24} /> Curioso</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.explorador} onChange={(event) => formik.setFieldValue('explorador', event.target.checked)} name="explorador" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaGlobeAmericas size={24} /> Explorador</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.preguicoso} onChange={(event) => formik.setFieldValue('preguicoso', event.target.checked)} name="preguicoso" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaBed size={24} /> Preguiçoso</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.timido} onChange={(event) => formik.setFieldValue('timido', event.target.checked)} name="timido" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RiUserUnfollowFill size={24} /> Tímido</Typography>}
              />
              <FormControlLabel
                control={
                  <Switch checked={formik.values.tranquilo} onChange={(event) => formik.setFieldValue('tranquilo', event.target.checked)} name="tranquilo" />
                }
                label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><BsEmojiSmile size={24} /> Tranquilo</Typography>}
              />
            </FormGroup>

            <FormControl fullWidth>
              <InputLabel id="phisical_size-label">Porte físico</InputLabel>
              <Select
                labelId="phisical_size-label"
                id="phisical_size"
                name="phisical_size"
                value={formik.values.phisical_size}
                label="Porte físico"
                onChange={formik.handleChange}
              >
                <MenuItem value={'Mini'}>Mini</MenuItem>
                <MenuItem value={'P'}>Pequeno</MenuItem>
                <MenuItem value={'M'}>Médio</MenuItem>
                <MenuItem value={'G'}>Grande</MenuItem>
                <MenuItem value={'XG'}>Extra Grande</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              id="weight"
              name="weight"
              type="number"
              label="Peso"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <GiWeightScale />
                  </InputAdornment>
                ),
              }}
              helperText={formik.errors.weight}
              error={!!formik.errors.weight}
              value={formik.values.weight}
              onChange={formik.handleChange}
            />

            <Button type='submit' variant="contained" color="primary">Adicionar Pet para adoção</Button>

          </Box>
        </ContainerComponent>
      </LocalizationProvider>
    </DrawerComponent >
  )
}