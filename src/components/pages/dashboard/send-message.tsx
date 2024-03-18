import SendIcon from "@/components/common/icons/SendIconW";
import { sendMessageInGroup } from "@/services/api/api";
import { GroupData, Message, useChat } from "@/stores/hooks/useChat";
import {
  HStack,
  Textarea,
  IconButton,
  Box,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

export default function SendMessage({
  session,
  ws,
  messageRef,
}: {
  session: any;
  ws: WebSocket;
  messageRef: HTMLDivElement;
}) {
  const { groupData, messages, setMessages, isActive, setMessage } = useChat(
    (state) => {
      return {
        groupData: state.groupData as GroupData | undefined,
        messages: state.messages as Message[],
        setMessages: state.setMessages,
        setMessage: state.setMessage,
        isActive: state.isActive,
      };
    }
  );
  const toast = useToast();

  const validationSchema = Yup.object()
    .shape({
      message: Yup.string().required(),
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
    ...formik
  } = useFormik({
    initialValues: {
      message: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      if (groupData) {
        const { data, isError, error } = await sendMessageInGroup({
          token: session?.user?.accessToken,
          groupUniqueId: groupData.groupUniqueId,
          payload: values,
        });
        if (!isError) {
          setMessage(data.data);
          setTimeout(() => {
            messageRef?.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
          if (ws && isActive) {
            const payload = {
              event: "grp_msg_received",
              data: data.data,
            };
            ws.send(JSON.stringify(payload));
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
        resetForm();
      }
    },
  });

  return (
    <Box
      alignSelf={"flex-end"}
      w={"full"}
      borderTopWidth={1}
      borderColor={"gray.300"}
      p={"15px"}
      height={"10%"}
    >
      <HStack>
        <FormControl>
          <Textarea
            placeholder="Type a message..."
            resize={"none"}
            p={2}
            pl={5}
            rows={1}
            bg={"#e4e9f0"}
            borderRadius={"3xl"}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.message}
            variant={"unstyled"}
            _selected={{
              borderWidth: 0,
            }}
            name="message"
          />
        </FormControl>
        <IconButton
          icon={<SendIcon />}
          color={"gray.500"}
          aria-label={"Send Button"}
          onClick={handleSubmit as any}
        />
      </HStack>
    </Box>
  );
}
