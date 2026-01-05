import { Badge, Flex, Text } from "@chakra-ui/react";

interface CapacityBadgeProps {
  available: number;
  total: number;
}

export const CapacityBadge = ({ available, total }: CapacityBadgeProps) => {
  const percentage = (available / total) * 100;

  console.log({ available, total, percentage });

  const getColorScheme = () => {
    if (available === 0) return "red";
    if (percentage <= 20) return "orange";
    return "green";
  };

  const getLabel = () => {
    if (available === 0) return "Lleno";
    if (percentage <= 20) return "Pocos cupos";
    return "Disponible";
  };

  return (
    <Flex align="center" gap={2}>
      <Badge
        colorScheme={getColorScheme()}
        fontSize="xs"
        px={2}
        py={1}
        borderRadius="md"
        fontWeight="semibold"
      >
        {getLabel()}
      </Badge>
      <Text fontSize="sm" color="gray.600" fontWeight="medium">
        {available}/{total}
      </Text>
    </Flex>
  );
};
