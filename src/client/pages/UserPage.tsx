import React, { useState } from "react"
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react"
import { useUser } from "../hooks/useUser"
import { useParams } from "react-router-dom"
import { UserCard } from "../components/user/UserCard"
import { BasicPage } from "./BasicPage"
import { Tray } from "../components/tray/Tray"
import { useHighlightsTray } from "../hooks/useHighlightsTray"
import { TrayItem } from "../components/tray/TrayItem"
import { StoriesType, useStories } from "../hooks/useStories"
import { ContentGrid } from "../components/content/ContentGrid"
import { StoryCard } from "../components/content/StoryCard"

export const UserPage = () => {
  const [contentType, setContentType] = useState(0)
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedItem, setSelectedItem] = useState("")

  const { username } = useParams()
  const { userQuery } = useUser(String(username))
  const highlightsTray = useHighlightsTray(
    String(username),
    userQuery.data?.currentUserAllowedToView || false
  )
  const stories = useStories(
    String(username),
    (userQuery.data?.currentUserAllowedToView && contentType === 1) || false,
    StoriesType.Stories
  )
  const highlights = useStories(
    selectedItem,
    (userQuery.data?.currentUserAllowedToView && contentType === 2) || false,
    StoriesType.Highlights
  )

  const handleClickTrayItem = (id: string) => {
    setContentType(2)
    setSelectedItem(id)
    setSelectedTab(-1)
  }

  const handleChangeTab = (index: number) => {
    setContentType(index)
    setSelectedTab(index)
    setSelectedItem("")
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
          <Tray isLoading={highlightsTray.isLoading}>
            {highlightsTray.highlightsTray?.map((i) => {
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
        <Container maxW="container.md">
          <Tabs
            isFitted
            variant="enclosed"
            index={selectedTab}
            onChange={handleChangeTab}
          >
            <TabList mb="1em">
              <Tab>Publicaciones</Tab>
              <Tab>Historias</Tab>
            </TabList>
            <TabPanels display={contentType === 2 ? "none" : undefined}>
              <TabPanel>
                <p>Publicaciones</p>
              </TabPanel>
              <TabPanel>
                <ContentGrid
                  contentLength={stories.stories?.length || 0}
                  hasMoreContent={false}
                  loadMoreContent={() => {}}
                  isLoadingContent={stories.isLoading}
                >
                  {stories.stories?.map((i) => {
                    return <StoryCard key={i.id} story={i} />
                  })}
                </ContentGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
        <Container
          maxW="container.md"
          display={contentType !== 2 ? "none" : undefined}
        >
          <ContentGrid
            contentLength={highlights.stories?.length || 0}
            hasMoreContent={false}
            loadMoreContent={() => {}}
            isLoadingContent={highlights.isLoading}
          >
            {highlights.stories?.map((i) => {
              return <StoryCard key={i.id} story={i} />
            })}
          </ContentGrid>
        </Container>
      </VStack>
    </BasicPage>
  )
}
