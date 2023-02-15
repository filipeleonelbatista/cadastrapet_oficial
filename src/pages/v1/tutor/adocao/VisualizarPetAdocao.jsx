import {
  Avatar, Box, Button, CardMedia, FormControlLabel, FormGroup, FormLabel, InputAdornment, Switch, TextField, Typography
} from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { BsBatteryFull, BsEmojiSmile } from 'react-icons/bs';
import { FaBed, FaBell, FaCamera, FaDog, FaEdit, FaGlobeAmericas, FaHeart, FaHeartbeat, FaSearch, FaTrash, FaUser } from 'react-icons/fa';
import { GiWeightScale } from 'react-icons/gi';
import { IoWarningOutline } from 'react-icons/io5';
import { RiHeartAddFill, RiUserUnfollowFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from '../../../../hooks/useAuth';
import { useLoading } from '../../../../hooks/useLoading';
import { useToast } from '../../../../hooks/useToast';

export default function VisualizarPetAdocao() {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();

  const { props, functions, deleteFunctions } = useAuth();
  const {
    getUserByID,
    getNewNotificationID,
    updateNotificationByID,
    updateAdoptionPetByID,
    updateUserByID,
    updateContextData
  } = functions;
  const { user, selectedAdoptionPet } = props;
  const { deleteAdoptionPet } = deleteFunctions;

  const [responsable, setResponsable] = useState();

  const port_size = {
    Mini: 'Mini',
    P: 'Pequeno',
    M: 'Médio',
    G: 'Grande',
    XG: 'Extra Grande'
  }

  const handleDelete = async () => {
    if (
      window.confirm(
        "Deseja realmente deletar este registro? Esta ação é irreversível."
      )
    ) {
      console.log("Olá", selectedAdoptionPet)
      await deleteAdoptionPet(selectedAdoptionPet.uid);
      await updateContextData();
      navigate("/tutor/adocao");
    }
  };

  const handleFavoriteAndNotificateResponsable = async () => {
    try {
      setIsLoading(true)
      const newNotificationUid = await getNewNotificationID()

      const data = {
        date: dayjs().add(7, 'day').valueOf(),
        icon: 'dog',
        is_readed: false,
        message: `${user.name} demonstrou interesse pelo ${selectedAdoptionPet.name} Vá no menu Adoção na aba Meus pets para ver os usuários que tem interesse para entrar em contato!`,
        title: 'Um tutor demonstrou interesse em adotar um pet seu.',
        uid: newNotificationUid,
        user_uid: selectedAdoptionPet.responsable_uid,
      }

      if (await updateNotificationByID(newNotificationUid, data)) {
        await updateContextData();
      }

      const userUpdatedLikePetList = {
        ...user,
        adoption_pets_liked: [
          ...user.adoption_pets_liked,
          selectedAdoptionPet.uid
        ]
      }

      if (await updateUserByID(user.uid, userUpdatedLikePetList)) {
        await updateContextData();
      }

      const adoptionPetUpdated = {
        ...selectedAdoptionPet,
        users_interested: [
          ...selectedAdoptionPet.users_interested,
          user.uid
        ]
      }

      if (await updateAdoptionPetByID(selectedAdoptionPet.uid, adoptionPetUpdated)) {
        await updateContextData();
        addToast({
          message: "O Seu interesse pelo pet foi enviado ao responsável. Em breve ele entrará em contato."
        })
        navigate('/tutor/adocao')
      }

    } catch (error) {
      console.log(error)
      addToast({
        message: 'Houve um erro ao salvar os dados do interesse no pet. Tente novamente mais tarde',
        severity: 'error'
      })

    } finally {
      setIsLoading(false)
    }
  }

  const loadResponsable = async () => {
    try {
      setIsLoading(true)
      const responsable = await getUserByID(selectedAdoptionPet.responsable_uid)
      setResponsable(responsable);

    } catch (err) {
      console.log(err)
      addToast({
        message: 'Houve um problema ao carregar o responsável do pet',
        severity: 'error'
      })

    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadResponsable()
  }, [])

  return (
    <DrawerComponent title="Visualizar Pet para Adoção">
      <ContainerComponent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box>
            <Avatar sx={{ width: 150, height: 150, cursor: 'pointer' }} src={selectedAdoptionPet?.avatar} alt="Foto do pet">
              <FaCamera size={48} />
            </Avatar>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2
            }}
          >
            {selectedAdoptionPet.galery_images.length > 0 ? (
              selectedAdoptionPet.galery_images.map((item, index) => (
                <CardMedia
                  component="img"
                  key={index}
                  src={item}
                  alt="Prévia da imagem selecionada"
                  sx={{ height: '64px', width: '64px', borderRadius: 2, cursor: 'pointer' }}
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
            disabled
            name="name"
            label="Nome do Pet"
            variant="outlined"
            value={selectedAdoptionPet.name}
          />

          <TextField
            fullWidth
            disabled
            name="birth_date"
            label="Data de nascimento"
            variant="outlined"
            value={dayjs(selectedAdoptionPet.birth_date).format("DD/MM/YYYY")}
          />

          <TextField
            fullWidth
            disabled
            name="species"
            label="Tipo/Espécie"
            variant="outlined"
            value={selectedAdoptionPet.species}
          />

          <TextField
            fullWidth
            disabled
            name="animal_race"
            label="Raça"
            variant="outlined"
            value={selectedAdoptionPet.animal_race}
          />

          <TextField
            fullWidth
            disabled
            name="pelage"
            label="Pelagem/Cor"
            variant="outlined"
            value={selectedAdoptionPet.pelage}
          />

          <TextField
            fullWidth
            disabled
            name="sex"
            label="Sexo"
            variant="outlined"
            value={selectedAdoptionPet.sex}
          />

          <TextField
            fullWidth
            disabled
            name="castration"
            label="Data de castração"
            variant="outlined"
            value={dayjs(selectedAdoptionPet.castration).format("DD/MM/YYYY")}
          />

          <TextField
            fullWidth
            disabled
            rows={8}
            multiline
            name="adoption_description"
            label="Descrição do pet"
            variant="outlined"
            value={selectedAdoptionPet.adoption_description}
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
                <Switch disabled checked={selectedAdoptionPet.personality.pedigree} name="pedigree" />
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
                <Switch disabled checked={selectedAdoptionPet.personality.afetuoso} name="afetuoso" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RiHeartAddFill size={24} /> Afetuoso</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.agressivo} name="agressivo" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><IoWarningOutline size={24} /> Agressivo</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.alerta} name="alerta" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaBell size={24} /> Alerta</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.assustado} name="assustado" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaHeartbeat size={24} /> Assustado</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.ativo} name="ativo" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><BsBatteryFull size={24} /> Ativo</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.docil} name="docil" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaHeart size={24} /> Dócil</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.curioso} name="curioso" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaSearch size={24} /> Curioso</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.explorador} name="explorador" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaGlobeAmericas size={24} /> Explorador</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.preguicoso} name="preguicoso" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><FaBed size={24} /> Preguiçoso</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.timido} name="timido" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><RiUserUnfollowFill size={24} /> Tímido</Typography>}
            />
            <FormControlLabel
              control={
                <Switch disabled checked={selectedAdoptionPet.personality.tranquilo} name="tranquilo" />
              }
              label={<Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><BsEmojiSmile size={24} /> Tranquilo</Typography>}
            />
          </FormGroup>

          <TextField
            fullWidth
            disabled
            label="Porte físico"
            variant="outlined"
            name="phisical_size"
            value={port_size[selectedAdoptionPet.phisical_size]}
          />

          <TextField
            fullWidth
            disabled
            name="weight"
            label="Peso"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <GiWeightScale />
                </InputAdornment>
              ),
            }}
            value={selectedAdoptionPet.weight}
          />

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography><b>Pet de</b></Typography>

            <Avatar
              sx={{ width: 150, height: 150, cursor: 'pointer' }}
              src={responsable?.avatar}
              alt="Foto do responsável"
            >
              <FaUser size={48} />
            </Avatar>
            <Typography>{responsable?.name}</Typography>
            {
              selectedAdoptionPet?.users_interested?.includes(user?.uid) && (
                <Typography><b>Telefone: </b>{responsable?.phone}</Typography>
              )
            }
          </Box>
          {
            (user.uid !== selectedAdoptionPet.responsable_uid) && !(selectedAdoptionPet.users_interested.includes(user.uid)) && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaDog />}
                onClick={handleFavoriteAndNotificateResponsable}
              >
                Quero adotar
              </Button>
            )
          }
          {
            user.uid === selectedAdoptionPet.responsable_uid && (
              <>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/tutor/adocao/editar")}
                  startIcon={<FaEdit />}
                >
                  Editar Pet
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  startIcon={<FaTrash />}
                >
                  Excluir pet
                </Button></>
            )
          }

        </Box>
      </ContainerComponent>
    </DrawerComponent >
  )
}