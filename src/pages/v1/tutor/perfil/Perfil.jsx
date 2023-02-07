import { Box, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import React, { useState } from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import ContatosSeguranca from './Forms/ContatosSeguranca';
import DadosTutor from './Forms/DadosTutor';
import Endereco from './Forms/Endereco';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function Perfil() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DrawerComponent title="Perfil">
      <ContainerComponent>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs centered value={value} onChange={handleChange} aria-label="Painel tutor">
              <Tab label="Informações do Tutor" {...a11yProps(0)} />
              <Tab label="Endereço" {...a11yProps(1)} />
              <Tab label="Contatos de segurança" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel component="div" value={value} index={0}>
            <DadosTutor />
          </TabPanel>
          <TabPanel component="div" value={value} index={1}>
            <Endereco />
          </TabPanel>
          <TabPanel component="div" value={value} index={2}>
            <ContatosSeguranca />
          </TabPanel>
        </Box>
      </ContainerComponent>
    </DrawerComponent >
  )
}