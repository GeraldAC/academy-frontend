import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton>
        <Avatar size="sm" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/admin/profile")}>Perfil</MenuItem>
        <MenuItem>Configuración</MenuItem>
        <MenuDivider />
        <MenuItem>Cerrar sesión</MenuItem>
      </MenuList>
    </Menu>
  );
};
