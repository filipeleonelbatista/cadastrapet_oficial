import {
  // FaDiscord,
  FaFacebook,
  // FaFacebookMessenger,
  FaInstagram,
  FaLinkedin,
  // FaWhatsapp,
} from "react-icons/fa";
import logoImg from "../assets/logo_x.png";
import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img src={logoImg} alt="CadastraPet" />
        <div className="social-networks">
          {/* <a href="https://wa.me/+5551986320477">
            <FaWhatsapp />
          </a> */}
          <a href="https://instagram.com/cadastra.pet">
            <FaInstagram />
          </a>
          <a href="https://fb.me/cadastra.pet">
            <FaFacebook />
          </a>
          {/* <a href="https://m.me/cadastra.pet">
            <FaFacebookMessenger />
          </a>
          <a href="https://discord.gg/tSTqcBceaA">
            <FaDiscord />
          </a> */}
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
  );
}
