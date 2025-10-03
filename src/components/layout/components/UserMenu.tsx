import { Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";

export const UserMenu = () => (
  <Menu>
    <MenuButton>
      <Avatar size="sm" />
    </MenuButton>
    <MenuList>
      <MenuItem>Perfil</MenuItem>
      <MenuItem>Configuración</MenuItem>
      <MenuDivider />
      <MenuItem>Cerrar sesión</MenuItem>
    </MenuList>
  </Menu>
);
