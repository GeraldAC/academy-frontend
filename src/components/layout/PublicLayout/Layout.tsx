import { Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showTeamFooter?: boolean;
}

const Layout = ({ children, showBackButton = false, showTeamFooter = false }: LayoutProps) => {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Header showBackButton={showBackButton} />
      <Box as="main" flex="1">
        {children}
      </Box>
      <Footer showTeam={showTeamFooter} />
    </Box>
  );
};

export default Layout;
