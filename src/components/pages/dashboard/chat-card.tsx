import { HStack, VStack, Box, Image, Text } from "@chakra-ui/react";
import {} from "framer-motion";
import React from "react";

export default function ChatCard() {
  return (
    <HStack w={"full"} mb={2} cursor={"pointer"}>
      <Box>
        <Image
          src="https://bit.ly/dan-abramov"
          alt="Dan Abramov"
          borderRadius="full"
          boxSize="30px"
        />
      </Box>
      <VStack>
        <Text fontSize={"sm"}>Power Rangers</Text>
      </VStack>
    </HStack>
  );
}
