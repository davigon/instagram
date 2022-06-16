import React from "react"
import {
  Box,
  useColorModeValue,
  Flex,
  Stack,
  Heading,
  VStack,
  Button,
  Text,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"

export const PreHomePage = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex h={"calc(100vh - 8rem)"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"xxl"} py={12} px={6}>
          <VStack spacing={4}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Instagram
            </Heading>
            <Text>
              Clon de Instagram en la mayor parte de su funcionalidad principal,
              y{" "}
              <Text as={"span"} fontWeight={"bold"} color={"blue.400"}>
                en modo incógnito
              </Text>
            </Text>
            <Button
              size="lg"
              _hover={{
                bg: useColorModeValue("blue.600", "blue.300"),
              }}
              as={Link}
              to={"/login"}
            >
              Iniciar sesión
            </Button>
          </VStack>
        </Stack>
      </Flex>
    </Box>
  )
}
