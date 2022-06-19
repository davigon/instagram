import React from "react"
import { Box, useColorModeValue, Spinner, Center } from "@chakra-ui/react"

export const LoadingPage = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Center minH={"calc(100vh - 8rem)"}>
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="xl" />
      </Center>
    </Box>
  )
}
