import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import logoImg from "../assets/icon_white.png";
import dogImg from "../assets/images/pet.jpg";
import BackButton from "../components/BackButton";
import Version from "../components/Version";
import { Widget } from "../components/Widget";
import styles from "../styles/pages/Playground.module.css";

function Playground() {
  const navigate = useNavigate();

  if (!window.location.href.includes("localhost")) {
    return navigate("/");
  }
  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
      <BackButton path="/" />
      <div className={styles.header}>
        <h4 className={styles.petName}>Playground</h4>
      </div>
      <div className={styles.content}>
        <div className={styles.border}>
          <div className={styles.bgDocumentContent}>
            <img src={logoImg} width={40} alt="Cadastrapet logo" />
            <strong className={styles.documentTitle}>
              REGISTRO GERAL DE ANIMAIS - CADASTRAPET
            </strong>
          </div>
          <div className={styles.petData}>
            <div className={styles.imageFrame}>
              <img
                src={dogImg}
                alt="Doguinho"
                style={{
                  backgroundImage: `url(${dogImg})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "0.8rem",
                }}
              />
            </div>
            <div>
              <p>
                <b>Nome: </b> Doguinho da Silva
                <br />
                <b>Tipo: </b> Cão
                <br />
                <b>Raça: </b> Labrador
                <br />
                <b>Sexo: </b> Macho
                <br />
                <b>Tutor: </b> Filipe Batista
              </p>
              <br />
              <p>
                <b>IdPet: </b> 7aMhWM19yfqRhrVxMGp3
                <br />
                <b>Coleira: </b> VxMGp3
              </p>
            </div>
          </div>
        </div>
        <div className={styles.border}>
          <div className={styles.bgDocumentContent}>
            <img src={logoImg} width={40} alt="Cadastrapet logo" />
            <strong className={styles.documentTitle}>
              REGISTRO GERAL DE ANIMAIS - CADASTRAPET
            </strong>
          </div>
          <div className={styles.petData}>
            <div className={styles.qrCodeFrame}>
              <QRCode
                size={190}
                value={"https://cadastrapet.com.br/pet/7aMhWM19yfqRhrVxMGp3"}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ textAlign: "center" }}>
                Passe o leitor de <b>QR CODE</b> do celular <br />
                Ou digite o código no site
                <br />
                <b>https://cadastrapet.com.br</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Version />
      <Widget />
    </div>
  );
}

export default Playground;
