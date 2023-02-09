import { Box, Button, Typography } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useState } from "react";
import QRCode from "react-qr-code";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

dayjs.extend(relativeTime);
dayjs.extend(updateLocale)

dayjs.updateLocale('en', {
  relativeTime: {
    future: "em %s",
    past: "%s atrás",
    s: 'alguns segundos',
    m: "um minuto",
    mm: "%d minutos",
    h: "uma hora",
    hh: "%d horas",
    d: "um dia",
    dd: "%d dias",
    M: "um mês",
    MM: "%d meses",
    y: "um ano",
    yy: "%d anos"
  }
})

export default function LocalizarPet() {

  const { props } = useAuth();
  const { selectedPet } = props;

  const [showCode, setShowCode] = useState(false)

  return (
    <DrawerComponent title="Localizar Pet">
      <ContainerComponent>
        {
          selectedPet?.pin_number === 'Sem Coleira'
            ? (
              <Box sx={{ width: '100%', display: "flex", flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 2 }}>
                <Typography>Seu pet não possui coleria localizadora?</Typography>
                <Button variant="contained" color="primary">Comprar coleira</Button>
                <Button variant="outlined" onClick={() => setShowCode(!showCode)} color="primary">Cria minha coleira manualmente</Button>
                {
                  showCode && (
                    <>
                      <Typography>
                        Use <b>Qr Code</b> para imprimir um adesivo e colar<br />
                        no pin do seu pet. Assim toda a vez que lerem ele <br />
                        você receberá a localização do pet.
                      </Typography>

                      <Box sx={{ boxShadow: 3, py: 1, px: 2, gap: 1, backgroundColor: "#FFF", borderRadius: 2, width: 'fit-content', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                        <Typography variant="body1" color="#000">
                          Me ajude a voltar pra casa!
                        </Typography>
                        <QRCode
                          size={200}
                          value={`https://cadastrapet.com.be/localizapet?id=`}
                        />
                        <Typography variant="caption" color="#000">
                          <b>Cod:. {selectedPet?.uid}</b><br />
                          cadastrapet.com.br/localiza-pet
                        </Typography>
                      </Box>
                    </>
                  )
                }
              </Box>
            ) : (
              <>
                {
                  selectedPet?.currentLocation && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="h5" color="primary">Localização do seu pet</Typography>
                      <Typography variant="body2">Ultimo local onde sua Tag da coleira foi lida ou a posição do rastreador</Typography>
                      <Box
                        sx={{
                          width: '100%',
                          height: 300,
                          borderRadius: 2,
                          mt: 2,
                          overflow: 'hidden',
                        }}
                      >
                        <MapContainer
                          key="pet-location"
                          id="pet-location"
                          center={selectedPet?.currentLocation}
                          zoom={15}
                          style={{ width: "100%", height: "100%", zIndex: 1 }}
                        >
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={selectedPet?.currentLocation}>
                            <Popup>"Teste"</Popup>
                          </Marker>
                        </MapContainer>
                      </Box>
                    </Box>
                  )
                }
              </>
            )
        }
      </ContainerComponent>
    </DrawerComponent >
  )
}