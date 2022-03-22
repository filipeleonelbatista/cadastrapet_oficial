import React from "react";
import { CgPill } from "react-icons/cg";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdHealing } from "react-icons/md";
import { RiSyringeLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/vet/VetProfile.module.css";

function VetProfile() {
  const navigate = useNavigate();

  const { functions, props } = useAuth();
  const { logout } = functions;
  const { isLoggedIn, user } = props;

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/");
    }
  };

  if (!isLoggedIn || !user) {
    navigate("/veterinario");
    return null;
  }

  return (
    <div className={styles.container}>
      <BackButton path="/veterinario/vetprofile" />
      <div className={styles.header}>
        <div className={styles.headerTitlePage}>
          <div className={styles.avatarButton}>
            {user?.avatar === "" ? (
              <FaUser />
            ) : (
              <div
                title={user.name}
                style={{
                  background: `url(${user.avatar}) no-repeat center center`,
                  borderRadius: "50%",
                  width: "4.4rem",
                  height: "4.4rem",
                  backgroundSize: "cover",
                }}
              ></div>
            )}
          </div>
          <h4 className={styles.title}>{user.name}</h4>
        </div>
        <Button transparent onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </Button>
      </div>
      <div className={styles.content}>
        <button
          onClick={() => navigate("/veterinario/vetmedicalhistory")}
          className={styles.wContainer}
        >
          <MdHealing size={64} />
          <h4 className={styles.title}>Histórico de consultas</h4>
        </button>
        <button
          onClick={() => navigate("/veterinario/vetvaccinehistory")}
          className={styles.wContainer}
        >
          <RiSyringeLine size={64} />
          <h4 className={styles.title}>Vacinas</h4>
        </button>
        <button
          onClick={() => navigate("/veterinario/vetmedicationhistory")}
          className={styles.wContainer}
        >
          <CgPill size={64} />
          <h4 className={styles.title}>Medicações</h4>
        </button>
      </div>
    </div>
  );
}

export default VetProfile;
