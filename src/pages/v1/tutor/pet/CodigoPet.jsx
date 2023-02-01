import { Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from '../../../../hooks/useAuth';
import QRCode from "react-qr-code";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`qrcode-codepet-tabpanel-${index}`}
      aria-labelledby={`qrcode-codepet-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `qrcode-codepet-tab-${index}`,
    'aria-controls': `qrcode-codepet-tabpanel-${index}`,
  };
}

export default function CodigoPet() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { props } = useAuth();
  const { selectedPet } = props;


  return (
    <DrawerComponent title="Código Pet">
      <ContainerComponent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Painel para adicionar pet ou vincular">
              <Tab label="Veterinário" {...a11yProps(0)} />
              <Tab label="Tutor" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', textAlign: 'center' }}>
              <Typography>
                Use a camera ou leitor de codigos para ler o Código QR
              </Typography>
              <Typography>
                Leia o <b>Qr Code</b> para adicionar informações medicas ao pet.
              </Typography>

              <Box sx={{ p: 2, backgroundColor: "#FFF", borderRadius: 2, width: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                <QRCode
                  value={`https://cadastrapet.com.br/veterinario/createquickappointment?petUid=${selectedPet.uid}`}
                />
              </Box>

              <Typography>
                Código do pet: <br />
                <b>{selectedPet?.uid}</b>
              </Typography>
            </Box>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', textAlign: 'center' }}>
              <Typography>
                Use a camera para ler o Código QR
              </Typography>
              <Typography>
                Entre no app em <b>Adicionar pet</b> {">"} <b>Ler Qr Code</b> para<br />
                compartilhar os dados do pet com outro tutor
              </Typography>
              <Typography>
                Leia o <b>Qr Code</b> para compartilhar os dados do pet com outro tutor.
              </Typography>

              <Box sx={{ p: 2, backgroundColor: "#FFF", borderRadius: 2, width: 'fit-content', display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
                <QRCode
                  value={`${selectedPet.uid}`}
                />
              </Box>

              <Typography>
                Código do pet: <br />
                <b>{selectedPet?.uid}</b>
              </Typography>
            </Box>
          </TabPanel>
        </Box>

      </ContainerComponent>
    </DrawerComponent >
  )
}