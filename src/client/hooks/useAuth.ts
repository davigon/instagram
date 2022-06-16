import { useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useMutation, UseMutationResult } from "react-query"
import { useNavigate } from "react-router-dom"
import { LoginResponse } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

type LoginRequest = {
  username: string
  password: string
}

export const useAuth = () => {
  const [localStorageSession, setLocalStorageSession] = useLocalStorage(
    "session",
    ""
  )

  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoggedIn(localStorageSession !== null && localStorageSession !== "")
  }, [])

  useEffect(() => {
    setIsLoading(false)
  }, [isLoggedIn])

  const loginFetch = async (loginRequest: LoginRequest) => {
    const response = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: loginRequest.username,
        password: loginRequest.password,
      }),
    })
    if (response.status >= 300) throw Error("Usuario o contraseña incorrectos.")
    return response.json()
  }

  const loginQuery: UseMutationResult<LoginResponse, Error, LoginRequest> =
    useMutation(["login"], loginFetch, {
      onSuccess: (data: LoginResponse) => {
        setLocalStorageSession(data.session)
        setIsLoading(true)
        setIsLoggedIn(true)
        navigate("/home")
        toast({
          title: "Inicio de sesión correcto.",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      },
      onError: (error: Error) => {
        toast({
          title: "Hubo un problema.",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      },
    })

  const login = (username: string, password: string) => {
    const loginRequest: LoginRequest = {
      username,
      password,
    }
    loginQuery.mutate(loginRequest)
  }

  const logoutFetch = async () => {
    const response = await fetch(`/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        session: localStorageSession,
      },
      credentials: "include",
    })
    if (response.status >= 300)
      throw Error("Hubo un problema al procesar la petición.")
    return response.json()
  }

  const logoutQuery = useMutation(["logout"], logoutFetch, {
    onSuccess: () => {
      setLocalStorageSession("")
      setIsLoading(true)
      setIsLoggedIn(false)
      navigate("/")
      toast({
        title: "Sesión cerrada correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    },
    onError: (error: Error) => {
      toast({
        title: "Hubo un problema.",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    },
  })

  const logout = () => {
    logoutQuery.mutate()
  }

  return {
    login,
    isLoadingLogin: loginQuery.isLoading,
    logout,
    isLoadingLogout: logoutQuery.isLoading,
    isLoggedIn,
    isLoading,
  }
}
