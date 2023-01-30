import { FaBell, FaTachometerAlt, FaUserAlt, FaDog } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icon.png";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/components/admin/Sidebar.module.css";
import Avatar from "./Avatar";

function SidebarHOC() {
  const location = useLocation();
  const { props } = useAuth();
  const { user, isLoggedIn } = props;

  if (!user || !isLoggedIn)
    return (
      <aside className={styles.container}>
        <p>...</p>
      </aside>
    );
  return (
    <aside className={styles.container}>
      <Link to="/admin/contatos">
        <img
          src={logo}
          alt="Unique - Aluguel de veículos"
          className={styles.sidebarLogo}
        />
      </Link>
      <div className={styles.menu}>
        <NavLink
          to="/admin/principal"
          exact
          className={
            location.pathname === "/admin/principal"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaTachometerAlt size={22} />
        </NavLink>
        <NavLink
          to="/admin/usuarios"
          exact
          className={
            location.pathname === "/admin/usuarios"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaUserAlt size={22} />
        </NavLink>
        <NavLink
          to="/admin/pets"
          exact
          className={
            location.pathname === "/admin/pets"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaDog size={22} />
        </NavLink>
      </div>
      <div className={styles.menu}>
        <NavLink
          to="/notification"
          className={
            location.pathname === "/notification"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaBell size={22} />
        </NavLink>
        <Link to="/profile" title={user.name}>
          <Avatar uri={user.avatar} alt={user.name} />
        </Link>
      </div>
    </aside>
  );
}
function Sidebar() {
  return (
    <AuthContextProvider>
      <SidebarHOC />
    </AuthContextProvider>
  );
}

export default Sidebar;
