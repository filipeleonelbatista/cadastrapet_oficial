import { FaBell, FaTachometerAlt } from "react-icons/fa";
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
          to="/admin/contatos"
          exact
          className={
            location.pathname === "/admin/contatos"
              ? styles.activedDiv
              : styles.link
          }
        >
          <FaTachometerAlt size={22} />
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
