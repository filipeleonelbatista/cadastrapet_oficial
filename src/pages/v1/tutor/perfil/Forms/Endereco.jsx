import { Box, Button, TextField, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';
import * as Yup from 'yup';
import { uploadImageAsync } from '../../../../../firebase/functions';
import { useAuth } from "../../../../../hooks/useAuth";
import { useLoading } from '../../../../../hooks/useLoading';
import { useToast } from '../../../../../hooks/useToast';

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getCepInformation } from '../../../../../utils/cep';
import { cep as cepMask } from '../../../../../utils/masks';

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

export default function Endereco() {
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();

  const { props, functions } = useAuth();
  const { updateUserByID, updateContextData } = functions;
  const { user } = props;

  const [ratio, setRatio] = useState(10);
  const [position, setPosition] = useState(null);

  const [isLoadedData, setIsLoadedData] = useState(false);

  const [isEditable, setIsEditable] = useState(false);

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      cep: Yup.string().required("O campo CEP é obrigatório"),
      logradouro: Yup.string().required("O campo Logradouro é obrigatório"),
      numero: Yup.string().required("O campo Número é obrigatório"),
      bairro: Yup.string().required("O campo Bairro é obrigatório"),
      cidade: Yup.string().required("O campo Cidade é obrigatório"),
      uf: Yup.string().required("O campo UF é obrigatório"),
      pais: Yup.string().required("O campo País é obrigatório"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      cep: user?.cep,
      logradouro: user?.logradouro,
      numero: user?.numero,
      bairro: user?.bairro,
      cidade: user?.cidade,
      uf: user?.uf,
      pais: user?.pais,
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  const handleSubmitForm = async (formValues) => {
    const data = {
      ...user,
      endereco: {
        logradouro: formValues.logradouro,
        pais: formValues.pais,
        bairro: formValues.bairro,
        cidade: formValues.cidade,
        cep: formValues.cep,
        numero: formValues.numero,
        uf: formValues.uf,
        position: position,
        ratio: ratio,
      },
      updated_at: Date.now(),
    };

    if (await updateUserByID(user?.uid, data)) {
      addToast({
        message: "Informações do Tutor atualizadas com sucesso!",
        severity: 'success'
      })
      await updateContextData()
      setIsEditable(false)
    }

  }

  const [draggable, setDraggable] = useState(false)

  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  const markerRef = useRef(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    [],
  )

  useEffect(() => {
    if (!user?.endereco?.position) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setPosition({ lat: latitude, lng: longitude });
      });
    } else {
      setPosition(user?.endereco?.position)
    }
    if (!user?.endereco?.ratio) {
      setRatio(10)
    } else {
      setRatio(user?.endereco?.ratio)
    }

    formik.setFieldValue('cep', user?.endereco?.cep)
    formik.setFieldValue('logradouro', user?.endereco?.logradouro)
    formik.setFieldValue('numero', user?.endereco?.numero)
    formik.setFieldValue('bairro', user?.endereco?.bairro)
    formik.setFieldValue('cidade', user?.endereco?.cidade)
    formik.setFieldValue('uf', user?.endereco?.uf)
    formik.setFieldValue('pais', user?.endereco?.pais)

    setIsLoadedData(true)
  }, [])

  const handleCep = async () => {
    if (formik.values.cep.length === 9) {
      setIsLoading(true)
      const resultCep = await getCepInformation(formik.values.cep);
      if (resultCep.data.erro) {
        addToast({
          message: "CEP Não encontrado!",
          severity: 'error'
        })
      } else {
        if (resultCep.status === 200) {
          formik.setFieldValue('bairro', resultCep.data.bairro);
          formik.setFieldValue('logradouro', resultCep.data.logradouro);
          formik.setFieldValue('cidade', resultCep.data.localidade);
          formik.setFieldValue('uf', resultCep.data.uf);
          formik.setFieldValue('pais', "Brasil");

          addToast({
            message: "CEP Encontrado!"
          })
        } else {
          addToast({
            message: "Não foi possivel pesquisar o CEP!",
            severity: 'error'
          })
        }
      }

      setIsLoading(false)
    }
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
    >
      {
        isLoadedData && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 2,
            my: 2
          }}
          >
            <Typography>As informações do endereço são usadas para encontrar seu pet</Typography>

            <Box sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              my: 2
            }}
              component="form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                disabled={!isEditable}
                fullWidth
                label="CEP"
                id="cep"
                name="cep"
                onBlur={handleCep}
                inputProps={{ maxLength: 9 }}
                value={formik.values.cep}
                error={isEditable && !!formik.errors.cep}
                helperText={isEditable && formik.errors.cep}
                onChange={(event) => formik.setFieldValue('cep', cepMask(event.target.value))}
              />
              <TextField
                disabled={!isEditable}
                fullWidth
                label="Logradouro"
                id="logradouro"
                name="logradouro"
                value={formik.values.logradouro}
                error={isEditable && !!formik.errors.logradouro}
                helperText={isEditable && formik.errors.logradouro}
                onChange={formik.handleChange}
              />

              <TextField
                disabled={!isEditable}
                fullWidth
                label="Número"
                id="numero"
                name="numero"
                value={formik.values.numero}
                error={isEditable && !!formik.errors.numero}
                helperText={isEditable && formik.errors.numero}
                onChange={formik.handleChange}
              />

              <TextField
                disabled={!isEditable}
                fullWidth
                label="Bairro"
                id="bairro"
                name="bairro"
                value={formik.values.bairro}
                error={isEditable && !!formik.errors.bairro}
                helperText={isEditable && formik.errors.bairro}
                onChange={formik.handleChange}
              />

              <TextField
                disabled={!isEditable}
                fullWidth
                label="Cidade"
                id="cidade"
                name="cidade"
                value={formik.values.cidade}
                error={isEditable && !!formik.errors.cidade}
                helperText={isEditable && formik.errors.cidade}
                onChange={formik.handleChange}
              />

              <TextField
                disabled={!isEditable}
                fullWidth
                label="Estado"
                id="uf"
                name="uf"
                value={formik.values.uf}
                error={isEditable && !!formik.errors.uf}
                helperText={isEditable && formik.errors.uf}
                onChange={formik.handleChange}
              />

              <TextField
                disabled={!isEditable}
                fullWidth
                label="País"
                id="pais"
                name="pais"
                value={formik.values.pais}
                error={isEditable && !!formik.errors.pais}
                helperText={isEditable && formik.errors.pais}
                onChange={formik.handleChange}
              />

              <Typography variant='h6'>Selecione sua casa no mapa</Typography>

              <TextField
                disabled={!isEditable}
                type="number"
                fullWidth
                label="Area segura"
                id="ratio"
                name="ratio"
                value={ratio}
                helperText="Defina uma area segura para seu pet."
                onChange={(event) => setRatio(event.target.value)}
              />

              {
                position && (
                  <Box
                    sx={{
                      width: '100%',
                      height: 300,
                      borderRadius: 2,
                      mt: 0.5,
                      overflow: 'hidden',
                    }}
                  >
                    <MapContainer
                      key="pet-house-location"
                      id="pet-house-location"
                      center={position}
                      zoom={15}
                      style={{ width: "100%", height: "100%", zIndex: 1 }}
                    >
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {
                        position && (
                          <>
                            <Circle center={position} pathOptions={{ fillColor: 'blue' }} radius={ratio} />
                            <Marker
                              ref={markerRef}
                              eventHandlers={eventHandlers}
                              draggable={isEditable}
                              position={position}
                            >
                              <Popup>
                                <span onClick={toggleDraggable}>
                                  {draggable
                                    ? 'Arraste para marcar'
                                    : 'Clique e arraste para marcar'}
                                </span>
                              </Popup>
                            </Marker>
                          </>
                        )
                      }
                    </MapContainer>
                  </Box>
                )
              }

              {
                !isEditable ? (
                  <>
                    <Button
                      fullWidth
                      type='button'
                      variant="contained"
                      color="primary"
                      startIcon={<FaEdit />}
                      onClick={() => setIsEditable(true)}
                    >
                      Editar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      fullWidth
                      type='submit'
                      variant="contained"
                      color="success"
                      startIcon={<FaSave />}
                    >
                      Salvar
                    </Button>

                    <Button
                      fullWidth
                      type='button'
                      variant="contained"
                      color="error"
                      startIcon={<FaTrash />}
                      onClick={() => {
                        if (window.confirm("As alterações serão perdidas. Deseja continuar?")) {
                          formik.resetForm()
                          setIsEditable(false)
                        }
                      }}
                    >
                      Descartar alterações
                    </Button>
                  </>
                )
              }
            </Box>
          </Box>
        )
      }
    </LocalizationProvider>
  )
}