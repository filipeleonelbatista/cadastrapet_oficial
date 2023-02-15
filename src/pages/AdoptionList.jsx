import { Avatar, Box, Button, Card, CardMedia, Container, IconButton, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import noDataImage from '../assets/images/no_data.png';
import ctaPhone from "../assets/images/landing/mockup-cta-2.png";

import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useResize } from "../hooks/useResize";
import { useToast } from "../hooks/useToast";
import ContactSection from "../components/ContactSection";
import { FaBed, FaBell, FaCalendar, FaGlobeAmericas, FaHeart, FaHeartbeat, FaPaw, FaSearch, FaTimes } from "react-icons/fa";
import { RiHeartAddFill, RiUserUnfollowFill } from "react-icons/ri";
import { IoWarningOutline } from "react-icons/io5";
import { BsBatteryFull, BsEmojiSmile } from "react-icons/bs";

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

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

export default function AdoptionList() {
  const navigate = useNavigate();
  const { size } = useResize();

  const { props, functions, setFunctions } = useAuth();
  const { getAllAdoptionPets } = functions;
  const { setSelectedAdoptionPet } = setFunctions;
  const { selectedAdoptionPet } = props;

  const [open, setOpen] = useState(false)

  const [petList, setPetList] = useState([])

  const port_size = {
    Mini: 'Mini',
    P: 'Pequeno',
    M: 'Médio',
    G: 'Grande',
    XG: 'Extra Grande'
  }

  async function loadPets() {
    const response = await getAllAdoptionPets()

    response.sort((a, b) => b.created_at - a.created_at)

    setPetList(response)
  }

  console.log(selectedAdoptionPet)
  useEffect(() => {
    loadPets()
  }, [])

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
      <Modal
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Card
          sx={{
            width: size[0] < 720 ? '90vw' : 480,
            height: '90vh',
            outline: 'none',
            position: 'relative',
            overflow: 'auto',
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={() => {
              setOpen(false)
            }}
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: "#00000033",
              zIndex: 20
            }}>
            <FaTimes />
          </IconButton>
          <Box
            sx={{
              width: '100%',
              height: 350,
              backgroundColor: '#000000aa',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Swiper
              // install Swiper modules
              style={{
                width: '100%',
                height: 350,
              }}
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={0}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
            >
              {
                selectedAdoptionPet?.galery_images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <CardMedia
                      component="img"
                      src={image}
                      alt={selectedAdoptionPet?.name}
                      sx={{
                        width: '100%',
                        height: 350,
                      }}
                    />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              p: 2,
            }}
          >

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Avatar sx={{ width: 128, height: 128 }} src={selectedAdoptionPet?.avatar} alt={selectedAdoptionPet?.name} />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5,
                }}
              >
                <Typography variant="h4"><b>{selectedAdoptionPet?.name}</b></Typography>
                <Typography>({selectedAdoptionPet?.species}, {selectedAdoptionPet?.sex}, {selectedAdoptionPet?.animal_race}, {selectedAdoptionPet?.pelage})</Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <FaCalendar size={20} />Nascido em: {dayjs(new Date(selectedAdoptionPet?.birth_date)).format("DD/MM/YYYY")} ({dayjs().from(dayjs(new Date(selectedAdoptionPet?.birth_date)), true)})
                </Typography>
              </Box>
            </Box>

            <Typography>
              {selectedAdoptionPet?.adoption_description}
            </Typography>

            {
              selectedAdoptionPet?.castration && (
                <Typography
                  variant="body1"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <FaCalendar size={20} />Castrado em: {dayjs(new Date(selectedAdoptionPet?.castration)).format("DD/MM/YYYY")} ({dayjs().from(dayjs(new Date(selectedAdoptionPet?.castration)), true)})
                </Typography>
              )
            }
            <Typography variant="body1">
              <b>Possui Pedigree:</b> {selectedAdoptionPet?.pedigree ? 'Sim' : 'Não'}
            </Typography>

            <Typography variant="body1">
              <b>Peso:</b> {selectedAdoptionPet?.weight} Kg
            </Typography>

            <Typography variant="body1">
              <b>Porte Físico:</b> {port_size[selectedAdoptionPet?.phisical_size]}
            </Typography>

            <Typography variant="body1">
              <b>Personalidade:</b>
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 3
              }}
            >
              {
                selectedAdoptionPet?.personality?.afetuoso && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <RiHeartAddFill color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Afetuoso</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.agressivo && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <IoWarningOutline color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Agressivo</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.alerta && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaBell color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Alerta</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.assustado && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaHeartbeat color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Assustado</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.ativo && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <BsBatteryFull color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Ativo</Typography>
                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.docil && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaHeart color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Dócil</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.curioso && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaSearch color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Curioso</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.explorador && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaGlobeAmericas color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Explorador</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.preguicoso && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <FaBed color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Preguiçoso</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.timido && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <RiUserUnfollowFill color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Tímido</Typography>

                  </Box>
                )
              }
              {
                selectedAdoptionPet?.personality?.tranquilo && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <IconButton
                      sx={{
                        border: '2px solid #1565c0'
                      }}
                    >
                      <BsEmojiSmile color="#1565c0" />
                    </IconButton>
                    <Typography variant="body1" textAlign="center">Tranquilo</Typography>

                  </Box>
                )
              }

            </Box>

            <Button variant="contained" color="primary" size="large">Cadastre-se para ver mais detalhes</Button>
          </Box>
        </Card>

      </Modal>

      <HomeNavigation />
      <Box
        sx={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 12,
          px: 1,
          backgroundColor: '#d0ebff'
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: size[0] < 720 ? 'column' : 'row',
            alignItems: size[0] < 720 ? 'center' : 'flex-start',
            justifyContent: size[0] < 720 ? 'center' : 'flex-start',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: size[0] < 720 ? 'center' : 'flex-start',
            width: '100%',
            gap: 2
          }}>
            <Typography variant="body1" color="primary">ADOTAR UM PET TAMBÉM É LEGAL 👋</Typography>
            <Typography sx={{ maxWidth: 450 }} variant="h2">Procure pelo seu novo companheiro online</Typography>
            <u></u>
            <Typography sx={{ maxWidth: 450 }} variant="body1">
              Com o app da CadastraPet você encontra pets para adotar e
              ainda consegue manter os dados do pet no app.
            </Typography>
            <Button sx={{ maxWidth: 450 }} variant="contained" color="primary" size="large" onClick={() => navigate("/tutor/cadastrar")}>CADASTRE SEU PET AGORA</Button>
          </Box>
          <CardMedia
            component="img"
            sx={{
              margin: '1.4rem 0',
              width: '50%',
              height: 'auto'
            }}
            src={ctaPhone}
            alt="Phone"
          />
        </Container>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            p: 2,
            my: 4,
          }}
        >
          <Typography variant="h3" color="primary">Adote um pet</Typography>
          <Typography variant="body1">Veja os pets que estão disponíveis para adoção</Typography>

          <Box sx={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: 'wrap',
            overflowX: 'auto',
            gap: 2,
            my: 2,
            pb: 1
          }}>
            {
              petList.length === 0 && (
                <Box sx={{
                  width: '100%',
                  display: "flex",
                  flexDirection: 'column',
                  alignItems: "center",
                  gap: 2,
                  my: 2,
                  pb: 1
                }}>
                  <CardMedia
                    component="img"
                    src={noDataImage}
                    alt="Sem dados"
                    sx={{
                      width: 450,
                      height: 'auto',
                    }} />

                  <Typography variant="body1" textAlign="center">Não foram encontrados pets ainda.<br /> Que tal cadastrar pets para adoção agora?</Typography>
                  <Button sx={{ maxWDidth: 450 }} variant="contained" color="primary" size="large" onClick={() => navigate("/tutor/cadastrar")}>CADASTRE PETS PARA ADOÇÃO AGORA</Button>
                </Box>
              )
            }
            {
              petList.length > 0 && petList?.map(pet => (
                <Card
                  onClick={() => {
                    setSelectedAdoptionPet(pet)
                    setOpen(true)
                  }}
                  key={pet?.uid}
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
                    border: 'none',
                    transition: '0.2s',
                    cursor: 'pointer',

                    '&:hover': {
                      filter: 'brightness(0.8)'
                    }
                  }}>
                  <CardMedia
                    component="img"
                    src={pet?.avatar === '' ? logo : pet?.avatar}
                    alt={pet?.name}
                    sx={{
                      width: 150,
                      height: 200,
                      display: 'flex',
                      alignItems: "center",
                      justifyContent: "center",
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
                    <Typography variant="body1" color="#FFF"><b>{pet?.name}</b></Typography>
                    {
                      pet?.birth_date && (
                        <Typography variant="caption" color="#FFF">
                          <b>
                            {dayjs().from(dayjs(new Date(pet?.birth_date)), true)}
                          </b>
                        </Typography>
                      )
                    }
                  </Box>
                </Card>
              ))
            }
          </Box>

        </Container>

      </Box >

      <Container>
        <Box
          sx={{
            width: "100%",
            py: 4,
            px: 4,
            backgroundColor: '#1971c2',
            borderRadius: 4,
            boxShadow: 3,
            display: 'flex',
            flexDirection: size[0] > 720 ? 'row' : 'column',
            alignItems: 'center',
            gap: 2,
            my: 4
          }}
        >
          <Typography variant="h3" color="white" textAlign="center">Quer colocar seus pets para adoção? Cadastre-se agora mesmo</Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: '#FFF',
              color: '#1971c2',
              '&:hover': {
                bgcolor: '#ccc',
                color: '#1971c2'
              }
            }}
            onClick={() => navigate("/tutor/cadastrar")}>Quero cadastrar meu pet para adoção</Button>
        </Box>
      </Container>
      <ContactSection location="Adoção pet Home" />
      <Footer />
      <Floating location="Adotar Pet Home" />
    </Box >
  );
}
