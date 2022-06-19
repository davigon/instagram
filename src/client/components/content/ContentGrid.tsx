import React from "react"
import { Center, Grid, Spinner, Text } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component"

export const ContentGrid = ({
  contentLength,
  hasMoreContent,
  loadMoreContent,
  isLoadingContent,
  children,
}: {
  contentLength: number
  hasMoreContent: boolean
  loadMoreContent: () => void
  isLoadingContent: boolean
  children?: JSX.Element | JSX.Element[]
}) => {
  if (isLoadingContent) {
    return (
      <Center>
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
      </Center>
    )
  }

  if (children === undefined) {
    return (
      <Center>
        <Text>Nada, por el momento.</Text>
      </Center>
    )
  }

  return (
    <InfiniteScroll
      style={{ overflow: "hidden" }}
      dataLength={contentLength}
      hasMore={hasMoreContent}
      loader={
        <Center>
          <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
        </Center>
      }
      next={loadMoreContent}
    >
      <Grid
        templateRows="subgrid"
        templateColumns="repeat(auto-fill, minmax(12rem, 1fr))"
        gap={4}
        padding={0.5}
      >
        {children}
      </Grid>
    </InfiniteScroll>
  )
}
