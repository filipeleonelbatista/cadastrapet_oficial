import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, CardMedia, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Tooltip, useMediaQuery } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { CgPill } from "react-icons/cg";
import { FaBookMedical, FaBookOpen, FaCog, FaDog, FaMapMarkedAlt, FaQrcode, FaTachometerAlt, FaTh, FaUser, FaUserShield } from "react-icons/fa";
import { MdOutlineAdsClick } from 'react-icons/md';
import { TiContacts } from 'react-icons/ti';

import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import logo from "../../assets/admin/logo.png";

function Copyright() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://cadastrapet.com.br/">
          Cadastrapet.
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Ver 2.0.1
      </Typography>
    </Box>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme({
  palette: {
    mode: 'light',
  }
});

const mdThemeDark = createTheme({
  palette: {
    mode: 'dark',
  }
});

function DrawerComponent({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { functions, props } = useAuth();
  const { logout } = functions;
  const { isLoggedIn, user } = props;

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState('light');
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const userInfo = localStorage.getItem("@user-info")
    if (userInfo !== null) {
      setUser(JSON.parse(userInfo))
    }
    if (localStorage.getItem("@dark-theme") !== null) {
      const selectedTheme = localStorage.getItem("@dark-theme")
      setMode(selectedTheme)
    } else {
      localStorage.setItem("@dark-theme", prefersDarkMode ? 'dark' : 'light')
      setMode(prefersDarkMode ? 'dark' : 'light')
    }
  }, [])

  const handleNavigate = (text) => {
    return navigate(text)
  }

  const handleLogout = () => {
    if (window.confirm("Deseja realmente sair?")) {
      logout();
      navigate("/");
    }
  };

  return (
    <ThemeProvider theme={mode === 'light' ? mdTheme : mdThemeDark}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >

            <Tooltip title="Expandir Menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>

            <Tooltip title="Definir Modo Escuro/Claro">
              <IconButton sx={{ ml: 1 }} onClick={() => {
                setMode(mode === "dark" ? 'light' : 'dark')
                localStorage.setItem("@dark-theme", mode === "dark" ? 'light' : 'dark')
              }} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Perfil">
              <IconButton onClick={() => handleNavigate("/perfil")}>
                <Avatar alt={user.name} src={user.avatar} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: "flex-start", width: "100%", pl: 2 }}>
              <CardMedia
                component="img"
                src={logo}
                alt="CadastraPet Logo"
              />
            </Box>
            <Tooltip title="Recolher Menu">
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden' }}>
            {user?.user_role.includes('admin') && (
              <>
                {
                  open && (
                    <ListSubheader component="div">
                      Administrativo
                    </ListSubheader>
                  )
                }
                <Tooltip placement="right" title="Usuários">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaUser />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Contatos">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <TiContacts />
                    </ListItemIcon>
                    <ListItemText primary="Contatos" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Pets">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaDog />
                    </ListItemIcon>
                    <ListItemText primary="Pets" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Anúncios">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <MdOutlineAdsClick />
                    </ListItemIcon>
                    <ListItemText primary="Anúncios" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Config. Aplicação">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaCog />
                    </ListItemIcon>
                    <ListItemText primary="Config. Aplicação" />
                  </ListItemButton>
                </Tooltip>

                <Divider sx={{ my: 1 }} />
              </>
            )}
            {user?.user_role.includes('tutor') && (
              <>
                {
                  open && (
                    <ListSubheader component="div">
                      Tutor
                    </ListSubheader>
                  )
                }
                <Tooltip placement="right" title="Inicio">
                  <ListItemButton selected={location.pathname === "/inicio"} onClick={() => navigate("/inicio")}>
                    <ListItemIcon>
                      <FaTachometerAlt />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Dados Gerais">
                  <ListItemButton selected={location.pathname === "/tutor/pet/visualizar"} onClick={() => navigate("/tutor/pet/visualizar")}>
                    <ListItemIcon>
                      <FaBookOpen />
                    </ListItemIcon>
                    <ListItemText primary="Dados Gerais" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Hist. de consultas">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaBookMedical />
                    </ListItemIcon>
                    <ListItemText primary="Hist. de consultas" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Carteira de Vacinação">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaTh />
                    </ListItemIcon>
                    <ListItemText primary="Carteira de Vacinação" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Hist. de Vermífugos">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <CgPill />
                    </ListItemIcon>
                    <ListItemText primary="Hist. de Vermífugos" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Localiza Pet">
                  <ListItemButton selected={location.pathname === "/localizar-pet"} onClick={() => navigate("/localizar-pet")}>
                    <ListItemIcon>
                      <FaMapMarkedAlt />
                    </ListItemIcon>
                    <ListItemText primary="Localiza Pet" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Código Pet">
                  <ListItemButton selected={location.pathname === "/codigo-pet"} onClick={() => navigate("/codigo-pet")}>
                    <ListItemIcon>
                      <FaQrcode />
                    </ListItemIcon>
                    <ListItemText primary="Código Pet" />
                  </ListItemButton>
                </Tooltip>
                <Tooltip placement="right" title="Seja premium">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <FaUserShield />
                    </ListItemIcon>
                    <ListItemText primary="Seja premium" />
                  </ListItemButton>
                </Tooltip>
                <Divider sx={{ my: 1 }} />
              </>
            )}
            {user?.user_role.includes('veterinario') && (
              <>
                {
                  open && (
                    <ListSubheader component="div">
                      Veterinário
                    </ListSubheader>
                  )
                }
                <Tooltip placement="right" title="Registros Médicos">
                  <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Registros Médicos" />
                  </ListItemButton>
                </Tooltip>
                <Divider sx={{ my: 1 }} />
              </>
            )}

            <Tooltip placement="right" title="Configurações">
              <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                <ListItemIcon>
                  <FaCog />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>
            </Tooltip>
            <Tooltip placement="right" title="Perfil">
              <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                <ListItemIcon>
                  <FaUser />
                </ListItemIcon>
                <ListItemText primary="Perfil" />
              </ListItemButton>
            </Tooltip>
            <Tooltip placement="right" title="Sair">
              <ListItemButton selected={location.pathname === "/"} onClick={() => handleLogout()}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </Tooltip>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            mt: 7,
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 1, mb: 1, pt: 2 }}>
            {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DrawerComponent;
