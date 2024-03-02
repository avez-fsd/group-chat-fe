"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    components: {
      Drawer: {
        variants: {
          aside: {
            dialog: {
              pointerEvents: "auto",
            },
            dialogContainer: {
              pointerEvents: "none",
            },
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider>{children}</SessionProvider>
    </ChakraProvider>
  );
}
