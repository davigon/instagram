import React, { ChangeEvent, FormEvent, useState } from "react"
import {
  Box,
  FormControl,
  FormLabel,
  Button,
  Input,
  useColorModeValue,
  Flex,
  Heading,
  Stack,
  VStack,
} from "@chakra-ui/react"
import { useAuthContext } from "../context/UseAuthContext"

export const LoginPage = () => {
  const { useGlobalAuth } = useAuthContext()
  const { login, isLoadingLogin } = useGlobalAuth

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex h={"calc(100vh - 8rem)"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"xxl"} py={12} px={6}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Inicio de sesión
          </Heading>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"base"}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <Box>
                  <FormControl id="username">
                    <FormLabel>Usuario</FormLabel>
                    <Input
                      type="text"
                      value={username}
                      onChange={handleChangeUsername}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="password">
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={handleChangePassword}
                    />
                  </FormControl>
                </Box>
                <Button
                  size="lg"
                  _hover={{
                    bg: useColorModeValue("blue.600", "blue.300"),
                  }}
                  type={"submit"}
                  isLoading={isLoadingLogin}
                  loadingText="Cargando..."
                >
                  Iniciar sesión
                </Button>
              </VStack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}
