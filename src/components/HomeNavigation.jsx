import { Button, CardMedia, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { FaBars, FaDog, FaHospital, FaSignInAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/new_logo.svg";
import { useResize } from "../hooks/useResize";

export default function HomeNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { size } = useResize();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        py: 2.8,
        px: 4,
        backgroundColor: '#D0EBFF',
        zIndex: 100,
      }}
    >
      <Link to="/">
        <CardMedia
          component="img"
          src={logoImg}
          sx={{
            width: 200,
            height: 'auto'
          }}
          alt="CadastraPet | Cadastrando e prolongando vidas"
        />
      </Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {
          size[0] < 720 ? (
            <>
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ width: 48, height: 48 }}
                aria-controls={openMenu ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
              >
                <FaBars />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openMenu}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={() => navigate("/")}>
                  <ListItemIcon>
                    <FaDog />
                  </ListItemIcon>
                  Sou tutor
                </MenuItem>
                <MenuItem onClick={() => navigate("/veterinario")}>
                  <ListItemIcon>
                    <FaHospital />
                  </ListItemIcon>
                  Sou veterinário
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => navigate("/entrar")}>
                  <ListItemIcon>
                    <FaSignInAlt />
                  </ListItemIcon>
                  Entrar
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2
              }}
            >
              <Button
                variant={location.pathname === "/" ? "outlined" : "text"}
                color="primary"
                onClick={() => navigate("/")}
              >
                Sou tutor
              </Button>
              <Button
                variant={location.pathname === "/veterinario" ? "outlined" : "text"}
                color="primary"
                onClick={() => navigate("/veterinario")}
              >
                Sou Veterinário
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaSignInAlt size={18} />}
                onClick={() => navigate("/entrar")}
              >
                Entrar
              </Button>
            </Box>
          )
        }

      </Box>
    </Box>
  );
}
