"use client";

import Login from "@/components/pages/login/login";
import SignUp from "@/components/pages/login/signup";
import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function LoginContent() {
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <Flex
      h={"100vh"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
    >
      {showSignUp ? <SignUp /> : <Login />}
      {showSignUp ? (
        <Box mt={5}>
          <Text>
            Already have an account?{" "}
            <Text
              as={"span"}
              _hover={{ cursor: "pointer" }}
              textDecor={"underline"}
              onClick={() => {
                setShowSignUp(false);
              }}
            >
              Sign In
            </Text>
          </Text>
        </Box>
      ) : (
        <Box mt={5}>
          <Text>
            Dont have an account?{" "}
            <Text
              as={"span"}
              _hover={{ cursor: "pointer" }}
              textDecor={"underline"}
              onClick={() => {
                setShowSignUp(true);
              }}
            >
              Create an Account
            </Text>
          </Text>
        </Box>
      )}
    </Flex>
  );
}
