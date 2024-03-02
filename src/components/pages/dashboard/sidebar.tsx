import PlusSquareIconW from "@/components/common/icons/PlusSquareIconW";
import SearchIconW from "@/components/common/icons/SearchIconW";
import {
  VStack,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Box,
  Image,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import ChatCard from "./chat-card";

export default function SideBar() {
  return (
    <VStack
      bg={"white"}
      borderRadius={"lg"}
      width={"20%"}
      height={"100%"}
      ml={2}
    >
      <HStack mt={6} w={"full"}>
        <Box>
          <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            borderRadius="full"
            boxSize="50px"
          />
        </Box>
        <VStack>
          <Text>Don abravov</Text>
        </VStack>
      </HStack>
      <Box w={"full"} pl={1} pr={1} mt={5}>
        <InputGroup>
          <InputLeftElement>
            <SearchIconW />
          </InputLeftElement>
          <Input
            type="search"
            placeholder="search in..."
            border={"none"}
            colorScheme="whatsapp"
            _hover={{
              border: "none",
            }}
            borderRadius={"3xl"}
            bg={"gray.100"}
            w={"full"}
            pl={9}
          />
        </InputGroup>
      </Box>
      <HStack
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={"row"}
        display={"flex"}
        w={"full"}
        mt={10}
      >
        <Box>
          <Text>GROUPS</Text>
        </Box>
        <Box>
          <IconButton
            bg={"white"}
            aria-label="Search database"
            icon={<PlusSquareIconW />}
          />
        </Box>
      </HStack>
      <VStack
        w={"full"}
        height={"100%"}
        overflowY={"auto"}
        ml={3}
        // borderColor={"red"}
        // borderWidth={1}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "24px",
          },
        }}
      >
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
        <ChatCard />
      </VStack>
    </VStack>
  );
}
