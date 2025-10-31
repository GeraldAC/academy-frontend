import { Box, Table, Tbody, Td, Th, Thead, Tr, Skeleton, Flex } from "@chakra-ui/react";

interface CoursesTableSkeletonProps {
  rows?: number;
}

export const CoursesTableSkeleton = ({ rows = 5 }: CoursesTableSkeletonProps) => {
  return (
    <Box bg="white" borderRadius="lg" boxShadow="sm" overflow="hidden">
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead bg="gray.50">
            <Tr>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Nombre del Curso
              </Th>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Materia
              </Th>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Docente
              </Th>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Disponibilidad
              </Th>
              <Th
                color="gray.600"
                fontWeight="semibold"
                textTransform="none"
                fontSize="sm"
                isNumeric
              >
                Precio/Mes
              </Th>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Estado
              </Th>
              <Th color="gray.600" fontWeight="semibold" textTransform="none" fontSize="sm">
                Acciones
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton height="20px" width="80%" />
                </Td>
                <Td>
                  <Skeleton height="24px" width="100px" borderRadius="md" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="70%" />
                </Td>
                <Td>
                  <Skeleton height="24px" width="120px" borderRadius="md" />
                </Td>
                <Td isNumeric>
                  <Skeleton height="20px" width="80px" ml="auto" />
                </Td>
                <Td>
                  <Skeleton height="24px" width="80px" borderRadius="full" />
                </Td>
                <Td>
                  <Flex gap={1}>
                    <Skeleton height="32px" width="32px" borderRadius="md" />
                    <Skeleton height="32px" width="32px" borderRadius="md" />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};
