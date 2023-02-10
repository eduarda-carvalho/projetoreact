import { FieldValues, UseFormRegister } from "react-hook-form";
import { FormLabel, Input, Box, Text, Button } from "@chakra-ui/react";

import React from "react";

export const FormInput = ({
  label,
  name,
  bgColor,
  register,
  type,
  step,
  message,
}) => (
  <Box w="100%" px="2rem">
    <FormLabel fontSize="1.3rem" fontWeight="300">
      {label}
    </FormLabel>
    <Input
      bgColor={bgColor ? bgColor : "#E2E8F0"}
      h="2.5rem"
      w="100%"
      border="1px solid #A0AEC0"
      borderRadius="5px"
      {...register(name)}
      type={type}
      step={step}
    />
    <Text color="red.400" mt=".1rem">
      {message}
    </Text>
  </Box>
);

export function FormButton({ label, bgColor, type, ...rest }) {
  return (
    <Button type={type} bgColor={bgColor} color="white" mx="0.5rem" {...rest}>
      {label}
    </Button>
  );
}
