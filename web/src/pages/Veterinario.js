import { useEffect, useState } from "react";
import {
  FaMobileAlt,
  FaArrowRight,
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaHandHoldingHeart,
  FaInstagram,
  FaQrcode,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Floating from "../components/Floating";
import HomeNavigation from "../components/HomeNavigation";
import { ConversionContextProvider } from "../context/ConversionContext";
import { useConversion } from "../hooks/useConversion";
import styles from "../styles/pages/Veterinario.module.css";
import { isStringEmpty } from "../utils/string";

function VeterinarioComponent() {
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
      "Modal leaving veterinario",
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
      <HomeNavigation />
      <main>
        {/* CTA */}
        <section id="cta" className={styles.cta}>
          <img
            className={[styles.hideImg, styles.ctaImg]}
            src="./images/landing/mockup-cta-vet.png"
            alt=""
          />
          <div className={styles.content}>
            <h2>Ajude a salvar e prolongar mais vidas de Pet</h2>
            <u></u>
            <p>
              A cadastrapet nasceu com o intuito de acabar com a falta de
              informação entre Veterinários e pais de pet, assim salvando mais
              vidas.
            </p>
            <button onClick={handleCadastrar}>
              Acessar o histórico de um Pet
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
        </section>
        {/* CTA */}
        {/* About */}
        <section id="about" className={styles.about}>
          <div className={styles.contentAbout}>
            <h2>Registre consultas e vacinas de forma segura</h2>
            <u></u>
            <p>
              Com o nosso sistema é possível fazer registros seguros, usando seu
              número de cmrv
            </p>
          </div>
          <img
            className={styles.hideImg}
            src="./images/landing/landing-about-vet.png"
            alt=""
          />
        </section>
        {/* About */}
        {/* features */}
        <section id="features" className={styles.features}>
          <div className={styles.featuresContainer}>
            <h2>
              Sem mais confusão em falta de informação na hora da consulta
            </h2>
            <div className={styles.cardList}>
              <div className={styles.card}>
                <FaQrcode size={42} color="#566dea" />
                <h2>Conexão fácil via QR code</h2>
              </div>
              <div className={styles.card}>
                <FaHandHoldingHeart size={42} color="#566dea" />
                <h2>Controle completo do histórico médico </h2>
              </div>
              <div className={styles.card}>
                <FaMobileAlt size={42} color="#566dea" />
                <h2>Funciona em computadores e celulares</h2>
              </div>
            </div>
            <div className={styles.featuresButtonContainer}>
              <button className={styles.featuresButton}>
                Acessar o histórico de um Pet <FaArrowRight size={12} />
              </button>
            </div>
            <img src="./images/landing/how_vet.png" alt="" />
          </div>
        </section>
        {/* features */}
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
      <Floating location="veterinario" />
    </div>
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
