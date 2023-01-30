import React, { useEffect } from "react";
import { FaPlus, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import Version from "../../components/Version";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/PetList.module.css";
import { Widget } from "../../components/Widget";

function PetList() {
  const navigate = useNavigate();

  const { props, functions, setFunctions } = useAuth();
  const { isLoggedIn, petList, user } = props;
  const { getPetByID, updateContextData } = functions;
  const { handleSetSelectedPet } = setFunctions;

  const handleSelectedPet = async (id) => {
    const sp = await getPetByID(id);
    handleSetSelectedPet(sp);
    navigate("/tutor/petprofile");
  };

  useEffect(() => {
    const executeAsync = async () => {
      if (await updateContextData()) return navigate("/entrar");
    };
    executeAsync();
    // eslint-disable-next-line
  }, []);

  if (!user) {
    navigate("/entrar");
    return null;
  }

  if (!isLoggedIn) {
    navigate("/entrar");
    return null;
  }

  return (
    <div className={styles.container}>
      <div className="statusbar"></div>
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
        <button
          onClick={() => navigate("/tutor/tutorprofile/view")}
          className={styles.avatarButton}
        >
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
        </button>
        <img src={Logo} alt="Cadastra Pet" className={styles.imgHeader} />
        <div></div>
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
      <Version />
      <Widget />
    </div>
  );
}

export default PetList;
