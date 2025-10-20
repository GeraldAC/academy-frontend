import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Icon,
  Avatar,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaUniversity, FaUsers, FaRocket } from "react-icons/fa";

const AboutPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const teamMembers = [
    {
      name: "Gerald C.",
      role: "Full Stack Developer",
      description:
        "Especialista en arquitectura de software y bases de datos. Lidera el desarrollo backend y la integración de sistemas.",
      avatar: "G",
      color: "red",
    },
    {
      name: "José C.",
      role: "Frontend Specialist",
      description:
        "Experto en React, TypeScript y diseño de interfaces. Se encarga de la experiencia de usuario y la implementación frontend.",
      avatar: "J",
      color: "blue",
    },
    {
      name: "Pavel M.",
      role: "DevOps Engineer",
      description:
        "Encargado de la infraestructura, despliegue y optimización del sistema. Asegura el rendimiento y disponibilidad de la plataforma.",
      avatar: "P",
      color: "green",
    },
    {
      name: "Cesar C.",
      role: "Project Manager",
      description:
        "Coordina el equipo y gestiona los tiempos del proyecto. Experto en metodologías ágiles y planificación estratégica.",
      avatar: "C",
      color: "purple",
    },
  ];

  const values = [
    {
      icon: FaUniversity,
      title: "Excelencia Académica",
      description: "Comprometidos con la calidad educativa y el éxito de los estudiantes peruanos.",
    },
    {
      icon: FaUsers,
      title: "Trabajo en Equipo",
      description: "Creemos en la colaboración y sinergia para lograr los mejores resultados.",
    },
    {
      icon: FaRocket,
      title: "Innovación Continua",
      description:
        "Implementamos las últimas tecnologías para ofrecer soluciones modernas y eficientes.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Container maxW="container.xl" py={16}>
        <VStack spacing={8} textAlign="center">
          <Box
            bg="red.600"
            color="white"
            px={6}
            py={2}
            borderRadius="full"
            fontSize="sm"
            fontWeight="bold"
          >
            SOBRE NOSOTROS
          </Box>
          <Heading size="2xl" color="red.600">
            Conoce al equipo detrás de{" "}
            <Text as="span" color="yellow.500">
              El Gran Andino
            </Text>
          </Heading>
          <Text fontSize="xl" color="gray.600" maxW="3xl">
            Somos{" "}
            <Text as="span" fontWeight="bold" color="red.600">
              ArcTeam
            </Text>
            , un grupo de 4 profesionales apasionados por la tecnología y la educación,
            comprometidos con transformar la experiencia preuniversitaria en el Perú.
          </Text>
        </VStack>
      </Container>

      {/* Team Section */}
      <Box py={16}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color="red.600">
                Nuestro Equipo - ArcTeam
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Cuatro mentes, una misión: revolucionar la gestión académica preuniversitaria con
                tecnología de vanguardia y compromiso social.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} w="full">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  bg={cardBg}
                  borderRadius="xl"
                  shadow="lg"
                  _hover={{ shadow: "2xl", transform: "translateY(-8px)" }}
                  transition="all 0.3s ease-in-out"
                  overflow="hidden"
                >
                  <CardBody p={6}>
                    <VStack spacing={4} textAlign="center">
                      <Avatar
                        size="xl"
                        name={member.name}
                        bg={`${member.color}.500`}
                        color="white"
                        fontSize="2xl"
                        fontWeight="bold"
                      />
                      <VStack spacing={2}>
                        <Heading size="lg" color="red.600">
                          {member.name}
                        </Heading>
                        <Text
                          color={`${member.color}.500`}
                          fontWeight="bold"
                          fontSize="sm"
                          textTransform="uppercase"
                          letterSpacing="wide"
                        >
                          {member.role}
                        </Text>
                      </VStack>
                      <Text color="gray.600" fontSize="sm" lineHeight="tall">
                        {member.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            {/* Team Stats */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={8} w="full" pt={8}>
              <VStack textAlign="center">
                <Heading size="2xl" color="red.600">
                  4
                </Heading>
                <Text color="gray.600" fontWeight="medium">
                  Integrantes
                </Text>
              </VStack>
              <VStack textAlign="center">
                <Heading size="2xl" color="red.600">
                  15+
                </Heading>
                <Text color="gray.600" fontWeight="medium">
                  Años de Experiencia
                </Text>
              </VStack>
              <VStack textAlign="center">
                <Heading size="2xl" color="red.600">
                  100%
                </Heading>
                <Text color="gray.600" fontWeight="medium">
                  Comprometidos
                </Text>
              </VStack>
              <VStack textAlign="center">
                <Heading size="2xl" color="red.600">
                  1
                </Heading>
                <Text color="gray.600" fontWeight="medium">
                  Misión Común
                </Text>
              </VStack>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Values Section */}
      <Box py={16} bg={cardBg}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color="red.600">
                Nuestros Valores
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Principios que guían nuestro trabajo y nos definen como equipo
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {values.map((value, index) => (
                <Box
                  key={index}
                  p={8}
                  bg={bgColor}
                  borderRadius="xl"
                  textAlign="center"
                  shadow="md"
                  _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
                  transition="all 0.3s"
                >
                  <Icon as={value.icon} w={12} h={12} color="red.500" mb={4} />
                  <Heading size="md" mb={4} color="red.600">
                    {value.title}
                  </Heading>
                  <Text color="gray.600">{value.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxW="container.xl" py={16}>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} alignItems="center">
          <VStack align="start" spacing={6}>
            <Heading size="xl" color="red.600">
              Nuestra Misión
            </Heading>
            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              En{" "}
              <Text as="span" fontWeight="bold">
                ArcTeam
              </Text>
              , nos dedicamos a desarrollar soluciones tecnológicas innovadoras que optimicen la
              gestión académica del Centro Preuniversitario “El Gran Andino”.
            </Text>

            <Text fontSize="lg" color="gray.600" lineHeight="tall">
              Creemos en el poder transformador de la educación y trabajamos cada día para
              contribuir al éxito de miles de estudiantes peruanos en su camino hacia la educación
              superior.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button colorScheme="red" leftIcon={<FaGithub />} variant="outline">
                GitHub
              </Button>
              <Button colorScheme="red" leftIcon={<FaLinkedin />} variant="outline">
                LinkedIn
              </Button>
            </HStack>
          </VStack>

          <Box position="relative">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="Equipo de trabajo colaborando"
              borderRadius="xl"
              shadow="2xl"
            />
            <Box
              position="absolute"
              bottom="-20px"
              right="-20px"
              bg="yellow.400"
              color="white"
              p={6}
              borderRadius="xl"
              shadow="lg"
            >
              <VStack spacing={1} textAlign="center">
                <Text fontSize="2xl" fontWeight="bold">
                  ArcTeam
                </Text>
                <Text fontSize="sm" opacity={0.9}>
                  Desarrollo con Pasión
                </Text>
              </VStack>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>

      {/* CTA Section */}
      <Box py={16} bg="red.600">
        <Container maxW="container.lg">
          <VStack spacing={6} textAlign="center" color="white">
            <Heading size="xl">¿Interesado en nuestro trabajo?</Heading>
            <Text fontSize="lg" opacity={0.9}>
              Contáctanos para conocer más sobre nuestros proyectos y cómo podemos colaborar.
            </Text>
            <HStack spacing={4} pt={4}>
              <Button colorScheme="whiteAlpha" variant="solid" onClick={() => navigate("/")}>
                Volver al Inicio
              </Button>
              <Button
                colorScheme="whiteAlpha"
                variant="outline"
                onClick={() => navigate("/auth/login")}
              >
                Acceder al Sistema
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage;
