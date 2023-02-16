import { Box, Button, Card, CardMedia, Container, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from "react";
import { FaCheck, FaDog, FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import petImage from "../assets/images/pet.jpg";
import ctaPhone from "../assets/images/landing/mockup-cta-vet.png";
import AcceptTerms from "../components/AcceptTerms";
import ContactSection from "../components/ContactSection";
import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import { ConversionContextProvider } from "../context/ConversionContext";
import { useConversion } from "../hooks/useConversion";
import { useResize } from "../hooks/useResize";
import { useToast } from "../hooks/useToast";
import { phone as phoneMask } from "../utils/masks";


function VeterinarioComponent() {
  const { size } = useResize();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { conversion } = useConversion();
  const [isShow, setIsShow] = useState(false);
  const [myIp, setMyIp] = useState("");

  function handleCadastrar() {
    return navigate("/veterinario/cadastrar");
  }

  async function getCurrentIP() {
    await fetch("https://api.ipify.org/?format=json")
      .then((results) => results.json())
      .then((data) => {
        setMyIp(data.ip);
      });
  }

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required("O campo Nome é obrigatório"),
      phone: Yup.string().required("O campo Celular/Whatsapp é obrigatório").length(15, "Numero digitado incorreto!"),
      email: Yup.string().required("O campo Email é obrigatório").email("Digite um Email válido"),
      quant: Yup.number().required("O campo Quantidade de pets é obrigatório"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      quant: 1,
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  function handleDownload() {
    const downloadLink = document.createElement('a');
    downloadLink.href = './cuidados_pet.pdf';
    downloadLink.download = 'cuidados_pet.pdf';
    document.body.appendChild(downloadLink);
    setTimeout(() => {
      downloadLink.click();
    }, 500)
    document.body.removeChild(downloadLink);
  }

  async function handleSubmitForm(formValues) {
    handleDownload()
    if (await conversion(
      formValues.name,
      formValues.email,
      "Modal leaving home",
      formValues.phone,
      myIp,
      window.location.href,
      `Quantidade de pets: ${formValues.quant}`
    )) {
      setIsShow(false);
      localStorage.setItem("contact", true);
      addToast({
        message: 'Contato enviado com sucesso! Aguarde que enviaremos seu conteúdo!'
      })
      return;
    }
  }

  useEffect(() => {
    getCurrentIP();
  }, []);
  return (
    <Box
      component="div"
      onMouseLeave={() => {
        const isContacted = localStorage.getItem('contact')
        if (isContacted === null || JSON.parse(isContacted) === false) {
          setIsShow(true)
        }
      }}
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
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={isShow}
        onClose={() => {
          setIsShow(false);
          localStorage.setItem("contact", true);
        }}
      >
        <Card
          sx={{
            width: size[0] > 720 ? 870 : '90vw',
            height: '90vh',
            outline: 'none',
            position: 'relative',
          }}
        >
          <IconButton onClick={() => {
            setIsShow(false);
            localStorage.setItem("contact", true);
          }} sx={{ position: 'absolute', top: 8, left: 8, backgroundColor: "#00000033" }}>
            <FaTimes />
          </IconButton>
          <Grid container sx={{ height: '100vh' }}>
            {
              size[0] > 720 && (
                <Grid item xs={6} sx={{ pl: 0, pt: 0, height: '100vh' }}>
                  <CardMedia
                    component="img"
                    src={petImage}
                    sx={{
                      height: '100vh'
                    }}
                    alt="PET"
                  />
                </Grid>
              )
            }
            <Grid item xs={size[0] > 720 ? 6 : 12} sx={{ p: 0, height: '100vh' }}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  flexDirection: 'column',
                  gap: 1,
                  overflow: 'auto',
                  alignItems: 'center',
                  py: 2,
                  px: 1,
                }}
              >
                <Typography variant="h5" textAlign="center">
                  Não vá agora. Preparamos um conteúdo especial
                </Typography>
                <Typography variant="body1" textAlign="center">
                  Deixe seu email e Whatsapp que enviaremos pra você conteúdo
                  especial sobre cuidados com o pet. É de graça e prometemos que
                  não enviaremos Span.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    maxWidth: 320,
                    width: '100%',
                    flexDirection: 'column',
                    gap: 2,
                    pt: 2
                  }}
                  component="form"
                  onSubmit={formik.handleSubmit}
                >
                  <TextField
                    fullWidth
                    id="modal-name"
                    name="name"
                    label="Nome completo"
                    value={formik.values.name}
                    error={!!formik.errors.name}
                    helperText={formik.errors.name}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    fullWidth
                    id="modal-phone"
                    name="phone"
                    label="Celular/WhatsApp"
                    value={formik.values.phone}
                    error={!!formik.errors.phone}
                    helperText={formik.errors.phone}
                    inputProps={{ maxLength: 15 }}
                    onChange={(event) => {
                      formik.setFieldValue('phone', phoneMask(event.target.value))
                    }}
                  />
                  <TextField
                    fullWidth
                    id="modal-email"
                    name="email"
                    label="Coloque seu melhor email"
                    value={formik.values.email}
                    error={!!formik.errors.email}
                    helperText={formik.errors.email}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    fullWidth
                    type="number"
                    id="modal-how-many-pets"
                    name="quant"
                    label="Quantos pets você tem hoje?"
                    value={formik.values.quant}
                    error={!!formik.errors.quant}
                    helperText={formik.errors.quant}
                    onChange={formik.handleChange}
                  />
                  <Button type="submit" variant="contained" color="primary" startIcon={<FaDog />}>Quero receber o conteúdo</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Modal>
      <HomeNavigation />
      <Box
        sx={{
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* CTA */}
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
              <Typography variant="body1" color="primary">BOAS-VINDAS A CADASTRAPET 👋</Typography>
              <Typography sx={{ maxWidth: 450 }} variant="h2">Ajude a salvar e prolongar mais vidas de Pet</Typography>
              <u></u>
              <Typography sx={{ maxWidth: 450 }} variant="body1">
                A cadastrapet nasceu com o intuito de acabar com a falta de
                informação entre Veterinários e pais de pet, assim salvando mais vidas.
              </Typography>
              <Button sx={{ maxWidth: 450 }} variant="contained" color="primary" size="large" onClick={handleCadastrar}>Acesse o histórico de um Pet</Button>
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

        <Container
          sx={{
            maxWidth: size[0] < 720 ? '80%' : '980px',
            width: '100%',
            paddingBlock: 4,
            marginInline: 'auto',
            backgroundColor: '#FFF',
            border: '1px solid #CCC',
            borderRadius: 2,

            display: 'flex',
            flexDirection: size[0] < 720 ? 'column' : 'row',
            justifyContent: size[0] < 720 ? 'center' : 'space-evenly',
            alignItems: size[0] < 720 ? 'center' : 'flex-start',
            gap: 3,
            mt: -8,
            zIndex: 50,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h2">+139,3 Mi</Typography>
            <Typography variant="body2" color="primary">Pets em lares do Brasil</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h2">154,9 mil</Typography>
            <Typography variant="body2" color="primary">
              Profissionais registrados no CFMV
              <br />
              <small>Conselho Federal de Medicina Veterinária</small>
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h2">53,1 mil</Typography>
            <Typography variant="body2" color="primary">Clinicas em todo o Brasil</Typography>
          </Box>
        </Container>
        {/* CTA */}
        {/* features */}
        <Box sx={{
          width: '100vw',
          maxWidth: '980px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          my: 8,
          px: 2,
          gap: 4,
        }}>
          <Typography variant="body1" color="primary">
            SERVIÇOS
          </Typography>
          <Typography variant="h2" textAlign="center">
            Como podemos ajudá-lo a cuidar do seu pet?
          </Typography>
          <Grid container spacing={2}>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Registros médicos</b></Typography>
                <Typography variant="body1">
                  Armazene os Registros médicos do seu pet, como alergias,
                  cirurgias e fraturas.
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Carteria de vacinação</b></Typography>
                <Typography variant="body1">
                  Saiba o momento de renovar as doses das vacinas do seu pet.
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Histórico de vermífugos</b></Typography>
                <Typography variant="body1">
                  Tenha em mãos as marcas, os dias em que foram usados e o
                  lembrete de quando vermifugar novamente!
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Localizador do pet</b></Typography>
                <Typography variant="body1">
                  Tenha na palma da sua mão a localização do seu pet 24h.
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Agendamentos</b></Typography>
                <Typography variant="body1">
                  Agende consultas com nossos profissionais cadastrados e tenha o
                  lembrete do dia e cashback das consultas.
                </Typography>
              </Card>
            </Grid>
            <Grid item sx={4}>
              <Card sx={{
                width: 300,
                height: 250,
                p: 2.4,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                gap: 2,
              }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '50%',
                  }}
                >
                  <FaCheck color="#566dea" />
                </Box>
                <Typography variant="h5"><b>Rede de veterinários</b></Typography>
                <Typography variant="body1">
                  Fornecemos uma rede referenciada de veterinários cadastrados
                  mais perto de você!
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* features */}

        {/* testemonials */}
        {/* <section id="testemonials" className={styles.testemonials}>
        <p>DEPOIMENTOS</p>
        <h2>O que os clientes dizem sobre a CadastraPet</h2>
        <div className={styles.testemonialsList}>
          <div className={styles.testemonial}>
            <FaQuoteLeft color="#566dea" />
            <p>
              Tenha históricos médicos, de vacinação e de medicação completo
              do seu pet em qualquer lugar.
            </p>
            <div className={styles.userInfo}>
              <img src="./images/favicon.png" alt="imagem do usuario" />
              <p>Nome</p>
            </div>
          </div>
          <div className={styles.testemonial}>
            <FaQuoteLeft color="#566dea" />
            <p>
              Tenha históricos médicos, de vacinação e de medicação completo
              do seu pet em qualquer lugar.
            </p>
            <div className={styles.userInfo}>
              <img src="./images/favicon.png" alt="imagem do usuario" />
              <p>Nome</p>
            </div>
          </div>
        </div>
      </section> */}
        {/* testemonials */}
        {/* ctaContact */}
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
            }}
          >
            <Typography variant="h3" color="white" textAlign="center">Comece a cuidar dos pets na sua volta agora mesmo!</Typography>
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
              onClick={handleCadastrar}>Quero me cadastrar</Button>
          </Box>
        </Container>
        {/* ctaContact */}
        {/* video */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: size[0] < 720 ? 'column-reverse' : 'row',
            gap: 3,
            textAlign: size[0] > 720 ? 'start' : 'center',
            alignItems: 'center',
            my: 4,

          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              alignItems: size[0] < 720 ? 'center' : 'flex-start',
            }}
          >
            <Typography variant="body1" color="primary"><b>SOBRE NÓS</b></Typography>
            <Typography variant="h4">Entenda quem somos e por que existimos</Typography>
            <Typography variant="body2">
              A cadastrapet nasceu para os tutores terem uma forma de armazenar
              os registros médicos, vacinação e outros registros de forma online
              e segura para você ter sempre na mão os registros do seu pet.
              <br />
              <br />
              Com uma equipe empenhada a encontrar soluções que agregam aos
              tutores e veterinários e principalmente no cuidado do seu
              bichinho.
            </Typography>
            <Button variant="contained" color="primary" size="large" onClick={handleCadastrar}>Quero me cadasatrar</Button>
          </Box>
          <Box
            sx={{
              maxWidth: size[0] < 720 ? '90vw' : '50vw',
              width: '100%',
              height: 'auto',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <ReactPlayer
              style={{
                maxWidth: size[0] < 720 ? '90vw' : '50vw',
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
                overflow: 'hidden',
              }}
              url="./videos/Cadastrapet.mp4"
              width="100%"
              height="100%"
              controls={true}
            />
          </Box>
        </Container>
        {/* video */}
        <ContactSection location="Home" />
      </Box>
      <Footer />
      <AcceptTerms />
      <Floating location="Home Veterinário" />
    </Box >
  );
}

function Veterinario() {
  return (
    <ConversionContextProvider>
      <VeterinarioComponent />
    </ConversionContextProvider>
  );
}

export default Veterinario;
