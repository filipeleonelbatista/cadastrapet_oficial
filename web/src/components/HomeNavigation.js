import { useState } from "react";
import { FaBars, FaDog, FaSignInAlt, FaUserMd, FaHome } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/components/HomeNavigation.module.css";
import logoImg from "../assets/logo_x.png";

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

  const handleIsShowMenu = () => {
    setIsShow(!isShow);
  };

  return (
    <header className={styles.header}>
      <img
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
        className={styles.navImage}
        src={logoImg}
        alt="CadastraPet | Cadastrando e prolongando vidas"
      />
      <div className={styles.container}>
        <div className={styles.navItems}>
          <Link
            to="/"
            className={
              location.pathname === "/" ? styles.navItemActive : styles.navItem
            }
          >
            Sou tutor
          </Link>
          <Link
            to="/veterinario"
            className={
              location.pathname.includes("veterinario")
                ? styles.navItemActive
                : styles.navItem
            }
          >
            Sou Veterinário
          </Link>
          <Link
            to="/sobre-nos"
            className={
              location.pathname.includes("sobre-nos")
                ? styles.navItemActive
                : styles.navItem
            }
          >
            Sobre nós
          </Link>
          <Link to="/entrar" className={styles.navItemDestaque}>
            <FaSignInAlt />
            Entrar
          </Link>
        </div>

        <div className={styles.navItemsTablet}>
          <Link to="/entrar" className={styles.menuItemTablet}>
            <FaSignInAlt />
            Entrar
          </Link>
        </div>

        <button className={styles.roundedButton} onClick={handleIsShowMenu}>
          <FaBars size={18} />
        </button>
        {isShow && (
          <div className={styles.menuItems}>
            <Link to="/" className={styles.menuItem}>
              <FaDog /> Sou tutor
            </Link>
            <Link to="/veterinario" className={styles.menuItem}>
              <FaUserMd /> Sou Veterinário
            </Link>
            <Link to="/sobre-nos" className={styles.menuItem}>
              <FaHome /> Sobre nós
            </Link>
            <Link to="/entrar" className={styles.menuItemCelular}>
              <FaSignInAlt />
              Entrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
