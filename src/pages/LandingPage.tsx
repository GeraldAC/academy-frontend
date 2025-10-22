import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  Image,
  SimpleGrid,
  Icon,
  Stack,
  HStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap, FaUsers, FaChartLine } from "react-icons/fa";

const LandingPage = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");

  const features = [
    {
      icon: FaGraduationCap,
      title: "Educación de Calidad",
      description: "Preparación integral para el ingreso universitario con los mejores profesores.",
    },
    {
      icon: FaUsers,
      title: "Comunidad Andina",
      description: "Únete a una comunidad de estudiantes comprometidos con su éxito académico.",
    },
    {
      icon: FaChartLine,
      title: "Alto Nivel de Ingreso",
      description:
        "Más del 85% de nuestros estudiantes logran ingresar a las universidades de su elección.",
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Container maxW="container.xl" py={20}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
          <VStack align="start" spacing={6}>
            <Heading size="2xl" color="red.600" lineHeight="1.2">
              Tu camino hacia la{" "}
              <Text as="span" color="yellow.500">
                universidad
              </Text>{" "}
              comienza aquí
            </Heading>
            <Text fontSize="xl" color="gray.600">
              Más de 15 años formando a los futuros profesionales del Perú. Excelencia académica con
              identidad andina.
            </Text>
            <HStack spacing={4}>
              <Button size="lg" colorScheme="red" onClick={() => navigate("/auth/login")}>
                Comenzar Ahora
              </Button>
              <Button
                size="lg"
                variant="outline"
                colorScheme="red"
                onClick={() => navigate("/about")}
              >
                Conocer Más
              </Button>
            </HStack>
          </VStack>

          <Box>
            <Image
              src="https://portal.andina.pe/EDPfotografia2/Thumbnail/2010/03/13/000120932W.jpg"
              alt="Estudiantes universitarios peruanos"
              borderRadius="xl"
              shadow="2xl"
            />
          </Box>
        </SimpleGrid>
      </Container>

      {/* Features Section */}
      <Box py={20} bg={cardBg}>
        <Container maxW="container.xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Heading size="xl" color="red.600">
                ¿Por qué elegir El Gran Andino?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="2xl">
                Somos el centro preuniversitario líder en la región, comprometido con el éxito
                académico de nuestros estudiantes.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
              {features.map((feature, index) => (
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
                  <Icon as={feature.icon} w={12} h={12} color="red.500" mb={4} />
                  <Heading size="md" mb={4} color="red.600">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600">{feature.description}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20}>
        <Container maxW="container.lg">
          <Box
            bg="red.600"
            color="white"
            borderRadius="2xl"
            p={12}
            textAlign="center"
            backgroundImage="linear-gradient(135deg, #E53E3E 0%, #C53030 100%)"
          >
            <VStack spacing={6}>
              <Heading size="xl">¿Listo para comenzar tu journey universitario?</Heading>
              <Text fontSize="lg" opacity={0.9}>
                Únete a los miles de estudiantes que han logrado su ingreso universitario con
                nosotros.
              </Text>
              <Stack direction={{ base: "column", sm: "row" }} spacing={4} justify="center">
                <Button
                  size="lg"
                  colorScheme="whiteAlpha"
                  variant="solid"
                  onClick={() => navigate("/auth/login")}
                >
                  Ingresar al Sistema
                </Button>
                <Button
                  size="lg"
                  colorScheme="whiteAlpha"
                  variant="outline"
                  onClick={() => navigate("/about")}
                >
                  Conoce Nuestra Historia
                </Button>
              </Stack>
            </VStack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
