import React, { useState } from "react"
import { VStack, Container } from "@chakra-ui/react"
import { Tray } from "../components/tray/Tray"
import { TrayItem } from "../components/tray/TrayItem"
import { BasicPage } from "./BasicPage"
import { useStoriesTray } from "../hooks/useStoriesTray"

export const HomePage = () => {
  const { storiesTray, isLoading } = useStoriesTray()

  const [selectedItem, setSelectedItem] = useState("")
  const handleClickTrayItem = (id: string) => {
    setSelectedItem(id)
  }

  return (
    <BasicPage>
      <VStack py={6} spacing={8}>
        <Container maxW="container.md">
          <Tray isLoading={isLoading}>
            {storiesTray &&
              storiesTray.map((i) => {
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
