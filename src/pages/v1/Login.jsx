import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import petImage from "../../assets/images/pet.jpg";
import { useAuth } from "../../hooks/useAuth";
import { useResize } from "../../hooks/useResize";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, CardMedia, Typography, TextField, Grid, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useToast } from "../../hooks/useToast";

function Login() {
  const { size } = useResize()
  const { addToast } = useToast()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const { props, functions } = useAuth();
  const { isLoggedIn, user } = props;
  const { signInUser, handleForgotUser } = functions;

  const formSchema = React.useMemo(() => {
    return Yup.object().shape({
      email: Yup.string().required("O campo email é obrigatório").email("Digite um email válido"),
      password: Yup.string().required("O campo senha é obrigatório"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  async function handleSubmitForm(formValues) {
    const isLogged = await signInUser(formValues.email, formValues.password);
    if (isLogged.status) {
      if (isLogged.user.user_role === "tutor") navigate("/tutor/petlist");
      if (isLogged.user.user_role === "veterinario")
        if (sessionStorage.getItem("petUid") !== null) {
          navigate("/veterinario/medicalappointment/add");
        } else {
          navigate("/veterinario/vetprofile");
        }
    } else {
      addToast({ message: isLogged.message ?? "Houve um problema ao realizar o login", severity: isLogged.message ? 'info' : 'error' });
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      if (user) {
        if (user.user_role === "tutor") navigate("/tutor/petlist");
        if (user.user_role === "veterinario")
          navigate("/veterinario/vetprofile");
      }
    } else {
      navigate("/entrar");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      if (user) {
        if (user.user_role === "tutor") navigate("/tutor/petlist");
        if (user.user_role === "veterinario")
          navigate("/veterinario/vetprofile");
      }
    } else {
      navigate("/entrar");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <Grid container spacing={2} sx={{ height: '100vh' }}>
      {
        size[0] > 720 && (
          <Grid item xs={6} sx={{ pl: 0, pt: 0, height: '100vh' }}>
            <CardMedia
              component="img"
              src={petImage}
              sx={{
                height: '100vh'
              }}
              alt="PET"
            />
          </Grid>
        )
      }
      <Grid item xs={size[0] > 720 ? 6 : 12} sx={{ pl: 0, pt: 0, height: '100vh' }}>
        <Box sx={{ display: 'flex', width: '100%', height: '100vh', flexDirection: 'column', gap: 1, overflow: 'auto', alignItems: 'center', pt: 8 }}>
          <Link to="/">
            <img src={logo} alt="Cadastra Pet - Tutor" width="270" />
          </Link>
          <Typography variant="h5">Bem vindo novamente</Typography>
          <Typography variant="body1">Entre para continuar usando o sistema</Typography>
          <Box sx={{ display: 'flex', maxWidth: 320, width: '100%', flexDirection: 'column', gap: 2, pt: 2 }} component="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              helperText={formik.errors.email}
              error={!!formik.errors.email}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Senha</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                label="Senha"
                variant="outlined"
                error={!!formik.errors.password}
                value={formik.values.password}
                onChange={formik.handleChange}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={!!formik.errors.password}
              >
                {formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Button
              type="button"
              variant="outlined"
              color="warning"
              onClick={() => handleForgotUser(formik.values.email)}
            >
              Esqueceu sua senha?
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
            </Button>

            <Typography variant="caption" sx={{ textAlign: "center", margin: "0.8rem" }}>
              Não é cadastrado? Faça seu cadastro selecionando a opção a baixo!
            </Typography>


            <Box sx={{ width: '100%', display: 'flex', gap: 2 }}>
              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => navigate("/tutor/cadastrar")}
              >
                Sou tutor
              </Button>

              <Button
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => navigate("/veterinario/cadastrar")}
              >
                Sou Veterinário
              </Button>
            </Box>

          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
