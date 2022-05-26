import { useEffect, useState } from "react";
import { FaBars, FaDog, FaSignInAlt, FaUserMd } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/new_logo.svg";
import styles from "../styles/components/HomeNavigation.module.css";

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

  const handleIsShowMenu = () => {
    setIsShow(!isShow);
  };

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${
        offset > 100 ? styles.headerFloating : ""
      }`}
    >
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
          <Link to="/entrar" className={styles.navItemDestaque}>
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
            <Link to="/entrar" className={styles.menuItem}>
              <FaSignInAlt />
              Entrar
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
