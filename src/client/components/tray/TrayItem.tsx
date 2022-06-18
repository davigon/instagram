import React from "react"
import { Box, VStack, Text, Avatar } from "@chakra-ui/react"
import { TrayItem as TrayItemType } from "../../../../types/types"
import { useNavigate } from "react-router-dom"

export const TrayItem = ({
  item,
  itemId,
  active,
  onClick,
}: {
  item: TrayItemType
  itemId: string
  active: boolean
  onClick: (id: string) => void
}) => {
  const navigate = useNavigate()
  const border = active
    ? "0.25rem var(--chakra-colors-blue-500) solid"
    : undefined

  return (
    <VStack textAlign={"center"} alignContent={"center"} px={4}>
      <Box textAlign="center">
        <Avatar
          size={"lg"}
          src={`/api/cors/${item.coverUrl}`}
          cursor={"pointer"}
          onClick={() => onClick(item.id)}
          border={border}
        />
      </Box>
      <Text
        cursor={item.username ? "pointer" : undefined}
        onClick={
          item.username ? () => navigate(`/@${item.username}`) : undefined
        }
      >
        {item.title}
      </Text>
    </VStack>
  )
}
