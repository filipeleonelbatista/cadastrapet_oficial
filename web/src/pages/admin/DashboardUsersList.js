import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaUser } from "react-icons/fa";
import Sidebar from "../../components/admin/Sidebar";
import { AuthContextProvider } from "../../context/AuthContext";
import { ConversionContextProvider } from "../../context/ConversionContext";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/admin/DashboardUserList.module.css";

function DashboardUserListComponent() {
  const { props } = useAuth();
  const { user, isLoggedIn } = props;
  const [tutores, setTutores] = useState([]);

  const { functions } = useAuth();
  const { getAllTutors } = functions;

  useEffect(() => {
    const executeAsync = async () => {
      const tutoresResult = await getAllTutors();

      setTutores(tutoresResult);
    };
    executeAsync();
  }, [getAllTutors]);

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
          <h2>Lista de usuarios</h2>

          <div className={styles.inputGroup}>
            <input type="text" placeholder="Pesquisar usuários..." />
            <button type="button">
              <FaSearch />
            </button>
            <button type="button" title="Adicionar usuário">
              <FaPlus />
            </button>
          </div>
        </header>
        <main className={styles.mainContent}>
          <div className={styles.veicleContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Usuários</h3>
              <span className={styles.counter}>{tutores.length}</span>
            </div>
            <div className={styles.veicleList}>
              {tutores.map((tutor) => {
                return (
                  <div key={tutor.id} className={styles.veicleItem}>
                    {tutor.avatar ? (
                      <div
                        title={tutor.name}
                        style={{
                          background: `url(${tutor.avatar}) no-repeat center center`,
                          borderRadius: "50%",
                          width: "4.4rem",
                          height: "4.4rem",
                          backgroundSize: "cover",
                        }}
                      ></div>
                    ) : (
                      <div
                        title={tutor.name}
                        style={{
                          backgroundColor: "#566dea",
                          borderRadius: "50%",
                          width: "4.4rem",
                          height: "4.4rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#FFF",
                        }}
                      >
                        <FaUser />
                      </div>
                    )}
                    <p>
                      {tutor.name} - {tutor.user_role}
                    </p>
                    <p>{tutor.phone}</p>
                    <p>
                      {tutor.pets.length === 0 ? "Nenhum" : tutor.pets.length}
                    </p>
                    <p>Ver mais</p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function DashboardUserList() {
  return (
    <AuthContextProvider>
      <ConversionContextProvider>
        <DashboardUserListComponent />
      </ConversionContextProvider>
    </AuthContextProvider>
  );
}

export default DashboardUserList;
