import { Box, Link, Typography } from "@mui/material";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import logoImg from "../assets/logo_white.svg";
import { useResize } from "../hooks/useResize";
import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  const { size } = useResize();
  return (
    <Box
      sx={{
        backgroundColor: '#1971C2',
        width: '100vw',
        display: 'flex',
        flexDirection: size[0] < 720 ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 6,
        py: 8,
        gap: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: '300px',
          py: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: size[0] < 720 ? 'center' : 'flex-start',
          gap: 1,
          color: '#FFF',
        }}>
        <img src={logoImg} alt="CadastraPet" />
        <Typography sx={{ mt: 2 }} variant="body1">&copy; {new Date(Date.now()).getFullYear()} - CadastraPet</Typography>
        <Typography variant="body1">Todos os direitos reservados</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <Link rel="noreferrer noopener" href="https://instagram.com/cadastra.pet">
          <FaInstagram size={32} color="#FFF" />
        </Link>
        <Link rel="noreferrer noopener" href="https://fb.me/cadastra.pet">
          <FaFacebook size={32} color="#FFF" />
        </Link>
        <Link rel="noreferrer noopener" href="https://www.linkedin.com/company/cadastrapet/">
          <FaLinkedin size={32} color="#FFF" />
        </Link>
      </Box>
    </Box>
  );
}
