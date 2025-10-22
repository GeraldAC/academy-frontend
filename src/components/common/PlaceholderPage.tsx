import { Box, Heading, Text, Card, CardBody, Icon, Flex } from "@chakra-ui/react";
import { FiAlertCircle } from "react-icons/fi";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <Box>
      <Heading size="lg" mb={2} color="gray.800">
        {title}
      </Heading>
      {description && (
        <Text color="gray.600" mb={6}>
          {description}
        </Text>
      )}

      <Card>
        <CardBody>
          <Flex direction="column" align="center" justify="center" py={12}>
            <Icon as={FiAlertCircle} boxSize={12} color="gray.400" mb={4} />
            <Text color="gray.500" fontSize="lg" fontWeight="medium">
              Página en construcción
            </Text>
            <Text color="gray.400" fontSize="sm" mt={2}>
              El contenido de esta sección estará disponible próximamente
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};
