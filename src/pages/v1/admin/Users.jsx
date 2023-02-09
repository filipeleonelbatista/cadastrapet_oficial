import { Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import ContainerComponent from "../../../components/v1/ContainerComponent";
import DrawerComponent from "../../../components/v1/DrawerComponent";

export default function Users() {
  const { props } = useAuth();
  const { user } = props;

  return (
    <DrawerComponent title="Usuários">
      <Typography variant="h5">Bem vindo, {user?.name} 👋</Typography>
      <ContainerComponent>

      </ContainerComponent>
    </DrawerComponent >
  )
}