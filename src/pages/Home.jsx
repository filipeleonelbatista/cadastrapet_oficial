import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import AcceptTerms from "../components/AcceptTerms";
import ContactSection from "../components/ContactSection";
import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import { ConversionContextProvider } from "../context/ConversionContext";
import { useConversion } from "../hooks/useConversion";

import styles from "../styles/pages/Home.module.css";
import { isStringEmpty } from "../utils/string";

function HomeComponent() {
  const navigate = useNavigate();

  const { conversion } = useConversion();
  const [isShow, setIsShow] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [isSendedMessage, setIsSendedMessage] = useState(false);
  const [name, setname] = useState("");
  const [telefone, settelefone] = useState("");
  const [email, setemail] = useState("");
  const [quant, setquant] = useState("");
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

  function handleToggleModal() {
    const isContacted = localStorage.getItem("contact");

    if (isContacted) {
      setIsShow(false);
      return;
    }

    if (!isClose) {
      if (isSendedMessage) {
        alert(
          "Seu cadastro já foi realizado, aguarde nosso email de contato. Obrigado!"
        );
      } else {
        setIsShow(true);
      }
    } else {
      setIsShow(false);
    }
  }

  function handleNumberOnly(value) {
    value = value.replace(/\D/g, "");
    return value;
  }

  function handleMaskPhoneNumber(value) {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
  }

  const ValidateFields = () => {
    if (isStringEmpty(name)) {
      alert("O campo nome não foi preenchido");
      return true;
    }
    if (telefone.length < 15) {
      if (isStringEmpty(telefone)) {
        alert("O campo Telefone não foi preenchido");
        return true;
      } else {
        alert("O campo Telefone não está completo");
        return true;
      }
    }
    if (isStringEmpty(email)) {
      alert("O campo Email não foi preenchido");
      return true;
    }
    if (isStringEmpty(quant)) {
      alert("O campo Quantidade de pets não foi preenchido");
      return true;
    }
  };

  async function handleForm() {
    if (ValidateFields()) return;

    const isConversionSaved = await conversion(
      name,
      email,
      "Modal leaving home",
      telefone,
      myIp,
      window.location.href,
      `Quantidade de pets: ${quant}`
    );

    if (isConversionSaved) {
      setname("");
      settelefone("");
      setemail("");
      setquant("");
      setIsSendedMessage(true);
      setIsClose(true);
      setIsShow(false);

      localStorage.setItem("contact", true);
      return;
    } else {
      handleToggleModal();
    }
  }

  useEffect(() => {
    getCurrentIP();
  }, []);
  return (
    <div
      onMouseLeave={handleToggleModal}
      className={styles.container}
    >
      {isShow && (
        <div id="modal-cta" className={styles.modalCta}>
          <div className={styles.cardContainer}>
            <button
              onClick={() => {
                setIsClose(true);
                localStorage.setItem("contact", true);
                handleToggleModal();
              }}
              type="button"
              className={styles.closeButton}
            >
              X
            </button>
            <div className={styles.imageContainer}></div>
            <div className={styles.formContainer}>
              <h2>Não vá agora. Preparamos um conteúdo especial</h2>
              <p>
                Deixe seu email e Whatsapp que enviaremos pra você conteúdo
                especial sobre cuidados com o pet. É de graça e prometemos que
                não enviaremos Span.
              </p>

              <div>
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefone">Whatsapp</label>
                <input
                  type="text"
                  maxLength={15}
                  value={telefone}
                  onChange={(e) =>
                    settelefone(handleMaskPhoneNumber(e.target.value))
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="quant">Quantos pets você tem hoje?</label>
                <input
                  type="text"
                  value={quant}
                  onChange={(e) => setquant(handleNumberOnly(e.target.value))}
                />
              </div>
              <button onClick={handleForm}>Enviar</button>
            </div>
          </div>
        </div>
      )}
      <HomeNavigation />
      <main>
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
      </main>
      <Footer />
      <Floating location="tutor" />
      <AcceptTerms />
    </div>
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
