"use client";

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
  SkeletonCircle,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ChatCard from "./chat-card";
import { useSideMenu } from "@/stores/hooks/useSideMenu";
import { CloseIcon } from "@chakra-ui/icons";
import { getUserAssociatedGroups } from "@/services/api/api";
import UserSearch from "./modals/user-search/user-search";
import { useUserSearchModal } from "@/stores/hooks/useUserSearchModal";
import { GroupData } from "@/stores/hooks/useChat";
import { useGroupModal } from "@/stores/hooks/useGroupModal";
import CreateGroup from "./modals/create-group/create-group";

export default function SideBar({ session }: any) {
  const { isOpen, toggleIsOpen, groups, setGroups } = useSideMenu((state) => {
    return {
      isOpen: state.isOpen,
      toggleIsOpen: state.toggleIsOpen,
      groups: state.groups,
      setGroups: state.setGroups,
    };
  });
  const [isLoading, setIsLoading] = useState(true);
  const { onOpen } = useUserSearchModal();
  const { onOpen: onOpenGroupModal, isOpen: isOpenGroupModal } =
    useGroupModal();

  useEffect(() => {
    (async () => {
      const { data, isError, error } = await getUserAssociatedGroups({
        token: session?.user?.accessToken,
      });
      setGroups(data.data?.groups);
      setIsLoading(false);
    })();
  }, []);

  if (isOpen) {
    return (
      <>
        <UserSearch session={session} />
        <CreateGroup session={session} />
        <VStack
          bg={"white"}
          borderRadius={"lg"}
          width={{
            base: "100dvw",
            sm: "35%",
            md: "30%",
            lg: "25%",
            xl: "20%",
          }}
          position={{
            base: "absolute",
            sm: "inherit",
          }}
          left={{
            base: "0px",
          }}
          zIndex={{
            base: 999,
          }}
          height={"100%"}
        >
          <HStack pt={6} w={"full"} pl={2} pr={2}>
            <Box>
              {isLoading ? (
                <SkeletonCircle size={"50px"} />
              ) : (
                <Image
                  src="/user.png"
                  alt={session?.user?.name}
                  borderRadius="full"
                  boxSize="50px"
                  fallback={<SkeletonCircle size={"50px"} />}
                />
              )}
            </Box>
            <VStack w={"50%"} alignItems={"flex-start"}>
              {isLoading ? (
                <SkeletonText noOfLines={1} skeletonHeight="3" w={"100%"} />
              ) : (
                <Text
                  textTransform={"capitalize"}
                  w={"60%"}
                  textOverflow={"ellipsis"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                >
                  {session?.user?.name}
                </Text>
              )}
            </VStack>
            <IconButton
              marginLeft={"auto"}
              bg={"white"}
              display={{
                sm: "none",
              }}
              aria-label="Search database"
              icon={<CloseIcon w={4} h={4} />}
              onClick={() => toggleIsOpen()}
            />
          </HStack>
          <Box w={"full"} pl={2} pr={2} pt={5}>
            {isLoading ? (
              <Skeleton height={"30px"} borderRadius={"3xl"} pl={9} />
            ) : (
              <InputGroup onClick={onOpen}>
                <InputLeftElement>
                  <SearchIconW />
                </InputLeftElement>
                <Input
                  type="search"
                  placeholder="search in..."
                  variant={"unstyled"}
                  border={"none"}
                  colorScheme="whatsapp"
                  _hover={{
                    border: "none",
                  }}
                  borderRadius={"3xl"}
                  bg={"gray.100"}
                  height={10}
                  w={"full"}
                  pl={9}
                />
              </InputGroup>
            )}
          </Box>
          <HStack
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDirection={"row"}
            display={"flex"}
            w={"full"}
            pr={2}
            pl={2}
          >
            <Box>
              <Text>GROUPS</Text>
            </Box>
            <Box>
              <IconButton
                bg={"white"}
                aria-label="Create Group"
                icon={<PlusSquareIconW />}
                onClick={onOpenGroupModal}
              />
            </Box>
          </HStack>
          <VStack
            w={"full"}
            height={"100%"}
            overflowY={"auto"}
            pl={2}
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
            {isLoading
              ? [...Array(5)].map((e, i) => (
                  <ChatCard isLoading={isLoading} key={`LOADING_${i}`} />
                ))
              : groups.map((group: GroupData, i) => (
                  <ChatCard isLoading={isLoading} group={group} key={i} />
                ))}
          </VStack>
        </VStack>
      </>
    );
  }
}
