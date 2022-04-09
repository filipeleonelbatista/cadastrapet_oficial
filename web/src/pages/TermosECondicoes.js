import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
} from "react-icons/fa";
import Floating from "../components/Floating";
import HomeNavigation from "../components/HomeNavigation";
import styles from "../styles/pages/Home.module.css";

function TermosECondicoes() {
  return (
    <div id="landing-page" className={styles.container}>
      <header>
        <nav>
          <div className={styles.brand}>
            <a href="/">
              <img
                className={styles.imgBrand}
                src="./images/logo.png"
                alt="CadastraPet | Cadastrando e prolongando vidas"
              />
            </a>
          </div>
          <HomeNavigation />
        </nav>
      </header>
      <main>
        {/* how */}
        <section id="how" className={styles.how}>
          <h2>Termos e condições</h2>
          <p>Esta será a página dos termos de uso e condições</p>
        </section>
        {/* how */}
        {/* cta2 */}
        <section id="cta2" className={styles.cta2}>
          <h2>
            Com o CadastraPet, você cria a ficha do seu pet, mantem os dados
            clinicos atualizados e tem essas informaçõe disponíveis para seu
            veterinário!
          </h2>
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
      <Floating />
    </div>
  );
}

export default TermosECondicoes;
