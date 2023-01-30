import { Typography } from "@mui/material";
import ContainerComponent from "../../components/v1/ContainerComponent";
import DrawerComponent from "../../components/v1/DrawerComponent";
import { useAuth } from "../../hooks/useAuth";

export default function Dashboard() {
  const { props } = useAuth();
  const { user } = props;

  return (
    <DrawerComponent title="Inicio">
      <ContainerComponent>
        {console.log("user", user)}
        {user?.user_role.includes('admin') && (
          <Typography>Administrador</Typography>
        )}
        {user?.user_role.includes('tutor') && (
          <Typography>Tutor</Typography>
        )}
        {user?.user_role.includes('veterinario') && (
          <Typography>Veterinário</Typography>
        )}
      </ContainerComponent>
    </DrawerComponent>
  )
}