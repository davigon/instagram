import React from "react"
import { Box, useColorModeValue, Flex, Stack, Text } from "@chakra-ui/react"

export const ErrorPage = ({message}: {message: string}) => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex h={"calc(100vh - 8rem)"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"xxl"} py={12} px={6}>
          <Text>{message}</Text>
        </Stack>
      </Flex>
    </Box>
  )
}
