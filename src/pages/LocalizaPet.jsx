import { Avatar, Box, Card, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaSearch } from "react-icons/fa";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";
import { useAuth } from "../hooks/useAuth";

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

export default function LocalizaPet() {
  const { id } = useParams();

  const { addToast } = useToast();
  const { functions } = useAuth();
  const { getPetByID, getUserByID, updatePetByIDLocalization } = functions;

  const [position, setPosition] = useState();
  const [petUid, setPetUid] = useState('');
  const [tutorsInfo, setTutorsInfo] = useState([]);

  const handleSearchPet = async () => {
    try {
      if (petUid === '') {
        addToast({
          message: "Não foi informado o Código do pet!",
          severity: 'error'
        })
        return;
      }
      const searchedPet = await getPetByID(petUid);

      const tutorPets = [];

      for (let tutorId of searchedPet.tutor) {
        const tempTutor = await getUserByID(tutorId);
        if (tempTutor) {
          tutorPets.push(tempTutor);
        }
      }

      setTutorsInfo(tutorPets)

      const newPetInfo = {
        ...searchedPet,
        currentLocation: position
      }

      if (await updatePetByIDLocalization(searchedPet.uid, newPetInfo)) {
        addToast({
          message: "Localização do pet atualizada com sucesso!"
        })
      }

    } catch (err) {
      console.log(err)
      addToast({
        message: "Houve um problema ao procurar esta tag. Tente novamente mais tarde!",
        severity: 'error'
      })
    }
  }

  useEffect(() => {
    if (id) {
      setPetUid(id);
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (petUid !== '' && id) {
      handleSearchPet()
    }
  }, [petUid]);

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: 'auto',
        backgroundColor: '#fff',
        color: '#000',
      }}
    >
      <HomeNavigation />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          pt: 12,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 2,
            mb: 2,
          }}
        >
          <Typography variant="h5" color="primary">Código do pet/Coleira</Typography>
          <Typography variant="body2">Digite o <b>Código do pet</b> ou leia com o celular o <b>QrCode</b> da coleira</Typography>
          <FormControl
            sx={{
              width: 320,
              my: 2,
            }}
            variant="outlined"
          >
            <InputLabel htmlFor="uid">Código do pet/Coleira</InputLabel>
            <OutlinedInput
              id="uid"
              name="uid"
              value={petUid}
              onChange={(event) => setPetUid(event.target.value)}
              label="Código do pet/Coleira"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSearchPet}
                    edge="end"
                  >
                    <FaSearch />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {
            tutorsInfo.length > 0 && (
              <>
                <Typography variant="h5" color="primary">Tutores e contatos de emergência</Typography>
                <Typography variant="body2">Dados de contato para encontrar os Tutores do pet.</Typography>
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
                    tutorsInfo.map(tutor => (
                      <React.Fragment key={tutor.uid}>
                        <Card
                          component="a"
                          href={`tel:${tutor.phone}`}
                          sx={{
                            p: 1,
                            width: 150,
                            minWidth: 150,
                            height: 200,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: "center",
                            transition: '0.2s',
                            border: 'none',
                            outline: 'none',
                            gap: 1.5,
                            cursor: 'pointer',
                            textDecoration: 'none',
                            textAlign: 'center',

                            '&:hover': {
                              filter: 'brightness(0.8)'
                            }
                          }}>

                          <Avatar src={tutor.avatar} alt="" sx={{ width: 64, height: 64 }} />
                          <Typography variant="body1"><b>{tutor.name}</b></Typography>
                          <Typography variant="body2">
                            <FaPhone /> {tutor.phone}
                          </Typography>
                          <Typography variant="body2">
                            <FaEnvelope /> {tutor.email}
                          </Typography>

                        </Card>
                        {
                          tutor.emergency_contacts.map(emergency_contact => (
                            <Card
                              key={emergency_contact.uid}
                              component="a"
                              href={`tel:${emergency_contact.phone}`}
                              sx={{
                                p: 1,
                                width: 150,
                                minWidth: 150,
                                height: 200,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: "center",
                                transition: '0.2s',
                                border: 'none',
                                outline: 'none',
                                gap: 1.5,
                                cursor: 'pointer',
                                textDecoration: 'none',
                                textAlign: 'center',

                                '&:hover': {
                                  filter: 'brightness(0.8)'
                                }
                              }}>

                              <Avatar src='' alt="" sx={{ width: 64, height: 64 }} />
                              <Typography variant="body1"><b>{emergency_contact.name}</b></Typography>
                              <Typography variant="body2">
                                <FaPhone /> {emergency_contact.phone}
                              </Typography>
                              <Typography variant="body2">
                                <FaEnvelope /> {emergency_contact.email}
                              </Typography>

                            </Card>
                          ))
                        }
                      </React.Fragment>
                    ))
                  }
                </Box>
              </>
            )
          }


          {
            position && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h5" color="primary">Sua localização</Typography>
                <Typography variant="body2">Sua localização é fornecida ao tutor para auxiliar na localização do pet</Typography>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 2,
                    mt: 2,
                    overflow: 'hidden',
                  }}
                >
                  <MapContainer
                    key="pet-location"
                    id="pet-location"
                    center={position}
                    zoom={15}
                    style={{ width: "100%", height: "100%", zIndex: 1 }}
                  >
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={position}>
                      <Popup>Sua localização</Popup>
                    </Marker>
                  </MapContainer>
                </Box>
              </Box>
            )}

        </Container>

      </Box >
      <Footer />
      <Floating location="Localiza Pet"/>
    </Box >
  );
}
