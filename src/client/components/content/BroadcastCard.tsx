import React from "react"
import {
  Text,
  useColorModeValue,
  Badge,
  VStack,
  Button,
  useClipboard,
  Box,
  HStack,
} from "@chakra-ui/react"
import { TrayItem } from "../../../../types/types"
import { VideoJsPlayer } from "../media/VideoJsPlayer"
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons"

export const BroadcastCard = ({ trayItem }: { trayItem?: TrayItem }) => {
  const { hasCopied, onCopy } = useClipboard(trayItem?.broadcast?.url || "")

  if (!trayItem) return null

  return (
    <VStack
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"base"}
      pb={6}
      spacing={3}
      alignItems={"start"}
      width={"100%"}
      height={"100%"}
    >
      <Box width={"100%"}>
        <VideoJsPlayer
          id={trayItem.id}
          options={{
            autoplay: "play",
            controls: true,
            sources: [
              {
                src: `/api/cors/${trayItem.broadcast?.url}` || "",
              },
            ],
            html5: {
              nativeAudioTracks: false,
              nativeVideoTracks: false,
            },
            fluid: true,
          }}
        />
      </Box>
      <Box pt={6} px={6}>
        <VStack>
          <Text fontWeight="semibold">
            <Badge px={2} mb={1} mr={2} colorScheme="blue" fontSize="0.9rem">
              {trayItem.broadcast?.views}
            </Badge>
            Espectadores
          </Text>
          <HStack spacing={2}>
            <Button
              colorScheme={"whiteAlpha"}
              bg={useColorModeValue("gray.100", "gray.900")}
              color={useColorModeValue("black", "white")}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.200", "whiteAlpha.200"),
              }}
              aria-label="copy"
              onClick={onCopy}
            >
              {!hasCopied ? <CopyIcon /> : "¡Copiado!"}
            </Button>
            <Button
              colorScheme="orange"
              aria-label="vlc"
              onClick={() => window.open("vlc://" + trayItem.broadcast?.url)}
            >
              VLC <ExternalLinkIcon mx={1} />
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}
