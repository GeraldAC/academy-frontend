import { Box, Container, Flex, Heading, Text, VStack, AvatarGroup, Avatar } from "@chakra-ui/react";

interface FooterProps {
  showTeam?: boolean;
}

const Footer = ({ showTeam = false }: FooterProps) => {
  const teamMembers = [
    { name: "Gerald C.", color: "red" },
    { name: "José C.", color: "blue" },
    { name: "Pavel M.", color: "green" },
    { name: "Cesar C.", color: "purple" },
  ];

  return (
    <Box as="footer" bg="gray.800" color="white" py={8}>
      <Container maxW="container.xl">
        <Flex
          justify="space-between"
          align="center"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <VStack align="start" spacing={1}>
            <Heading size="md">El Gran Andino</Heading>
            <Text color="gray.400">
              {showTeam ? "Desarrollado con ❤️ por ArcTeam" : "Centro Preuniversitario - Perú"}
            </Text>
          </VStack>

          {showTeam ? (
            <AvatarGroup size="md" max={4}>
              {teamMembers.map((member, index) => (
                <Avatar key={index} name={member.name} bg={`${member.color}.500`} />
              ))}
            </AvatarGroup>
          ) : (
            <Text color="gray.400" textAlign={{ base: "center", md: "right" }}>
              © 2024 El Gran Andino. Todos los derechos reservados.
            </Text>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
