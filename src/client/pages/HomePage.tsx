import React from "react"
import { Button, useColorModeValue } from "@chakra-ui/react"
import { useAuth } from "../hooks/useAuth"
import { BasicPage } from "./BasicPage"

export const HomePage = () => {
  const { logout } = useAuth()

  return (
    <BasicPage>
      <Button
        size="lg"
        _hover={{
          bg: useColorModeValue("blue.600", "blue.300"),
        }}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </BasicPage>
  )
}
