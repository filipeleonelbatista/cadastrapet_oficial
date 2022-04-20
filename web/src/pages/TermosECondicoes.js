import Floating from "../components/Floating";
import Footer from "../components/Footer";
import HomeNavigation from "../components/HomeNavigation";
import styles from "../styles/pages/Home.module.css";

function TermosECondicoes() {
  return (
    <div id="landing-page" className={styles.container}>
      <HomeNavigation />
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
      <Footer />
      <Floating />
    </div>
  );
}

export default TermosECondicoes;
