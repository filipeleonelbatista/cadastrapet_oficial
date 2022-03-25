import { useState } from "react";
import { FaBars, FaDog, FaSignInAlt, FaUserMd } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/components/HomeNavigation.module.css";

export default function HomeNavigation() {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);

  const handleIsShowMenu = () => {
    setIsShow(!isShow);
  };

  return (
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
          <Link to="/tutor" className={styles.menuItem}>
            <FaDog /> Sou tutor
          </Link>
          <Link to="/veterinario" className={styles.menuItem}>
            <FaUserMd /> Sou Veterinário
          </Link>
          <Link to="/entrar" className={styles.menuItemCelular}>
            <FaSignInAlt />
            Entrar
          </Link>
        </div>
      )}
    </div>
  );
}
