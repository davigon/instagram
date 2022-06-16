import React from "react"
import {
  Avatar,
  Badge,
  Box,
  Flex,
  Hide,
  HStack,
  Show,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { User } from "../../../../types/types"

export const UserCard = ({ user }: { user: User }) => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      p={6}
    >
      <Hide above={"md"}>
        <MobileUserCard user={user} />
      </Hide>
      <Show above={"md"}>
        <DesktopUserCard user={user} />
      </Show>
    </Box>
  )
}

const MobileUserCard = ({ user }: { user: User }) => {
  return (
    <VStack alignItems={"start"} spacing={6}>
      <HStack spacing={6}>
        <Avatar size={"xl"} src={user.profilePicUrl} />
        <VStack spacing={0}>
          <Badge fontSize="0.9rem">{user.mediaCount}</Badge>
          <Box fontWeight="semibold">publicaciones</Box>
        </VStack>
        <VStack spacing={0}>
          <Badge fontSize="0.9rem">{user.followerCount}</Badge>
          <Box fontWeight="semibold">seguidores</Box>
        </VStack>
        <VStack spacing={0}>
          <Badge fontSize="0.9rem">{user.followingCount}</Badge>
          <Box fontWeight="semibold">siguiendo</Box>
        </VStack>
      </HStack>
      <VStack align={"start"} justifyContent={"start"} spacing={4}>
        <Flex alignItems={"center"}>
          <Text fontWeight={"bold"} fontSize={"2xl"} mr={2}>
            {user.name}
          </Text>
          <Text fontSize={"lg"} color={"gray.500"}>
            {"@" + user.username}
          </Text>
        </Flex>
        <Box>
          {user.biography.split("\n").map((str: React.ReactNode, i: number) => (
            <Text key={"bioText" + i}>{str}</Text>
          ))}
        </Box>
      </VStack>
    </VStack>
  )
}

const DesktopUserCard = ({ user }: { user: User }) => {
  return (
    <HStack alignItems={"start"} spacing={6}>
      <Box w={"40%"} alignItems={"center"}>
        <VStack spacing={6}>
          <Avatar size={"2xl"} src={user.hdProfilePicUrl} />
          <HStack textAlign={"center"}>
            <VStack spacing={0}>
              <Badge fontSize="0.9rem">{user.mediaCount}</Badge>
              <Box fontWeight="semibold">publicaciones</Box>
            </VStack>
            <VStack spacing={0}>
              <Badge fontSize="0.9rem">{user.followerCount}</Badge>
              <Box fontWeight="semibold">seguidores</Box>
            </VStack>
            <VStack spacing={0}>
              <Badge fontSize="0.9rem">{user.followingCount}</Badge>
              <Box fontWeight="semibold">siguiendo</Box>
            </VStack>
          </HStack>
        </VStack>
      </Box>
      <Box w={"60%"}>
        <VStack align={"start"} justifyContent={"start"} spacing={4}>
          <Flex alignItems={"center"}>
            <Text fontWeight={"bold"} fontSize={"2xl"} mr={2}>
              {user.name}
            </Text>
            <Text fontSize={"lg"} color={"gray.500"}>
              {"@" + user.username}
            </Text>
          </Flex>
          <Box>
            {user.biography
              .split("\n")
              .map((str: React.ReactNode, i: number) => (
                <Text key={"bioText" + i}>{str}</Text>
              ))}
          </Box>
        </VStack>
      </Box>
    </HStack>
  )
}
