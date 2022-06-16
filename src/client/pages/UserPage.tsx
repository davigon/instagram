import React from "react"
import { Box, Container } from "@chakra-ui/react"
import { useUser } from "../hooks/useUser"
import { useParams } from "react-router-dom"
import { UserCard } from "../components/user/UserCard"
import { BasicPage } from "./BasicPage"

export const UserPage = () => {
  const { username } = useParams()
  const { userQuery } = useUser(String(username))

  if (userQuery.isLoading || userQuery.data === undefined)
    return <Box>Cargando</Box>

  return (
    <BasicPage>
      <Container maxW="container.md" py={6}>
        <UserCard user={userQuery.data} />
      </Container>
    </BasicPage>
  )
}
