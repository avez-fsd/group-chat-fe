import ChatBox from "@/components/pages/dashboard/chat-box";
import SideBar from "@/components/pages/dashboard/sidebar";
import { HStack, VStack, Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <HStack h={"100vh"}>
      <SideBar />
      <ChatBox />
    </HStack>
  );
}
