"use client";

import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const toast = useToast();
  const router = useRouter();

  const validationSchema = Yup.object()
    .shape({
      name: Yup.string().min(2).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
    })
    .required();

  const {
    dirty,
    isValid,
    isSubmitting,
    handleSubmit,
    resetForm,
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    ...formik
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const data = await signIn("sign-up", {
        ...values,
        redirect: false,
      });

      if (data?.error) {
        toast({
          title: data.error,
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      } else {
        router.push("/");
      }
      // setTimeout(async () => {
      const session = await getSession();
      console.log(session, "check this");
    },
  });

  return (
    <Flex
      flexDirection="column"
      bg="gray.100"
      p={12}
      borderRadius={8}
      boxShadow="lg"
      w={{ base: "90%", lg: "50%" }}
    >
      <Heading mb={6} textAlign={"center"}>
        Sign Up
      </Heading>
      <FormControl isRequired isInvalid={!!errors.name && touched.name}>
        <Input
          placeholder="Name"
          type="text"
          variant="flushed"
          colorScheme="whatsapp"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          mb={1}
        />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.email && touched.email}>
        <Input
          placeholder="Email"
          type="email"
          variant="flushed"
          colorScheme="whatsapp"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          mb={1}
        />
        <FormErrorMessage>{errors.email}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={!!errors.password && touched.password}>
        <Input
          placeholder="Password"
          type="password"
          variant="flushed"
          name="password"
          colorScheme="whatsapp"
          onBlur={handleBlur}
          onChange={handleChange}
          mb={1}
        />
        <FormErrorMessage>{errors.password}</FormErrorMessage>
      </FormControl>
      <Button
        colorScheme="whatsapp"
        mt={8}
        onClick={handleSubmit}
        isLoading={isSubmitting}
        isDisabled={!dirty || !isValid}
      >
        Sign Up
      </Button>
    </Flex>
  );
}
