import React, { useEffect, useState } from "react";
import { FaCalendar, FaPlus, FaSearch } from "react-icons/fa";
import Sidebar from "../../components/admin/Sidebar";
import { AuthContextProvider } from "../../context/AuthContext";
import { ConversionContextProvider } from "../../context/ConversionContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/admin/DashboardPetList.module.css";
import { dateToString } from "../../utils/string";

function DashboardPetListComponent() {
  const { props } = useAuth();
  const { user, isLoggedIn } = props;

  const [pets, setPets] = useState([]);

  const { functions } = useAuth();
  const { getAllPets } = functions;

  useEffect(() => {
    const executeAsync = async () => {
      const petsResult = await getAllPets();

      setPets(petsResult);
    };
    executeAsync();
  }, [getAllPets]);

  if (!user || !isLoggedIn)
    return (
      <aside className={styles.container}>
        <p>...</p>
      </aside>
    );

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h2>Lista de pets</h2>

          <div className={styles.inputGroup}>
            <input type="text" placeholder="Pesquisar pets..." />
            <button type="button">
              <FaSearch />
            </button>
            <button type="button" title="Adicionar pet">
              <FaPlus />
            </button>
          </div>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.veicleContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Pets</h3>
              <span className={styles.counter}>{pets.length}</span>
            </div>
          </div>
          <div className={styles.carList}>
            {pets.map((pet) => {
              return (
                <button
                  key={pet.id}
                  type="button"
                  className={styles.carListContainer}
                >
                  <img
                    src={pet.avatar}
                    alt={pet.name}
                    style={{
                      backgroundImage: `url(${pet.avatar})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />

                  <div className={styles.carListOverlayInfo}>
                    <div className={styles.promotionalInfo}>
                      <FaCalendar /> {dateToString(pet.birth_date)}
                    </div>
                    <div className={styles.carDetails}>
                      <h2>{pet.name}</h2>
                      <div className={styles.carDetailsList}>
                        <p>
                          <FaCalendar /> {dateToString(pet.birth_date)}
                        </p>
                        <p>
                          <FaCalendar /> {dateToString(pet.adoption_date)}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            <button type="button" className={styles.carListContainerSeeMore}>
              Ver mais
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardPetList() {
  return (
    <AuthContextProvider>
      <ConversionContextProvider>
        <DashboardPetListComponent />
      </ConversionContextProvider>
    </AuthContextProvider>
  );
}

export default DashboardPetList;
