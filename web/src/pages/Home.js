import { useEffect, useState } from "react";
import {
  FaDiscord, FaFacebook, FaFacebookMessenger, FaHandHoldingHeart,
  FaInstagram, FaMobile,
  FaShareAlt,
  FaWhatsapp
} from "react-icons/fa";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link } from 'react-router-dom';
import Floating from '../components/Floating';
import api from "../services/api";
import { sendDiscordNotification } from "../services/discord-notify";
import styles from "../styles/pages/Home.module.css";

function Home() {
  const [isShow, setIsShow] = useState(false);
  const [isShowStatusMessage, setIsShowStatusMessage] = useState(false);
  const [statusmessage, setstatusmessage] = useState(false);
  const [name, setname] = useState("");
  const [telefone, settelefone] = useState("");
  const [email, setemail] = useState("");
  const [quant, setquant] = useState("");
  const [myIp, setMyIp] = useState("");

  async function getCurrentIP() {
    await fetch("https://api.ipify.org/?format=json")
      .then(results => results.json())
      .then(data => {
        setMyIp(data.ip)
      })
  }

  function handleToggleModal() {
    setIsShow(!isShow);
  }

  function handleToggleModalStatusMessage() {
    setIsShowStatusMessage(!isShowStatusMessage);
  }

  async function handleForm() {
    if (!name || !telefone || !email || !quant) {
      alert("Por favor preencha todos os campos");
      return;
    }

    const data = {
      ip: myIp,
      tipoContato: "Modal landing tutor",
      celular: telefone,
      email,
      nome: name,
      mensagem: `Quantidade de pets: ${quant}`,
      feitoContato: false,
      convertido: false
    }

    const whatsMessage =
      `Olá
      Recebemos seu interesse em acessar o nosso app
      Logo mandaremos mais detalhes sobre como voce poderá ter acesso ao nosso app

      Att,  Equipe Cadastra Pet
      `
    const discordMessage = `
      Contato feito pelo form da Modal landing tutor
      
**Nome:** ${data.nome}
**IP:** ${data.ip}
**Celular:** ${data.celular}
**Email:** ${data.email}

https://wa.me/+55${data.celular.replace(/\D/g, "")}?text=${encodeURI(whatsMessage)}
`

    sendDiscordNotification(discordMessage, 'doguinho')

    const result = await api.post("contatos", data);
    if (result.status === 201) {
      setname('')
      settelefone('')
      setemail('')
      setquant('')
      handleToggleModal();
      setstatusmessage(true)
      setIsShowStatusMessage(true);
      return
    } else {
      handleToggleModal();
      setstatusmessage(false)
      setIsShowStatusMessage(true);
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

  useEffect(() => {
    getCurrentIP();
  }, [])

  return (
    <div id="landing-page" className={styles.container}>
      {isShowStatusMessage && (
        <div id="modal-status" className={styles.modalStatus}>
          <div className={styles.statusContainer} style={statusmessage ? { color: 'green' } : { color: 'red' }}>
            <button
              onClick={handleToggleModalStatusMessage}
              type="button"
              className={styles.closeButton}
            >
              X
            </button>
            <p>{statusmessage ? "Sua mensagem foi enviada com sucesso!" : "Houve um problema ao enviar seu cadastro, tente novamente mais tarde!"}</p>
          </div>
        </div>
      )}
      {isShow && (
        <div id="modal-cta" className={styles.modalCta}>
          <div className={styles.cardContainer}>
            <button
              onClick={handleToggleModal}
              type="button"
              className={styles.closeButton}
            >
              X
            </button>
            <div className={styles.imageContainer}></div>
            <div className={styles.formContainer}>
              <h4>
                Quer ser notificado quando o app lançar e ganhar acesso ao
                conteúdo premium por 2 meses?
              </h4>
              <u></u>
              <ul>
                <li>Cadastre mais de um bixinho</li>
                <li>Acesso a carteira digital de vacinação</li>
                <li>Histórico detalhado de consultas</li>
                <li>E mais...</li>
              </ul>

              <div>
                <label htmlFor="nome">Nome completo</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="telefone">Telefone</label>
                <input
                  type="text"
                  maxLength={15}
                  value={telefone}
                  onChange={(e) => settelefone(handleMaskPhoneNumber(e.target.value))}
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
      <header>
        <nav>
          <div className={styles.brand}>
            <img
              className={styles.imgBrand}
              src="./images/logo.png"
              alt="CadastraPet | Cadastrando e prolongando vidas"
            />
          </div>
          <div className={styles.menuItems}>
            <Link to="/veterinario">Sou Veterinário</Link>
          </div>
        </nav>
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
            <button onClick={handleToggleModal}>
              Quero ter um cadastro digital do meu pet
            </button>
            <div style={{ display:'flex', flexDirection: 'row', gap: '0.8rem', margin: '2.4rem'}}>
              <a href="/">
                <img src="./images/googleplay.png" alt="android" style={{ width: '150px', height: 'auto', borderRadius: '8px', opacity: 0.6 }} />
              </a>
              <a href="/">
                <img src="./images/applestore.png" alt="apple" style={{ width: '150px', height: 'auto', borderRadius: '8px', opacity: 0.6 }} />
              </a>
            </div>
          </div>
          <img className={styles.hideImg} src="./images/landing/mockup-cta.png" alt="" />
        </section>
        {/* CTA */}
        {/* About */}
        <section id="about" className={styles.about}>
          <img className={styles.hideImg} src="./images/landing/landing-about.png" alt="" />
          <div className={styles.contentAbout}>
            <h2>Acesse a carteira digital de vacinação do seu pet!</h2>
            <u></u>
            <p>
              Voce poderá ter acesso a todas as vacinas, históricos de vacinação
              e controle sobre renovações.
            </p>
            <button onClick={handleToggleModal}>Quero cadastrar meu pet</button>
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
        {/* catalog */}
        <section id="catalog" className={styles.catalog}>
          <h2>Veja como é fácil cadastrar os dados do seu Pet:</h2>
          {/* <div onMouseDown={handleMouseDown} className={styles.carrossel}> */}
          <ScrollContainer className={styles.carrossel}>
            <div className={styles.cardItem}>
              {/* <h2>1</h2>
              <p>Através de uma rede social, ele abre o link do seu catálogo</p> */}
              <img src="./images/landing/slider-1.png" alt="" />
            </div>
            <div className={styles.cardItem}>
              {/* <h2>2</h2>
              <p>Seleciona a categoria</p> */}
              <img src="./images/landing/slider-2.png" alt="" />
            </div>
            <div className={styles.cardItem}>
              {/* <h2>3</h2>
              <p>Escolhe o produto</p> */}
              <img src="./images/landing/slider-3.png" alt="" />
            </div>
            <div className={styles.cardItem}>
              {/* <h2>4</h2>
              <p>Vê as informações do anúncio e adiciona a sacola</p> */}
              <img src="./images/landing/slider-4.png" alt="" />
            </div>
          </ScrollContainer>
          {/* </div> */}
        </section>
        {/* catalog */}
        {/* cta2 */}
        <section id="cta2" className={styles.cta2}>
          <h2>
            Com o CadastraPet, você cria a ficha do seu pet, mantem os dados
            clinicos atualizados e tem essas informaçõe disponíveis para seu
            veterinário!
          </h2>
          <button onClick={handleToggleModal}>Cadastre meu pet agora</button>
        </section>
        {/* cta2 */}
      </main>
      <footer>
        <div className={styles.footerContent}>
          <img src="./images/logo.png" alt="CadastraPet" />
          <div className="social-networks">
            <a href="https://wa.me/+5551986445578">
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
          </div>
        </div>
        <div className={styles.footerLinks}>
          <a href="/">Políticas e privacidade</a>
          <a href="/">Termos de uso</a>
        </div>
      </footer>
      <Floating />
    </div>
  );
}

export default Home;