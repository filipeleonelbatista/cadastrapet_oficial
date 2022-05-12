import teamImg from "../assets/images/about_team.png";
import filipeImg from "../assets/images/teamMembers/filipe.png";
import jeremiasImg from "../assets/images/teamMembers/jeremias.png";
import logoWhite from "../assets/images/teamMembers/logo_white.png";
import raphaelImg from "../assets/images/teamMembers/raphael.png";
import teamLogo from "../assets/images/teamMembers/team_logo.png";
import AcceptTerms from "../components/AcceptTerms";
import ContactForm from "../components/ContactForm";
import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import styles from "../styles/pages/SobreNos.module.css";

function SobreNos() {
  return (
    <div id="landing-page" className={styles.container}>
      <HomeNavigation />
      <main>
        {/* CTA */}
        <section id="cta" className={styles.cta}>
          <img
            className={[styles.hideImg, styles.ctaImg]}
            src={teamImg}
            alt="Time"
          />
          <div className={styles.content}>
            <h2>Sobre nossa equipe</h2>
            <u></u>
            <p>
              A cadastrapet nasceu para os tutores terem uma forma de armazenar
              os registros médicos, vacinação e outros registros de forma online
              e segura para você ter sempre na mão os registros do seu pet.
              <br />
              <br />
              Com uma equipe empenhada a encontrar soluções que agregam aos
              tutores e veterinários e principalmente no cuidado do seu
              bichinho.
            </p>
          </div>
        </section>
        {/* CTA */}

        {/* features */}
        <section id="features" className={styles.features}>
          <img
            className={styles.teamLogo}
            src={teamLogo}
            alt="Time Cadastrapet"
          />
          <img className={styles.logoWhite} src={logoWhite} alt="Cadastrapet" />
          <div className={styles.featuresTitleContainer}>
            <h2>Nossa Equipe</h2>
            <p>
              Profissionais dedicados para entregar a melhor experiência para
              você
            </p>
          </div>
          <div className={styles.featuresContainer}>
            <div className={styles.teamMembers}>
              <a
                href="https://linkedin.com/in/filipeleonelbatista"
                rel="noopener noreferrer"
                className={styles.teamMember}
              >
                <img src={filipeImg} alt="Filipe Batista" />
                <div className={styles.teamMembersInfo}>
                  <strong>Filipe Batista</strong>
                  <p>Desenvolvedor</p>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/jeremias-pauperio-003bb9169"
                rel="noopener noreferrer"
                className={styles.teamMember}
              >
                <img src={jeremiasImg} alt="Jeremias P." />
                <div className={styles.teamMembersInfo}>
                  <strong>Jeremias P.</strong>
                  <p>Negócios</p>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/raphael-calixto-bueno-15aa7416b"
                rel="noopener noreferrer"
                className={styles.teamMember}
              >
                <img src={raphaelImg} alt="Raphael Bueno" />
                <div className={styles.teamMembersInfo}>
                  <strong>Raphael Bueno</strong>
                  <p>Negócios</p>
                </div>
              </a>
            </div>
          </div>

          <ContactForm location="AboutUsPage" />
        </section>
        {/* features */}

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
      <Footer />
      <Floating />
      <AcceptTerms />
    </div>
  );
}

export default SobreNos;
