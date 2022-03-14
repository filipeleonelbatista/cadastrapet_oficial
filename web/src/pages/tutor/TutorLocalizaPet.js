import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import { useAuth } from "../../hooks/useAuth";
import styles from "../../styles/pages/tutor/TutorLocalizaPet.module.css";
import { yearNow } from "../../utils/string";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

function TutorLocalizaPet() {
  const navigate = useNavigate();
  const { props } = useAuth();
  const { selectedPet, isLoggedIn } = props;
  const [position, setPosition] = useState(selectedPet?.currentLocation);

  if (!position) {
    setPosition([-29.9357, -51.0166]);
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
    });
  }

  if (!isLoggedIn) {
    navigate("/tutor");
    return null;
  }

  if (!selectedPet) {
    navigate("/tutor/petlist");
    return null;
  }

  return (
    <div className={styles.container}>
      <BackButton path="/tutor/petprofile" />
      <div className={styles.header}>
        <div className={styles.petInfo}>
          <div
            alt={selectedPet.name}
            style={{
              background: `url(${selectedPet.avatar}) no-repeat center center`,
              borderRadius: "50%",
              width: "6.4rem",
              height: "6.4rem",
              margin: "0 0.8rem",
              backgroundSize: "cover",
            }}
          ></div>
          <div>
            <h4 className={styles.petName}>{selectedPet.name}</h4>
            <h4 className={styles.petAge}>
              {yearNow(selectedPet.birth_date) >= 1
                ? yearNow(selectedPet.birth_date) + " Anos"
                : yearNow(selectedPet.birth_date) + " Ano"}
            </h4>
          </div>
        </div>
      </div>
      {!selectedPet?.currentLocation && (
        <h4
          style={{
            color: "#566dea",
            margin: "2.4rem 0 0 0",
            textAlign: "center",
          }}
        >
          Seu pet não possui rastreamento
          <br />
          Mostrando localização do dispositivo atual
        </h4>
      )}
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
      </div>
    </div>
  );
}

export default TutorLocalizaPet;
