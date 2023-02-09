import { Box, Button, CardMedia, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/admin/logo.png";
import petImage from "../../assets/images/pet.jpg";
import { useAuth } from "../../hooks/useAuth";
import {
  cnpj as cnpjMask, cpf as cpfMask,
  phone as telefoneMask
} from "../../utils/masks";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useResize } from "../../hooks/useResize";

import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
  const { size } = useResize()
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const handleClickShowPasswordConfirm = () => setShowPasswordConfirm((show) => !show);

  const handleMouseDownPasswordConfirm = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const location = useLocation();

  const { functions } = useAuth();
  const { RegisterUser } = functions;

  const formSchema = React.useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required('Nome é obrigatório!').label('Nome'),
      email: Yup.string().required('Email é obrigatório!').email("Digite um email válido").label('Email'),
      phone: Yup.string().required("O campo Celular é obrigatório"),
      cpf: Yup.string().required("O campo CPF é obrigatório"),
      nomeFantasia: Yup.string(),
      cnpj: Yup.string(),
      crmv: Yup.string(),
      password: Yup.string()
        .required('Senha é obrigatório!')
        .label('Senha')
        .min(8, "A Senha precisa ter pelo menos 8 caracteres")
        .max(16, "A Senha precisa ter menos de 16 caracteres"),
      passwordConfirm: Yup.string().when('password', {
        is: val => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          'O campo Confirmar senha precisa ser igual ao da Senha'
        )
      }).required('Confirmar senha é obrigatório!')
        .label('Confirmar senha')
        .min(8, "O Campo Confirmar Senha precisa ter pelo menos 8 caracteres")
        .max(16, "O Campo Confirmar Senha precisa ter menos de 16 caracteres"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      nomeFantasia: '',
      cnpj: '',
      crmv: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  const [userRole, setUserRole] = useState("");

  async function handleSubmitForm(formValues) {
    const data = {
      email: formValues.email,
      password: formValues.password,
      user: {
        is_admin: false,
        user_role: [userRole],
        name: formValues.name,
        avatar: "",
        cpf: formValues.cpf,
        email: formValues.email,
        phone: formValues.phone,
        birth_date: "",
        cnpj: formValues.cnpj,
        crmv: formValues.crmv,
        nome_fantasia: formValues.nomeFantasia,
        endereco: {
          logradouro: "",
          numero: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          pais: "",
        },
        pets: [],
        emergency_contacts: [],
        medical_appointments: {
          medical_history: [],
          vaccine_history: [],
          medication_history: [],
        },
        created_at: Date.now(),
        updated_at: Date.now(),
      },
    };

    if (await RegisterUser(data)) {
      navigate(`${location.pathname.replace("/cadastrar", "")}/petlist`);
    }
  }

  useEffect(() => {
    setUserRole(location.pathname.replace("/cadastrar", "").replace("/", ""));
  }, []);

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
          {location.pathname.includes("veterinario") && (
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Complete o cadastro para atender os pets por aqui
            </Typography>
          )}
          {location.pathname.includes("tutor") && (
            <Typography variant="body1" style={{ textAlign: "center" }}>
              Complete o cadastro para continuar cuidando do seu pet
            </Typography>
          )}
          <Box sx={{ display: 'flex', maxWidth: 320, width: '100%', flexDirection: 'column', gap: 2, pt: 2 }} component="form" onSubmit={formik.handleSubmit}>
            <TextField
              id="name"
              name="name"
              label="Nome Completo"
              variant="outlined"
              helperText={formik.errors.name}
              error={!!formik.errors.name}
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <TextField
              id="cpf"
              name="cpf"
              label="CPF"
              variant="outlined"
              helperText={formik.errors.cpf}
              error={!!formik.errors.cpf}
              value={formik.values.cpf}
              inputProps={{
                maxLength: 14
              }}
              onChange={event => {
                formik.setFieldValue('cpf', cpfMask(event.target.value))
              }}
            />
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
            <TextField
              id="phone"
              name="phone"
              label="Celular"
              variant="outlined"
              helperText={formik.errors.phone}
              error={!!formik.errors.phone}
              value={formik.values.phone}
              inputProps={{
                maxLength: 15
              }}
              onChange={event => {
                formik.setFieldValue('phone', telefoneMask(event.target.value))
              }}
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
            <FormControl variant="outlined">
              <InputLabel htmlFor="passwordConfirm">Confirmar Senha</InputLabel>
              <OutlinedInput
                id="passwordConfirm"
                name="passwordConfirm"
                label="Confirmar Senha"
                variant="outlined"
                error={!!formik.errors.passwordConfirm}
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                type={showPasswordConfirm ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirm}
                      onMouseDown={handleMouseDownPasswordConfirm}
                      edge="end"
                    >
                      {showPasswordConfirm ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText
                error={!!formik.errors.passwordConfirm}
              >
                {formik.errors.passwordConfirm}
              </FormHelperText>
            </FormControl>

            {location.pathname.includes("veterinario") && (
              <>
                <TextField
                  id="nomeFantasia"
                  name="nomeFantasia"
                  label="Nome Fantasia"
                  variant="outlined"
                  helperText={formik.errors.nomeFantasia}
                  error={!!formik.errors.nomeFantasia}
                  value={formik.values.nomeFantasia}
                  onChange={formik.handleChange}
                />
                <TextField
                  id="cnpj"
                  name="cnpj"
                  label="CNPJ"
                  variant="outlined"
                  helperText={formik.errors.cnpj}
                  error={!!formik.errors.cnpj}
                  value={formik.values.cnpj}
                  inputProps={{
                    maxLength: 18
                  }}
                  onChange={event => {
                    formik.setFieldValue('cnpj', cnpjMask(event.target.value))
                  }}
                />
                <TextField
                  id="crmv"
                  name="crmv"
                  label="CRMV"
                  variant="outlined"
                  helperText={formik.errors.crmv}
                  error={!!formik.errors.crmv}
                  value={formik.values.crmv}
                  onChange={formik.handleChange}
                />

              </>
            )}

            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Cadastrar
            </Button>

            <Typography variant="caption" sx={{ textAlign: "center", margin: "0.8rem" }}>
              Já é cadastrado?
            </Typography>


            <Button
              type="button"
              variant="outlined"
              color="primary"
              onClick={() => navigate("/entrar")}
              sx={{ mb: 4 }}
            >
              Clique aqui para entrar!
            </Button>

          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
