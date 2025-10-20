import { IconType } from "react-icons";
import {
  Card,
  CardBody,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
} from "@chakra-ui/react";

type StatCardProps = {
  icon: IconType;
  label: string;
  value: string | number;
  helpText?: string;
  colorScheme: string;
};

export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  helpText,
  colorScheme,
}) => (
  <Card>
    <CardBody>
      <Flex justify="space-between" align="start">
        <Stat>
          <StatLabel color="gray.600" fontSize="sm">
            {label}
          </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold" color="gray.800">
            {value}
          </StatNumber>
          {helpText && (
            <StatHelpText color="gray.500" fontSize="xs">
              {helpText}
            </StatHelpText>
          )}
        </Stat>
        <Flex bg={`${colorScheme}.50`} p={3} borderRadius="lg" color={`${colorScheme}.600`}>
          <Icon as={icon} boxSize={6} />
        </Flex>
      </Flex>
    </CardBody>
  </Card>
);
