import { useEffect, useState } from "react";
import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaHandHoldingHeart,
  FaInstagram,
  FaMobile,
  FaShareAlt,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Floating from "../components/Floating";
import HomeNavigation from "../components/HomeNavigation";
import InstaFeed from "../components/InstaFeed";
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
      id="landing-page"
      onMouseLeave={handleToggleModal}
      className={styles.container}
    >
      {isShow && (
        <div id="modal-cta" className={styles.modalCta}>
          <div className={styles.cardContainer}>
            <button
              onClick={() => {
                setIsClose(true);
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
      <header className={styles.header}>
        <a href="/">
          <img
            className={styles.navImage}
            src="./images/logo.png"
            alt="CadastraPet | Cadastrando e prolongando vidas"
          />
        </a>
        <HomeNavigation />
      </header>
      <main>
        {/* CTA */}
        <section id="cta" className={styles.cta}>
          <div className={styles.content}>
            <h2>Crie um cadastro digital completo para seu pet</h2>
            <u></u>
            <p>
              Tenha informações clinicas importantes sobre seu animalzinho de
              forma acessível.
            </p>
            <button onClick={handleCadastrar}>
              Quero ter um cadastro digital do meu pet
            </button>

            <div className={styles.mobile}>
              <a
                href="https://play.google.com/store/apps/details?id=com.cadastrapet.co"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src="./images/googleplay.png"
                  alt="android"
                  className={styles.mobileBanner}
                />
              </a>
              <a href="/">
                <img
                  src="./images/applestore.png"
                  alt="apple"
                  className={styles.mobileBanner}
                  style={{
                    opacity: "0.6",
                  }}
                />
              </a>
            </div>
          </div>
          <img
            className={[styles.hideImg, styles.ctaImg]}
            src="./images/landing/mockup-cta.png"
            alt=""
          />
        </section>
        {/* CTA */}
        {/* About */}
        <section id="about" className={styles.about}>
          <img
            className={styles.hideImg}
            src="./images/landing/landing-about.png"
            alt=""
          />
          <div className={styles.contentAbout}>
            <h2>Acesse a carteira digital de vacinação do seu pet!</h2>
            <u></u>
            <p>
              Voce poderá ter acesso a todas as vacinas, históricos de vacinação
              e controle sobre renovações.
            </p>
            <button onClick={handleCadastrar}>Quero cadastrar meu pet</button>
          </div>
        </section>
        {/* About */}
        {/* features */}
        <section id="features" className={styles.features}>
          <h2>Confira os benefícios de ter seu pet cadastrado:</h2>
          <div className={styles.cardList}>
            <div className={styles.card}>
              <FaHandHoldingHeart size={28} color="#566dea" />
              <h2>Informações na palma da mão</h2>
              <p>
                Tenha históricos médicos, de vacinação e de medicação completo
                do seu pet em qualquer lugar.
              </p>
            </div>
            <div className={styles.card}>
              <FaMobile size={28} color="#566dea" />
              <h2>Facilidade de uso</h2>
              <p>
                Acesso fácil tanto para o dono quanto para o médico que irá
                consultar o seu animal.
              </p>
            </div>
            <div className={styles.card}>
              <FaShareAlt size={28} color="#566dea" />
              <h2>Compartilhamento de informações</h2>
              <p>
                Mantenha a informação compartilhada entre os doutores do seu pet
              </p>
            </div>
          </div>
        </section>
        {/* features */}

        <InstaFeed />
        {/* how */}
        <section id="how" className={styles.how}>
          <h2>Veja como seu veterinário irá adicionar dados no seu pet</h2>
          <p>
            Voce informa o codigo do seu pet e ele irá abrir uma tela como a
            tela a baixo para adicionar as informações da consulta.
          </p>
          <img src="./images/landing/how.png" alt="" />
        </section>
        {/* how */}
        {/* cta2 */}
        <section id="cta2" className={styles.cta2}>
          <h2>
            Com o CadastraPet, você cria a ficha do seu pet, mantem os dados
            clinicos atualizados e tem essas informaçõe disponíveis para seu
            veterinário!
          </h2>
          <button onClick={() => navigate("/tutor/cadastrar")}>
            Cadastre meu pet agora
          </button>
        </section>
        {/* cta2 */}
      </main>
      <footer>
        <div className={styles.footerContent}>
          <img src="./images/logo.png" alt="CadastraPet" />
          <div className="social-networks">
            <a href="https://wa.me/+5551986320477">
              <FaWhatsapp />
            </a>
            <a href="https://instagram.com/cadastra.pet">
              <FaInstagram />
            </a>
            <a href="https://fb.me/cadastra.pet">
              <FaFacebook />
            </a>
            <a href="https://m.me/cadastra.pet">
              <FaFacebookMessenger />
            </a>
            <a href="https://discord.gg/tSTqcBceaA">
              <FaDiscord />
            </a>
            <a href="https://www.linkedin.com/company/cadastrapet/">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className={styles.footerLinks}>
          <a href="/politicas-de-privacidade">Políticas e privacidade</a>
          <a href="/termos-e-condicoes">Termos de uso</a>
        </div>
      </footer>
      <Floating location="tutor" />
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
