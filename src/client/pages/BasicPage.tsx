import React from "react"
import { Box, useColorModeValue } from "@chakra-ui/react"

export const BasicPage = ({ children }: { children?: JSX.Element | JSX.Element[] }) => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      minH={"calc(100vh - 8rem)"}
    >
      {children}
    </Box>
  )
}
