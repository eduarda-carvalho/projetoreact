import { Box, Divider, Text } from "@chakra-ui/react";
import React from "react";

export default function Header() {
  return (
    <Box>
      <Text fontSize="2rem" my="2">
        Novo Registro
      </Text>
      <Divider borderColor="#A0AEC0" mb="1rem" />
    </Box>
  );
}
