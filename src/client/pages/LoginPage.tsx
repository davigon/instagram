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
import { useGlobalAuth } from "../context/useGlobalAuth"
import { TwoFactorLoginRequest } from "../hooks/useAuth"

export const LoginPage = () => {
  const { login, twoFactorData, isLoadingLogin } = useGlobalAuth()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [code, setCode] = useState("")

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value)
  }

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }

  const handleChangeCode = (e: ChangeEvent<HTMLInputElement>) => {
    setCode(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const twoFactor: TwoFactorLoginRequest | undefined = twoFactorData
      ? {
          code,
          identifier: twoFactorData.identifier,
          type: twoFactorData.type,
        }
      : undefined
    login({ username, password, twoFactor })
  }

  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")}>
      <Flex minH={"calc(100vh - 8rem)"} align={"center"} justify={"center"}>
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
                      disabled={twoFactorData !== undefined}
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
                      disabled={twoFactorData !== undefined}
                    />
                  </FormControl>
                </Box>
                <Box display={twoFactorData ? "block" : "none"}>
                  <FormControl id="code">
                    <FormLabel>
                      Código {twoFactorData?.type === 0 ? "TOTP" : "SMS"}
                    </FormLabel>
                    <Input
                      type="text"
                      value={code}
                      onChange={handleChangeCode}
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
