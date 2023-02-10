import { Box } from "@chakra-ui/react";
import React from "react";

export default function Layout({ children }) {
  return (
    <Box mx="5rem" my="2rem">
      {children}
    </Box>
  );
}
