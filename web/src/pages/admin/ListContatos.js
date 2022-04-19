import React, { useEffect, useState } from "react";
import { FaCalendar, FaPlus, FaSearch, FaUser } from "react-icons/fa";
import Sidebar from "../../components/admin/Sidebar";
import { AuthContextProvider } from "../../context/AuthContext";
import { ConversionContextProvider } from "../../context/ConversionContext";
import { useAuth } from "../../hooks/useAuth";
import { useConversion } from "../../hooks/useConversion";
import styles from "../../styles/pages/admin/Dashboard.module.css";
import { dateToString } from "../../utils/string";

function ListContatosComponent() {
  const { props } = useAuth();
  const { user, isLoggedIn } = props;

  const [pets, setPets] = useState([]);
  const [tutores, setTutores] = useState([]);
  const [contatos, setContatos] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalContactsToday, setTotalContactsToday] = useState(0);

  const { getAllContacts, getNumberOfContacts, getNumberOfContactsToday } =
    useConversion();
  const { functions } = useAuth();
  const { getNumberOfUsers, getAllPets, getAllTutors } = functions;

  useEffect(() => {
    const executeAsync = async () => {
      const result = await getAllContacts();
      setContatos(result);
      const quant = await getNumberOfUsers();
      setTotalUsers(quant);
      const quant2 = await getNumberOfContacts();
      setTotalContacts(quant2);
      const quant3 = await getNumberOfContactsToday();
      setTotalContactsToday(quant3);
      const petsResult = await getAllPets();
      const tutoresResult = await getAllTutors();

      setPets(petsResult);
      setTutores(tutoresResult);
    };
    executeAsync();
  }, [
    getAllContacts,
    getNumberOfContacts,
    getNumberOfUsers,
    getNumberOfContactsToday,
    getAllPets,
    getAllTutors,
  ]);

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
          <h2>Principal</h2>

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
          <div className={styles.carBrand}>
            {/* <div className={styles.carBrandContainer}>
              <button type="button" className={styles.carBrandButtonActive}>
                Gatos
              </button>
              <button type="button" className={styles.carBrandButton}>
                Cachorros
              </button>
              <button type="button" className={styles.carBrandButton}>
                Coelhos
              </button>
              <button type="button" className={styles.carBrandButton}>
                Aves
              </button>
            </div>

            <button type="button" className={styles.carBrandButtonSeeAll}>
              Ver tudo
            </button> */}
          </div>
          <div className={styles.carList}>
            {pets.slice(0, 4).map((pet) => {
              return (
                <button
                  key={pet.id}
                  type="button"
                  className={styles.carListContainer}
                >
                  <div
                    style={{
                      background: `url(${pet.avatar}) no-repeat center center`,
                      width: "100%",
                      height: "40rem",
                      objectFit: "cover",
                    }}
                  ></div>

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
          <div className={styles.veicleContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Tutores</h3>
              <span className={styles.counter}>{totalUsers}</span>
            </div>
            <div className={styles.veicleList}>
              {tutores.slice(0, 5).map((tutor) => {
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
                    <p>{tutor.name}</p>
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
          <div className={styles.veicleContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <h3>Contatos no site </h3>
              <span className={styles.counter}>{totalContacts}</span>
              <span className={styles.counter}>{totalContactsToday}</span>
            </div>
            <div className={styles.veicleList}>
              {contatos.slice(0, 5).map((contato) => {
                return (
                  <div key={contato.id} className={styles.veicleItem}>
                    <p>{contato.from}</p>
                    <p>
                      <b>{contato.name}</b>
                      <br />
                      {contato.email} {contato.email && " - "} {contato.phone}
                      <br />
                    </p>
                    <p>{contato.message}</p>
                    <p>{contato.url}</p>
                    <p>{dateToString(contato.created_at)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
      {/* MAPA */}
      {/* <div className={styles.mapContainerDiv}>
        <div className={styles.mapElements}>
          <div className={styles.mapContent}></div>

          <button className={styles.locationButton}>
            <FaCrosshairs />
          </button>
        </div>
        <div className={styles.mapContainerOverlay}>
          <div className={styles.mapOverlayMarkerContainer}>
            <div className={styles.mapOverlayMarker}></div>
            <h2>Localização do Veículo</h2>
          </div>
          <p>
            <FaMapMarkerAlt />
            Travessa Itacolomi Dois, 343 - Gravataí-RS
          </p>
          <div className={styles.mapOverlayInputGroup}>
            <h2>Bloquear o veículo?</h2>
            <label className={styles.switchOverlay}>
              <input type="checkbox" />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div> */}
    </div>
  );
}

function ListContatos() {
  return (
    <AuthContextProvider>
      <ConversionContextProvider>
        <ListContatosComponent />
      </ConversionContextProvider>
    </AuthContextProvider>
  );
}

export default ListContatos;
