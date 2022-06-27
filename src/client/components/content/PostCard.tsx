import React from "react"
import {
  VStack,
  Text,
  useColorModeValue,
  Flex,
  Spacer,
  Box,
  Center,
  Badge,
} from "@chakra-ui/react"
import { Post } from "../../../../types/types"
import { MediaComponent } from "../media/MediaComponent"
import "react-responsive-carousel/lib/styles/carousel.min.css"

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <VStack
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      pb={6}
      spacing={6}
      alignItems={"start"}
      height={"fit-content"}
    >
      <MediaComponent medias={post.medias} />
      <Box>
        <Text px={6} fontWeight="semibold">
          <Badge px="2" mb={1} mr={2} colorScheme="red" fontSize="0.9rem">
            {post.likes}
          </Badge>
          Me gusta
        </Text>
        <Text px={6} noOfLines={6}>
          <span style={{ fontWeight: "bolder" }}>{post.username} </span>
          {post.caption}
        </Text>
      </Box>
      <Center w={"100%"} px={6}>
        <Text>{new Date(post.takenAt * 1000).toLocaleString()}</Text>
      </Center>
    </VStack>
  )
}
