"use client";

import HamburgerIconW from "@/components/common/icons/HamburgerIconW";
import { getGroupMessages } from "@/services/api/api";
import { GroupData, Message, useChat } from "@/stores/hooks/useChat";
import { useSideMenu } from "@/stores/hooks/useSideMenu";
import {
  VStack,
  Box,
  Text,
  Divider,
  HStack,
  IconButton,
  Badge,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import SendMessage from "./send-message";
import { useToast } from "@chakra-ui/react";

export default function ChatBox({ session }: any) {
  const {
    groupData,
    messages,
    setMessages,
    isActive,
    setIsActive,
    setMessage,
  } = useChat((state) => {
    return {
      groupData: state.groupData as GroupData | undefined,
      messages: state.messages as Message[],
      isActive: state.isActive,
      setMessages: state.setMessages,
      setIsActive: state.setIsActive,
      setMessage: state.setMessage,
    };
  });
  const { isOpen, toggleIsOpen } = useSideMenu();
  const toast = useToast();
  const ws = useRef<WebSocket | undefined>();
  const messagesRef = useRef<HTMLDivElement | null>();
  const reconnTimeout = useRef<any>(null);

  const closeSocketConnection = () => {
    if (ws.current) {
      setIsActive(false);
      ws.current.close();
    }
  };
  const createNewSocketConnection = () => {
    if (ws.current?.CLOSED === 3 || ws.current === undefined) {
      console.log("Joining", groupData?.groupUniqueId);
      ws.current = new WebSocket(
        `ws://localhost:8000?event=join_group&groupUniqueId=${groupData?.groupUniqueId}`,
        [session?.user?.accessToken]
      );
      ws.current.onmessage = (e: any) => {
        if (e.data) {
          const data = JSON.parse(e.data);
          setMessage(data.message);
        }
      };
      ws.current.onclose = (e: any) => {
        console.log("Closed", groupData?.groupUniqueId);
        setIsActive(false);
        if (e.code !== 1005) {
          reconnTimeout.current = setTimeout(() => {
            createNewSocketConnection();
          }, 3000);
        }
      };
      ws.current.onerror = (e: any) => {
        console.log("Error", groupData?.groupUniqueId);
        setIsActive(false);
        ws.current?.close();
      };
      ws.current.onopen = (e: any) => {
        console.log("Opened", groupData?.groupUniqueId);
        setIsActive(true);
      };
    }
  };

  useEffect(() => {
    if (groupData) {
      (async () => {
        const { data, isError, error } = await getGroupMessages({
          token: session?.user?.accessToken,
          groupUniqueId: groupData.groupUniqueId,
        });
        if (!isError) {
          setMessages(data.data.messages);
          setTimeout(() => {
            messagesRef?.current?.scrollIntoView({
              // behavior: "smooth",
            });
          }, 10);
        } else {
          toast({
            title: error,
            status: "error",
            duration: 9000,
            position: "top",
            isClosable: true,
          });
        }
      })();

      createNewSocketConnection();
    }
    return () => {
      console.log("this is running clean funciton");
      closeSocketConnection();
      clearTimeout(reconnTimeout.current);
    };
  }, [groupData]);

  return (
    <VStack
      bg={"white"}
      borderRadius={"lg"}
      width={{
        base: "100%",
        sm: isOpen ? "65%" : "100%",
        md: isOpen ? "70%" : "100%",
        lg: isOpen ? "75%" : "100%",
        xl: isOpen ? "80%" : "100%",
      }}
      height={"100%"}
    >
      <Box
        bg={"gray.100"}
        height={"full"}
        width={"full"}
        borderRadius={"xl"}
        display={"flex"}
        flexDirection={"column"}
      >
        <HStack w={"100%"} padding={2} height={"10%"}>
          <Box>
            <IconButton
              bg={"gray.100"}
              aria-label="Search database"
              icon={<HamburgerIconW />}
              onClick={() => toggleIsOpen()}
            />
          </Box>
          {groupData ? (
            <VStack w={"100%"} alignItems={"flex-start"}>
              <Text fontWeight={"bold"} fontSize={"md"}>
                {!groupData?.isGroup
                  ? groupData.otherParticipants?.[0]?.name
                  : groupData?.name}
                <Tooltip label={isActive ? "Connected" : "Disconnected"}>
                  <Badge
                    background={isActive ? "green.300" : "red.300"}
                    borderRadius={"100%"}
                    variant={"solid"}
                    w={2.5}
                    h={2.5}
                    position={"relative"}
                    left={"10px"}
                    // bottom={"4px"}
                  ></Badge>
                </Tooltip>
              </Text>
              {groupData.isGroup ? (
                <Text color={"gray.500"} fontSize={"sm"} lineHeight={0}>
                  {groupData?.otherParticipants?.length} members
                </Text>
              ) : (
                ""
              )}
            </VStack>
          ) : (
            ""
          )}
        </HStack>
        <Divider opacity={1} borderWidth={1} />
        {groupData ? (
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              p={5}
              pb={0}
              height={"80%"}
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
              {messages.map((message, i) => (
                <Box
                  key={i}
                  alignSelf={
                    message.user.email === session.user.email
                      ? "flex-end"
                      : "flex-start"
                  }
                  p={1}
                  maxWidth={"75%"}
                  borderRadius={"lg"}
                  mb={2}
                >
                  <Text fontWeight={"bold"}>{message.user.name}</Text>
                  <Text>{message.message}</Text>
                </Box>
              ))}
              <Box ref={messagesRef as any}></Box>
            </Box>
            <SendMessage
              session={session}
              ws={ws.current as WebSocket}
              messageRef={messagesRef.current as HTMLDivElement}
            />
          </>
        ) : (
          <Box
            h={"90%"}
            display={"flex"}
            w={"full"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontSize={"2xl"}>Select a chat to start messaging</Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}
