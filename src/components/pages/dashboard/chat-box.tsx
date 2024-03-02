import HamburgerIconW from "@/components/common/icons/HamburgerIconW";
import SendIcon from "@/components/common/icons/SendIconW";
import {
  VStack,
  Box,
  Text,
  Divider,
  HStack,
  IconButton,
  Input,
  Textarea,
} from "@chakra-ui/react";
import React from "react";

export default function ChatBox() {
  return (
    <VStack
      bg={"white"}
      borderRadius={"lg"}
      width={"80%"}
      height={"100%"}
      pt={5}
    >
      <Box
        bg={"gray.100"}
        height={"full"}
        width={"full"}
        borderRadius={"xl"}
        // borderWidth={1}
        // borderColor={"red"}
        position={"relative"}
      >
        <HStack w={"100%"} padding={2}>
          <Box>
            <IconButton
              bg={"gray.100"}
              aria-label="Search database"
              icon={<HamburgerIconW />}
            />
          </Box>
          <VStack
            w={"100%"}
            //   borderWidth={1}
            //   borderColor={"red"}
            alignItems={"flex-start"}
          >
            <Text fontWeight={"bold"} fontSize={"md"}>
              Power Rangers
            </Text>
            <Text color={"gray.500"} fontSize={"sm"} lineHeight={0}>
              10 members
            </Text>
          </VStack>
        </HStack>
        <Divider opacity={1} borderWidth={1} mt={5} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          mt={10}
          borderWidth={1}
          borderColor={"red"}
        >
          <Text textAlign={"right"}>Hi Bro</Text>
          <Text textAlign={"left"}>Hi Bro</Text>
        </Box>
        <Box
          position={"absolute"}
          bottom={0}
          w={"full"}
          borderTopWidth={1}
          borderColor={"gray.300"}
          p={"15px"}
        >
          <HStack>
            <Textarea
              placeholder="Type a message..."
              // borderWidth={1}
              // borderColor={"red"}
              resize={"none"}
              p={2}
              pl={5}
              rows={1}
              bg={"#e4e9f0"}
              borderRadius={"3xl"}
              variant={"unstyled"}
              _selected={{
                borderWidth: 0,
              }}
            />
            <IconButton
              icon={<SendIcon />}
              color={"gray.500"}
              aria-label={"Send Button"}
            />
          </HStack>
        </Box>
      </Box>
    </VStack>
  );
}
