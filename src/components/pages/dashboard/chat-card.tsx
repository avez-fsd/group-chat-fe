import { GroupData, useChat } from "@/stores/hooks/useChat";
import { useSideMenu } from "@/stores/hooks/useSideMenu";
import { isMobile } from "@/utils/common";
import {
  HStack,
  VStack,
  Box,
  Image,
  Text,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import {} from "framer-motion";
import React from "react";

type ChatCardPropsType = {
  isLoading: boolean;
  group?: GroupData;
};

export default function ChatCard({ isLoading, group }: ChatCardPropsType) {
  const { setGroup, groupData, isActive } = useChat((state) => {
    return {
      setGroup: state.setGroup,
      isActive: state.isActive,
      groupData: state.groupData,
    };
  });
  const { closeSideMenu } = useSideMenu();

  const setCurrentGroup = () => {
    if (group?.groupUniqueId !== groupData?.groupUniqueId || !isActive) {
      setGroup(group);
    }
    if (isMobile()) {
      closeSideMenu();
    }
  };

  return (
    <HStack
      w={"full"}
      mb={2}
      cursor={"pointer"}
      onClick={setCurrentGroup}
      key={group?.groupUniqueId}
    >
      <Box>
        {isLoading ? (
          <SkeletonCircle size={"30px"} />
        ) : (
          <Image
            src={group?.isGroup ? "/group2.png" : "user.png"}
            alt="Dan Abramov"
            borderRadius="full"
            boxSize="30px"
            fallback={<SkeletonCircle size={"30px"} />}
          />
        )}
      </Box>
      <VStack width={"full"} alignItems={"flex-start"}>
        {isLoading ? (
          <SkeletonText noOfLines={1} skeletonHeight="2" w={"70%"} />
        ) : (
          <Text
            textTransform={"capitalize"}
            w={"60%"}
            textOverflow={"ellipsis"}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            fontSize={"sm"}
          >
            {!group?.isGroup
              ? group?.otherParticipants?.[0]?.name
              : group?.name}
          </Text>
        )}
      </VStack>
    </HStack>
  );
}
