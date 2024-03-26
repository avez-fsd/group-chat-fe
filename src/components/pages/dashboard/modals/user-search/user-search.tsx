import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useBreakpointValue,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  HStack,
  SkeletonCircle,
  Box,
  SkeletonText,
  useToast,
  Image,
  Spinner,
} from "@chakra-ui/react";
import SearchIconW from "@/components/common/icons/SearchIconW";
import { group } from "console";
import { useUserSearchModal } from "@/stores/hooks/useUserSearchModal";
import { createGroup, searchUsers } from "@/services/api/api";
import useDebounce from "@/hooks/useDebounce";
import { useSideMenu } from "@/stores/hooks/useSideMenu";
import { GroupData, useChat } from "@/stores/hooks/useChat";

interface User {
  name: string;
  email: string;
  userId: string;
}

export default function UserSearch({ session }: { session: any }) {
  const size = useBreakpointValue({ base: "full", md: "lg" });
  const { isOpen, onClose } = useUserSearchModal();
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedSearch = useDebounce(search, 500);
  const toast = useToast();
  const { groups, closeSideMenu, setNewGroup } = useSideMenu((state) => {
    return {
      closeSideMenu: state.closeSideMenu,
      groups: state.groups,
      setNewGroup: state.setGroup,
    };
  });
  const { groupData, isActive, setGroup } = useChat((state) => {
    return {
      groupData: state.groupData as GroupData | undefined,
      isActive: state.isActive,
      setGroup: state.setGroup,
    };
  });

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      setUsers([]);
      const { data, isError, error } = await searchUsers({
        token: session?.user?.accessToken,
        search: debouncedSearch,
      });
      if (!isError) setUsers(data.data.result);
      setLoading(false);
    }
    if (debouncedSearch) fetchUsers();
  }, [debouncedSearch]);

  const createPrivateGroup = async (user: User) => {
    const grp = groups.find(
      (group) =>
        !group.isGroup && group.otherParticipants[0].email === user.email
    );
    if (grp) {
      if (grp.groupUniqueId !== groupData?.groupUniqueId || !isActive) {
        setGroup(grp);
        closeSideMenu();
      }
      return;
    }
    const payload = {
      name: "",
      isGroup: false,
      users: [user.userId],
    };
    const { data, isError, error } = await createGroup({
      token: session?.user?.accessToken,
      payload,
    });
    if (!isError) {
      const newGroup = {
        groupUniqueId: data.data.groupUniqueId,
        isAdmin: true,
        isGroup: false,
        name: data.data.name,
        otherParticipants: [user],
      };
      setNewGroup(newGroup);
      setGroup(newGroup);
      closeSideMenu();
      onClose();
    } else {
      toast({
        title: error,
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} size={size} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent height={"500px"}>
        <ModalHeader>Search Users</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box p={5}>
            <InputGroup pb={5}>
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <Text>USERS</Text>
          </Box>
          <VStack
            w={"full"}
            height={"auto"}
            overflowY={"auto"}
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
            {loading ? <Spinner /> : null}
            {users.map((user, i) => (
              <HStack
                w={"full"}
                cursor={"pointer"}
                _hover={{
                  bg: "gray.100",
                }}
                pl={5}
                pt={2}
                pb={2}
                key={`USER_${i}`}
                onClick={() => {
                  createPrivateGroup(user);
                }}
              >
                <Box>
                  <Image
                    src="/user.png"
                    alt="Dan Abramov"
                    borderRadius="full"
                    boxSize="40px"
                    fallback={<SkeletonCircle size={"30px"} />}
                  />
                </Box>
                <VStack width={"full"} alignItems={"flex-start"}>
                  <Text
                    textTransform={"capitalize"}
                    w={"60%"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    fontSize={"md"}
                    color={"gray.600"}
                  >
                    {user?.name}
                  </Text>
                </VStack>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
