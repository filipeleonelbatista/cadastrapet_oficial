import { Typography, Button } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import ContainerComponent from "../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../components/v1/DrawerComponent";
import { useEffect, useState } from "react";
import { FaDog, FaDownload, FaUpload } from "react-icons/fa";

export default function Users() {
  const { props, databaseFunctions } = useAuth();
  const { user } = props;
  const { updateDatabase, downloadDatabase, verifyPets } = databaseFunctions;

  const [Database, setDatabase] = useState([]);

  async function handleDownloadDatabase() {
    const database = await downloadDatabase();
    console.log(database);
    const textFile = new Blob([
      [JSON.stringify(database)],
      { type: "text/plain" },
    ]);

    setDatabase(URL.createObjectURL(textFile));
  }

  async function handleUploadDatabase() {
    await updateDatabase();
  }

  useEffect(() => {
    handleDownloadDatabase()
  }, [])

  return (
    <DrawerComponent title="Usuários">
      <Typography sx={{ my: 2 }} variant="h5">Bem vindo, {user?.name} 👋</Typography>
      <ContainerComponent>
        {
          false && (
            <>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                component="a"
                href={Database}
                download="database.json"
                target="_blank"
                startIcon={<FaDownload />}
              >
                Download Database
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={handleUploadDatabase}
                startIcon={<FaUpload />}
              >
                Upload Database
              </Button>
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                color="primary"
                onClick={verifyPets}
                startIcon={<FaDog />}
              >
                Limpar pets
              </Button>
            </>
          )
        }
      </ContainerComponent>
    </DrawerComponent >
  )
}