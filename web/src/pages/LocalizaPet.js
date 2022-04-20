import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { FaMapMarker, FaWhatsapp } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import HomeNavigation from "../components/HomeNavigation";
import { useAuth } from "../hooks/useAuth";
import styles from "../styles/pages/LocalizaPet.module.css";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function LocalizaPet() {
  const { functions } = useAuth();
  const { getPetByID, getUserByID, updatePetByID } = functions;
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedPet, setSelectedPet] = useState();
  const [user, setUser] = useState();
  const [position, setPosition] = useState([-29.9368448, -51.0296064]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    if (id) {
      const executeAsync = async () => {
        const sp = await getPetByID(id);
        const currentUserArray = [];
        for (const tutor of sp.tutor) {
          const loadedUser = await getUserByID(tutor);
          if (loadedUser) {
            currentUserArray.push(loadedUser);
          }
        }

        await updatePetByID(
          sp.uid,
          { currentLocation: position },
          currentUserArray[0]
        );
        setSelectedPet(sp);
        setUser(currentUserArray);
      };
      executeAsync();
    } else {
      alert("Não foi encontrado o identificador desta solicitação!");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  if (!selectedPet || !user) return null;

  return (
    <div className={styles.container}>
      <HomeNavigation />
      <div className={styles.content}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ width: "100%", height: "100%", zIndex: 1 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>{selectedPet.name}</Popup>
          </Marker>
        </MapContainer>
        <div className={styles.mapContainerOverlay}>
          <div className={styles.mapOverlayMarkerContainer}>
            <div className={styles.mapOverlayMarker}></div>
            <h2>Localização {selectedPet.name}</h2>
          </div>
          <div className={styles.tutorContainer}>
            <h3>Tutores</h3>
            <div className={styles.tutorList}>
              {user.length > 0 &&
                user.map((item) => {
                  return (
                    <div key={item.uid} className={styles.wContainer}>
                      <div
                        title={item.name}
                        style={{
                          background: `url(${item.avatar}) no-repeat center center`,
                          borderRadius: "50%",
                          width: "5.4rem",
                          height: "5.4rem",
                          backgroundSize: "cover",
                        }}
                      ></div>
                      <div className={styles.userData}>
                        <h3>{item.name}</h3>
                        <p>
                          <FaMapMarker />
                          {item.endereco.logradouro},{item.endereco.numero}
                          <br />
                          Bairro: {item.endereco.bairro}
                          <br />
                          {item.endereco.cidade}-{item.endereco.uf}
                          <br />
                          CEP{item.endereco.cep}
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/+55${item.phone}`}
                        className={styles.contactRoundedButton}
                      >
                        <FaWhatsapp />
                      </a>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocalizaPet;
