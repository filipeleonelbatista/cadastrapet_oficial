import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logoImg from "../assets/logo_white.svg";
import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <img src={logoImg} alt="CadastraPet" />
        <p>&copy; {new Date(Date.now()).getFullYear()} - CadastraPet</p>
        <p>Todos os direitos reservados</p>
      </div>
      <div className={styles.socialNetworks}>
        <a href="https://instagram.com/cadastra.pet">
          <FaInstagram />
        </a>
        <a href="https://fb.me/cadastra.pet">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/company/cadastrapet/">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
