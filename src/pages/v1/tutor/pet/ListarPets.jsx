import React, { useMemo, useState } from 'react';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";

import {
  Avatar, Box, Button, Card, CardMedia, IconButton, TextField, Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import { FaCamera, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { uploadImageAsync } from '../../../../firebase/functions';
import { useAuth } from '../../../../hooks/useAuth';
import { isStringEmpty } from '../../../../utils/string';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import qrImageOverlay from '../../../../assets/qr_overlay.png';
import QrReader from "react-qr-scanner";
import dayjs from 'dayjs';
import { useToast } from '../../../../hooks/useToast';
import { useLoading } from '../../../../hooks/useLoading';

export default function ListarPets() {
  const navigate = useNavigate();

  const { props, setFunctions } = useAuth();
  const { user, petList, selectedPet } = props;
  const { handleSetSelectedPet } = setFunctions;

  return (
    <DrawerComponent title="Meus Pet">
      <Typography variant="h5">Bem vindo, {user?.name} 👋</Typography>
      <Typography variant="h6">Seus pets</Typography>
      <Box sx={{
        display: "flex",
        alignItems: "flex-start",
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: 2,
        my: 2,
        pb: 1
      }}>
        <Card
          onClick={() => navigate('/tutor/pet/adicionar')}
          component="button" sx={{
            border: '2px dashed #1976d2',
            p: 2,
            width: 150,
            minWidth: 150,
            height: 200,
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            transition: '0.2s',

            '&:hover': {
              filter: 'brightness(0.8)'
            }
          }}>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Box sx={{
              border: '2px dashed #1976d2',
              display: 'flex',
              flexDirection: 'column',
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              borderRadius: "50%",
            }}>
              <FaPlus color="#1976d2" />
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }} color="#1976d2">Adicionar Pet</Typography>
          </Box>
        </Card>
        {
          petList.length > 0 && petList?.map(pet => (
            <Card
              onClick={() => handleSetSelectedPet(pet)}
              key={pet?.uid}
              component="button"
              sx={{
                p: 2,
                width: 150,
                minWidth: 150,
                height: 200,
                display: 'flex',
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                border: 'none',
                transition: '0.2s',

                '&:hover': {
                  filter: 'brightness(0.8)'
                }
              }}>
              <CardMedia
                component="img"
                src={pet?.avatar}
                alt="Doguinho"
                sx={{
                  width: 150,
                  height: 200,
                  display: 'flex',
                  alignItems: "center",
                  justifyContent: "center",
                  position: "absolute",
                  zIndex: 10,
                }}
              />
              <Box
                sx={{
                  width: 150,
                  height: 200,
                  display: 'flex',
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  position: "absolute",
                  zIndex: 15,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(148,148,148,0) 55%, rgba(0,0,0,1) 100%)',
                  pb: 1,
                }}
              >
                <Typography variant="body1" color="#FFF"><b>{pet?.name}</b></Typography>
                <Typography variant="caption" color="#FFF">
                  <b>
                    {dayjs().from(dayjs(new Date(pet?.birth_date)), true)}
                  </b>
                </Typography>
              </Box>
              {
                selectedPet?.uid === pet?.uid && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      position: "absolute",
                      zIndex: 15,
                      py: 0.5,
                      px: 1,
                      borderRadius: 12,
                      backgroundColor: '#2fcd2f',
                      top: 8,
                      right: 8,
                    }}
                  >
                    <Typography variant="caption" color="#FFF"><b>Selecionado</b></Typography>
                  </Box>
                )
              }
            </Card>
          ))
        }
      </Box>

    </DrawerComponent >
  )
}