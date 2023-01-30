import logoImg from "../assets/logo_x.png";

import styles from "../styles/pages/NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={logoImg} alt="CadastraPet" />
        <h1>404</h1>
        <p>Esta página não foi encontrada</p>
      </div>
    </div>
  );
}

export default NotFound;
