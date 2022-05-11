import { useEffect, useState } from "react";
import { FaHandHoldingHeart, FaMobile, FaShareAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AcceptTerms from "../components/AcceptTerms";
import ContactForm from "../components/ContactForm";
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
            {/* 
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
            </div> */}
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
        {/* video */}
        <section id="video" className={styles.video}>
          <h2>Veja um pouco mais da Cadastrapet</h2>
          <iframe
            src="https://www.youtube.com/embed/fEb959hHO7A"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <button onClick={handleCadastrar}>Quero cadastrar meu pet</button>
        </section>
        {/* video */}
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

        <ContactForm location="Homepage" />
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
