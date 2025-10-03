import { Flex, Spacer, Text } from "@chakra-ui/react";
import { UserMenu } from "./UserMenu";

export const Topbar = ({ title }: { title: string }) => (
  <Flex as="header" bg="gray.100" p="4" boxShadow="sm" align="center">
    <Text fontSize="lg" fontWeight="semibold">
      {title}
    </Text>
    <Spacer />
    <UserMenu />
  </Flex>
);
