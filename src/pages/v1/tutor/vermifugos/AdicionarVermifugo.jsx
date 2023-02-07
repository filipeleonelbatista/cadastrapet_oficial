import { Avatar, Box, Button, Card, CardMedia, Modal, TextField, Typography } from "@mui/material";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import ContainerComponent from "../../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../../components/v1/DrawerComponent";
import { useAuth } from "../../../../hooks/useAuth";
import { useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadImageAsync } from "../../../../firebase/functions";
import { useLoading } from "../../../../hooks/useLoading";
import { useToast } from "../../../../hooks/useToast";

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

export default function AdicionarVermifugo() {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const { addToast } = useToast();
  const { props, functions } = useAuth();
  const { selectedPet } = props;
  const {
    updateMedicationByID,
    getNewMedicationID,
    updateContextData,
  } = functions;

  const [showAttachment, setShowAttachment] = useState('')
  const [selectedAttachment, setSelectedAttachment] = useState([])

  const handleFilePreview = (e) => {
    const files = e.target.files;
    formik.setFieldValue("selectedImage", files);

    for (const file of files) {
      setIsLoading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
          setSelectedAttachment(previousState => [...previousState, reader.result]);
        };
      }, 1000)
      setIsLoading(false);
    }

  };

  const formSchema = useMemo(() => {
    return Yup.object().shape({
      medication: Yup.string().required("O campo Medicamento é obrigatório"),
      medication_application_date: Yup.string().required("O campo Data de aplicação é obrigatório"),
      selectedImage: Yup.mixed().required("O campo Comprovante de vacinação é obrigatório"),
    })
  }, [])

  const formik = useFormik({
    initialValues: {
      medication: '',
      medication_application_date: dayjs(Date.now()).format("YYYY-MM-DD"),
      selectedImage: '',
    },
    validationSchema: formSchema,
    onSubmit: values => {
      handleSubmitForm(values)
    },
  });

  const handleSubmitForm = async (formValues) => {
    setIsLoading(true)

    let uploadURLImage = [];
    if (formValues.selectedImage) {
      for (const file of formValues.selectedImage) {
        const newUrl = await uploadImageAsync(file, "medication");
        uploadURLImage.push(newUrl);
      }
    }
    setIsLoading(false)

    const newMedicationID = await getNewMedicationID();

    const data = {
      uid: newMedicationID,
      medication: formValues.medication,
      medication_receipt: uploadURLImage,
      medication_application_date: new Date(formValues.medication_application_date).getTime(),
      created_at: Date.now(),
      updated_at: Date.now(),
    };

    if (await updateMedicationByID(newMedicationID, data, selectedPet)) {
      addToast({
        message: "Aplicação do Medicamento cadastrada com sucesso!"
      })
      await updateContextData();
      return navigate("/tutor/historico-vermifugos");
    }
  }

  return (
    <>
      <Modal
        open={showAttachment !== ''}
        onClose={() => setShowAttachment('')}

        aria-labelledby="attachment"
        aria-describedby="attachment-desc"
        sx={{
          display: 'flex',
          alignItems: "center",
          justifyContent: 'center',
          p: 2,
        }}
      >
        <CardMedia
          component="img"
          src={showAttachment}
          alt="Anexo"
          sx={{
            width: '90%',
            height: '90%',
            display: 'flex',
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            outline: 'none',
            border: 'none',
            zIndex: 10,
            borderRadius: 2,
            boxShadow: 3
          }}
        />
      </Modal>
      <DrawerComponent title="Adicionar Medicamento">
        <Box>
          <Typography variant="caption">Pet selecionado:</Typography>
          <Box sx={{ my: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedPet?.avatar} alt={selectedPet.name} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <Typography variant="body1" sx={{ lineHeight: 1 }}>{selectedPet?.name}</Typography>
              <Typography variant="caption">
                {dayjs().from(dayjs(new Date(selectedPet?.birth_date)), true)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ContainerComponent>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>

              <TextField
                fullWidth
                id="medication"
                label="Medicamento"
                variant="outlined"
                value={formik.values.medication}
                onChange={formik.handleChange}
                error={!!formik.errors.medication}
                helperText={formik.errors.medication}
              />

              <DatePicker
                label="Data da aplicação"
                inputFormat="DD/MM/YYYY"
                value={formik.values.medication_application_date}
                onChange={(value) => { value && formik.setFieldValue('medication_application_date', new Date(value)) }}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    value={formik.values.medication_application_date}
                    error={!!formik.errors.medication_application_date}
                    helperText={formik.errors.medication_application_date}
                    name="medication_application_date"
                    variant="outlined"
                    {...params}
                  />
                )}
              />

              <Typography variant="h6">Anexos</Typography>
              <Typography variant="body1">Adicione a imagens do medicamento contendo o máximo de informações possível.</Typography>
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
                  component="label" sx={{
                    border: '2px dashed #1976d2',
                    p: 2,
                    width: 150,
                    minWidth: 150,
                    height: 200,
                    display: 'flex',
                    alignItems: "center",
                    justifyContent: "center",
                    transition: '0.2s',
                    cursor: 'pointer',

                    '&:hover': {
                      filter: 'brightness(0.8)'
                    }
                  }}>
                  <input
                    hidden
                    id='selectedImage'
                    name='selectedImage'
                    accept="image/*"
                    type="file"
                    multiple
                    onChange={(event) => handleFilePreview(event)}
                  />
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
                    <Typography variant="body2" sx={{ mt: 1 }} color="#1976d2">Adicionar anexo</Typography>
                  </Box>
                </Card>
                {
                  selectedAttachment.map((anexo, index) => (
                    <Card
                      onClick={() => setShowAttachment(anexo)}
                      key={index}
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
                        outline: 'none',
                        border: 'none',
                        transition: '0.2s',
                        boxShadow: 3,
                        borderRadius: 2,

                        '&:hover': {
                          filter: 'brightness(0.8)'
                        }
                      }}>
                      <CardMedia
                        component="img"
                        src={anexo}
                        alt="Anexo"
                        sx={{
                          width: 150,
                          height: 200,
                          display: 'flex',
                          alignItems: "center",
                          justifyContent: "center",
                          outline: 'none',
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
                        <Typography variant="body1" color="#FFF"><b>Anexo {index + 1}</b></Typography>
                      </Box>
                    </Card>
                  ))
                }
              </Box>

              <Button type='submit' variant="contained" color="primary">Adicionar Medicamento</Button>
            </Box>
          </ContainerComponent>
        </LocalizationProvider>
      </DrawerComponent >
    </>
  )
}