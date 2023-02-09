import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { FaDog, FaEnvelope, FaFilePowerpoint, FaGlobeAmericas, FaInstagram, FaMapMarked, FaUserNurse } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import profilePic from "../assets/icon.png";
import Floating from "../components/Floating";

export default function Links() {
  const sharableContent = {
    title: "CadastraPet",
    text: "Vi este Este contato no site https://cadastrapet.com.br",
    url: "https://cadastrapet.com.br",
  };

  const handleShare = async () => {
    try {
      await navigator.share(sharableContent);
    } catch (err) {
      console.log("Error: " + err);
    }
    console.log("MDN compartilhado com sucesso!");
  };

  return (
    <Box
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        pt: 8
      }}
    >
      <Box
        sx={{
          width: 420,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar src={profilePic} alt="cadastrapet avatar" sx={{ width: 150, height: 150, zIndex: 10, boxShadow: 6, }} />
        <Box
          sx={{
            width: '100%',
            mt: -10,
            mb: 4,
            pt: 12,
            px: 2,
            pb: 2,
            borderRadius: 4,
            boxShadow: 4,
            backgroundColor: "#566dea",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Typography variant="h6" color="white"><b>Cadastrapet</b></Typography>
          <Typography variant="body2" color="white" textAlign="center">
            Mantenha os registros médicos e vacinais do seu pet na palma da sua mão
          </Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              my: 4,
            }}
          >
            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 0.2,
                borderRadius: 2,
              }}
              variant="text"
              component="a"
              href="https://instagram.com/cadastra.pet"
              rel="noopener noreferrer"
            >
              <FaInstagram size={52} color="#FFF" />
              <Typography sx={{ lineHeight: 1 }} variant="caption" color="white">Instagram</Typography>
            </Button>

            <Button
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                p: 0.2,
                borderRadius: 2,
              }}
              variant="text"
              component="a"
              href="mailto:contato@cadastrapet.com.br"
              rel="noopener noreferrer"
            >
              <FaEnvelope size={52} color="#FFF" />
              <Typography sx={{ lineHeight: 1 }} variant="caption" color="white">E-mail</Typography>
            </Button>

          </Box>

          <Typography variant="h6" color="white"><b>MEUS LINKS</b></Typography>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              my: 2,
            }}
          >
            <Button
              fullWidth
              size="large"
              component="a"
              href="https://cadastrapet.com.br/tutor/cadastrar"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#FFF',
                '&:hover': {
                  backgroundColor: '#DDD'
                }
              }}
              startIcon={<FaDog />}
            >
              Cadastre seus pets agora!
            </Button>
            <Button
              fullWidth
              size="large"
              component="a"
              href="https://cadastrapet.com.br/veterinario/cadastrar"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#FFF',
                '&:hover': {
                  backgroundColor: '#DDD'
                }
              }}
              startIcon={<FaUserNurse />}
            >
              Veterinário, atenda seus pets aqui!
            </Button>
            <Button
              fullWidth
              size="large"
              component="a"
              href="https://cadastrapet.com.br/"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#FFF',
                '&:hover': {
                  backgroundColor: '#DDD'
                }
              }}
              startIcon={<FaGlobeAmericas />}
            >
              Acesse nosso site
            </Button>
            <Button
              fullWidth
              size="large"
              component="a"
              href="https://cadastrapet.com.br/localizapet"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#FFF',
                '&:hover': {
                  backgroundColor: '#DDD'
                }
              }}
              startIcon={<FaMapMarked />}
            >
              Localize um pet
            </Button>
            <Button
              fullWidth
              size="large"
              component="a"
              href="https://cadastrapet.com.br/pitch"
              variant="contained"
              color="inherit"
              sx={{
                backgroundColor: '#FFF',
                '&:hover': {
                  backgroundColor: '#DDD'
                }
              }}
              startIcon={<FaFilePowerpoint />}
            >
              Veja nosso pitch
            </Button>

          </Box>

          <Button
            size="large"
            variant="contained"
            color="inherit"
            onClick={handleShare}
            sx={{
              backgroundColor: '#FFF',
              '&:hover': {
                backgroundColor: '#DDD'
              }
            }}
            startIcon={<IoShareSocialOutline />}
          >
            Compartilhar
          </Button>

        </Box>
      </Box>
      <Floating location="Links" />
    </Box>
  );
}
