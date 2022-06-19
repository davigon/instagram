import React from "react"
import {
  Box,
  VStack,
  Text,
  useColorModeValue,
  Link,
  Icon,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { FcMusic } from "react-icons/fc"
import { Story } from "../../../../types/types"
import { MediaComponent } from "../media/MediaComponent"

export const StoryCard = ({ story }: { story: Story }) => {
  return (
    <VStack
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      pb={6}
      spacing={6}
      height={"fit-content"}
    >
      {story.song ? (
        <Box px={6} pt={6} textAlign="center">
          <Text>
            <Icon as={FcMusic} mr={2} />
            <Link href={story.song.songUrl} isExternal>
              {`${story.song.title} - ${story.song.artist}`}
            </Link>
          </Text>
        </Box>
      ) : null}
      <MediaComponent media={story.media} />
      <Flex px={6} alignItems={"center"}>
        <Text>{new Date(story.takenAt * 1000).toLocaleString()}</Text>
        <Spacer />
      </Flex>
    </VStack>
  )
}
