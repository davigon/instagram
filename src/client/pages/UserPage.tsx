import React, { useState } from "react"
import { Box, Container, VStack } from "@chakra-ui/react"
import { useUser } from "../hooks/useUser"
import { useParams } from "react-router-dom"
import { UserCard } from "../components/user/UserCard"
import { BasicPage } from "./BasicPage"
import { Tray } from "../components/tray/Tray"
import { useHighlightsTray } from "../hooks/useHighlightsTray"
import { TrayItem } from "../components/tray/TrayItem"

export const UserPage = () => {
  const { username } = useParams()
  const { userQuery } = useUser(String(username))
  const { highlightsTray, isLoading } = useHighlightsTray(
    String(username),
    userQuery.data?.currentUserAllowedToView || false
  )

  const [selectedItem, setSelectedItem] = useState("")
  const handleClickTrayItem = (id: string) => {
    setSelectedItem(id)
  }

  if (userQuery.isLoading || userQuery.data === undefined)
    return <Box>Cargando</Box>

  return (
    <BasicPage>
      <VStack py={6} spacing={8}>
        <Container maxW="container.md">
          <UserCard user={userQuery.data} />
        </Container>
        <Container maxW="container.md">
          <Tray isLoading={isLoading}>
            {highlightsTray &&
              highlightsTray.map((i) => {
                return (
                  <TrayItem
                    key={i.id}
                    itemId={i.id}
                    item={i}
                    onClick={handleClickTrayItem}
                    active={selectedItem === i.id}
                  />
                )
              })}
          </Tray>
        </Container>
      </VStack>
    </BasicPage>
  )
}
