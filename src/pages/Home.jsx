import { Box, Button, Card, CardMedia, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { useEffect, useMemo, useState } from "react";
import { FaCheck, FaDog, FaTimes } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import petImage from "../assets/images/pet.jpg";
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
import styles from "../styles/pages/Home.module.css";

function HomeComponent() {
  const { size } = useResize()
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { conversion } = useConversion();
  const [isShow, setIsShow] = useState(false);
  const [myIp, setMyIp] = useState("");

  function handleCadastrar() {
    return navigate("/tutor/cadastrar");
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

  async function handleSubmitForm(formValues) {
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
            width: '90vw',
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
        <section id="cta" className={styles.cta}>
          <div className={styles.rowContent}>
            <div className={styles.content}>
              <p className={styles.toptitle}>BOAS-VINDAS A CADASTRAPET 👋</p>
              <h2>Mantenha os registros do seu pet online</h2>
              <u></u>
              <p className={styles.contentSubtitle}>
                Com o app da CadastraPet os dados médicos do seu pet estarão
                disponíveis 24hs para você e seu veterinário de confiança.
              </p>
              <button onClick={handleCadastrar}>CADASTRE SEU PET AGORA</button>
            </div>
            <img
              className={[styles.hideImg, styles.ctaImg]}
              src="./images/landing/mockup-cta-2.png"
              alt=""
            />
          </div>
        </section>

        <div className={styles.ctaCards}>
          <div className={styles.ctaCard}>
            <h3>+139,3 Mi</h3>
            <p>Pets em lares do Brasil</p>
          </div>
          <div className={styles.ctaCard}>
            <h3>154,9 mil</h3>
            <p>
              Profissionais registrados no CFMV
              <br />
              <small>Conselho Federal de Medicina Veterinária</small>
            </p>
          </div>
          <div className={styles.ctaCard}>
            <h3>53,1 mil</h3>
            <p>Clinicas em todo o Brasil</p>
          </div>
        </div>
        {/* CTA */}
        {/* features */}
        <section id="features" className={styles.features}>
          <p>SERVIÇOS</p>
          <h2>Como podemos ajudá-lo a cuidar do seu pet?</h2>
          <div className={styles.cardList}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Registros médicos</h2>
              <p>
                Armazene os Registros médicos do seu pet, como alergias,
                cirurgias e fraturas.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Carteria de vacinação</h2>
              <p>Saiba o momento de renovar as doses das vacinas do seu pet.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Histórico de vermífugos</h2>
              <p>
                Tenha em mãos as marcas, os dias em que foram usados e o
                lembrete de quando vermifugar novamente!
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Localizador do pet</h2>
              <p>Tenha na palma da sua mão a localização do seu pet 24h.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Agendamentos</h2>
              <p>
                Agende consultas com nossos profissionais cadastrados e tenha o
                lembrete do dia e cashback das consultas.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FaCheck color="#566dea" />
              </div>
              <h2>Rede de veterinários</h2>
              <p>
                Fornecemos uma rede referenciada de veterinários cadastrados
                mais perto de você!
              </p>
            </div>
          </div>
        </section>
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
        <section id="contact" className={styles.contact}>
          <h2>Comece a cuidar do seu pet agora mesmo</h2>
          <button onClick={handleCadastrar}>Quero cadastrar meu pet</button>
        </section>
        {/* ctaContact */}
        {/* video */}
        <section id="video" className={styles.video}>
          <div className={styles.videoContainer}>
            <p className={styles.titleVideoContainer}>SOBRE NÓS</p>
            <h2>Entenda quem somos e por que existimos</h2>
            <p className={styles.aboutText}>
              A cadastrapet nasceu para os tutores terem uma forma de armazenar
              os registros médicos, vacinação e outros registros de forma online
              e segura para você ter sempre na mão os registros do seu pet.
              <br />
              <br />
              Com uma equipe empenhada a encontrar soluções que agregam aos
              tutores e veterinários e principalmente no cuidado do seu
              bichinho.
            </p>
            <button onClick={handleCadastrar}>Quero cadastrar meu pet</button>
          </div>
          <div className={styles.videoIframe}>
            <ReactPlayer
              className={styles.videoIframe}
              url="./videos/Cadastrapet.mp4"
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </section>
        {/* video */}
        <ContactSection location="Home" />
      </Box>
      <Footer />
      <AcceptTerms />
      <Floating location="tutor" />
    </Box >
  );
}

function Home() {
  return (
    <ConversionContextProvider>
      <HomeComponent />
    </ConversionContextProvider>
  );
}

export default Home;
