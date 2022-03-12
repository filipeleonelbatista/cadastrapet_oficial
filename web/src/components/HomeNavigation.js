import { useState } from "react";
import { FaBars, FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "../styles/components/HomeNavigation.module.css";
export default function HomeNavigation() {
  const [isShow, setIsShow] = useState(false);

  const handleIsShowMenu = () => {
    setIsShow(!isShow);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navItems}>
        <Link to="/veterinario" className={styles.navItem}>
          Sou Veterinário
        </Link>
        <Link to="/tutor" className={styles.navItem}>
          Sou tutor
        </Link>
        <Link to="/" className={styles.navItemDestaque}>
          <FaSignInAlt />
          Baixar o app
        </Link>
      </div>

      <div className={styles.navItemsTablet}>
        <Link to="/entrar" className={styles.menuItemTablet}>
          <FaSignInAlt />
          Baixar o app
        </Link>
      </div>

      <button className={styles.roundedButton} onClick={handleIsShowMenu}>
        <FaBars size={18} />
      </button>
      {isShow && (
        <div className={styles.menuItems}>
          <Link to="/veterinario" className={styles.menuItem}>
            <FaUserMd /> Sou Veterinário
          </Link>
          <Link to="/tutor" className={styles.menuItem}>
            <FaDog /> Sou tutor
          </Link>
          <Link to="/" className={styles.menuItemCelular}>
            <FaSignInAlt />
            Baixar o app
          </Link>
        </div>
      )}
    </div>
  );
}
