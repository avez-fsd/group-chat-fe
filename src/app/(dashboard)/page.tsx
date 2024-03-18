import ChatBox from "@/components/pages/dashboard/chat-box";
import SideBar from "@/components/pages/dashboard/sidebar";
import { HStack } from "@chakra-ui/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <HStack h={"100dvh"}>
      <SideBar session={session} />
      <ChatBox session={session} />
    </HStack>
  );
}
