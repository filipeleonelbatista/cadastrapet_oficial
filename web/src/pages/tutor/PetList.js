import React from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Button from "../../components/Button";
import { AuthContextProvider } from "../../context/AuthContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetList.module.css";

function PetListComponent() {
  const navigate = useNavigate();

  const { props, functions, setFunctions } = useAuth();
  const { isLoggedIn, petList } = props;
  const { logout, getPetByID } = functions;
  const { setSelectedPet } = setFunctions;

  const handleSelectedPet = async (id) => {
    const sp = await getPetByID(id);
    setSelectedPet(sp);
    navigate("/tutor/petprofile");
  };

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/tutor");
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className={styles.container}>
      <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
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
      <Button transparent onClick={handleLogout}>
        <FaSignOutAlt /> Sair
      </Button>
    </div>
  );
}

function PetList() {
  return (
    <AuthContextProvider>
      <PetListComponent />
    </AuthContextProvider>
  );
}
export default PetList;
