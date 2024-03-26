import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useBreakpointValue,
  Box,
  Input,
  InputGroup,
  Text,
  VStack,
  HStack,
  Image,
  SkeletonCircle,
  Checkbox,
  Button,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { useGroupModal } from "@/stores/hooks/useGroupModal";
import { useSideMenu } from "@/stores/hooks/useSideMenu";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User, useChat } from "@/stores/hooks/useChat";
import { createGroup, getUserAssociatedGroups } from "@/services/api/api";

export default function CreateGroup({ session }: { session: any }) {
  const size = useBreakpointValue({ base: "full", md: "lg" });
  const toast = useToast();
  const { groups, setGroups, closeSideMenu } = useSideMenu((state) => {
    return {
      groups: state.groups,
      setGroups: state.setGroups,
      closeSideMenu: state.closeSideMenu,
    };
  });
  const { setGroup } = useChat((state) => {
    return {
      setGroup: state.setGroup,
    };
  });
  const { isOpen, onClose } = useGroupModal();
  const validationSchema = Yup.object()
    .shape({
      groupName: Yup.string().required(),
      users: Yup.array(Yup.string()).min(2).required(),
    })
    .required();

  const {
    dirty,
    isValid,
    isSubmitting,
    handleSubmit,
    resetForm,
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    ...formik
  } = useFormik({
    initialValues: {
      groupName: "",
      users: [],
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      console.log(values);
      const payload = {
        name: values.groupName,
        isGroup: true,
        users: values.users,
      };
      const {
        data: createGrpData,
        isError,
        error,
      } = await createGroup({
        token: session?.user?.accessToken,
        payload,
      });
      if (!isError) {
        const {
          data: grpList,
          isError: isErrorGrpList,
          error: associatedGrpError,
        } = await getUserAssociatedGroups({
          token: session?.user?.accessToken,
        });
        if (!isErrorGrpList) {
          setGroups(grpList.data?.groups);
          const grp = grpList.data?.groups.find(
            (e: any) => e.groupUniqueId === createGrpData.data?.groupUniqueId
          );
          setGroup(grp);
          resetForm();
          onClose();
          closeSideMenu();
        } else {
          toast({
            title: associatedGrpError,
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
        }
      } else {
        toast({
          title: error,
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      }
    },
  });

  const handleUserClick = (user: User) => {
    console.log(typeof user.userUniqueId, "check user unique id");
    if (values.users.includes(user.userUniqueId as never)) {
      const filteredUsers = values.users.filter(
        (userUniqueId: string) => user.userUniqueId !== userUniqueId
      );
      setFieldValue("users", filteredUsers);
    } else {
      values.users.push(user.userUniqueId as never);
      setFieldValue("users", values.users);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      size={size}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Group</ModalHeader>
        <ModalCloseButton />
        <ModalBody p={0}>
          <Box p={5}>
            <InputGroup pb={5}>
              <Input
                placeholder="Group name"
                border={"none"}
                colorScheme="whatsapp"
                bg={"gray.100"}
                w={"full"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.groupName}
                name="groupName"
              />
            </InputGroup>
            <Text>USERS</Text>
          </Box>
          <VStack
            w={"full"}
            height={"300px"}
            overflowY={"scroll"}
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
            {groups.map((group, i) =>
              !group.isGroup
                ? group.otherParticipants.map((user) => (
                    <>
                      <HStack
                        cursor={"pointer"}
                        w={"100%"}
                        pl={5}
                        pt={2}
                        pb={2}
                        key={`GROUP_USERS_${i}`}
                        onClick={() => {
                          handleUserClick(user);
                        }}
                      >
                        <Box>
                          <Image
                            src="/user.png"
                            alt="Dan Abramov"
                            borderRadius="full"
                            boxSize="38px"
                            fallback={<SkeletonCircle size={"30px"} />}
                          />
                        </Box>
                        <VStack width={"100%"} alignItems={"flex-start"}>
                          <Text
                            textTransform={"capitalize"}
                            w={"60%"}
                            textOverflow={"ellipsis"}
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            fontSize={"md"}
                            color={"gray.600"}
                          >
                            {user.name}
                          </Text>
                        </VStack>
                        <Box marginLeft={"auto"} pr={10}>
                          <Checkbox
                            colorScheme="gray"
                            isChecked={values?.users?.includes(
                              user.userUniqueId as never
                            )}
                          />
                        </Box>
                      </HStack>
                    </>
                  ))
                : ""
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="gray"
            mr={3}
            isDisabled={!dirty || !isValid}
            isLoading={isSubmitting}
            onClick={handleSubmit as any}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
