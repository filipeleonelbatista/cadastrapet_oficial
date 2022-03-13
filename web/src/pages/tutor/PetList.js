import React, { useEffect } from "react";
import { FaPlus, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetList.module.css";

function PetList() {
  const navigate = useNavigate();

  const { props, functions, setFunctions } = useAuth();
  const { isLoggedIn, petList } = props;
  const { logout, getPetByID, updateContextData } = functions;
  const { handleSetSelectedPet } = setFunctions;

  const handleSelectedPet = async (id) => {
    const sp = await getPetByID(id);
    handleSetSelectedPet(sp);
    navigate("/tutor/petprofile");
  };

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/");
    }
  };

  useEffect(() => {
    const executeAsync = async () => {
      if (await updateContextData()) return navigate("/tutor");
    };
    executeAsync();
    // eslint-disable-next-line
  }, []);

  if (!isLoggedIn) {
    navigate("/tutor");
    return null;
  }

  return (
    <div className={styles.container}>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 0 6rem",
          gap: "0.8rem",
        }}
      >
        <Button
          transparent
          onClick={() => navigate("/tutor/tutorprofile/view")}
        >
          <FaUser /> Perfil
        </Button>
        <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
        <Button transparent onClick={handleLogout}>
          <FaSignOutAlt /> Sair
        </Button>
      </div>
      <div className={styles.content}>
        {petList &&
          petList.map((pet) => {
            return (
              <div key={pet.uid} className={styles.petItem}>
                <button
                  onClick={() => handleSelectedPet(pet.uid)}
                  className={styles.petButton}
                >
                  <div
                    alt={pet.name}
                    style={{
                      background: `url(${pet.avatar}) no-repeat center center`,
                      borderRadius: "50%",
                      width: "6.4rem",
                      height: "6.4rem",
                      backgroundSize: "cover",
                    }}
                  ></div>
                </button>
                <h4 className={styles.petName}>{pet.name}</h4>
              </div>
            );
          })}
        <div className={styles.petItem}>
          <button
            onClick={() => navigate("/tutor/createpet")}
            className={styles.petButton}
          >
            <FaPlus />
          </button>
          <h4 className={styles.petName}>Adicionar Pet</h4>
        </div>
      </div>
    </div>
  );
}

export default PetList;
