import React from "react"
import {
  Box,
  VStack,
  Text,
  Avatar,
  Badge,
  LightMode,
  AvatarBadge,
} from "@chakra-ui/react"
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
  onClick: (item: TrayItemType) => void
}) => {
  const navigate = useNavigate()
  const badgeColor = active
    ? "blue"
    : item.title
    ? undefined
    : item.isHide
    ? "gray"
    : item.isBestie
    ? "green"
    : !item.isSeen
    ? "pink"
    : undefined

  return (
    <VStack textAlign={"center"} alignContent={"center"} px={4}>
      <Box position={"relative"} textAlign="center">
        <Avatar
          size={"lg"}
          src={`/api/cors/${item.coverUrl}`}
          cursor={"pointer"}
          onClick={() => onClick(item)}
        >
          {badgeColor && !item.broadcast ? (
            <AvatarBadge
              bg={`${badgeColor}.500`}
              borderColor={"whiteAlpha.500"}
              boxSize="0.75em"
            />
          ) : null}
        </Avatar>
        {item.broadcast ? (
          <Box
            position="absolute"
            top="90%"
            left="50%"
            transform="translate(-50%, -50%)"
          >
            <LightMode>
              <Badge
                px="2"
                colorScheme="pink"
                variant="solid"
                fontSize="0.6rem"
              >
                DIRECTO
              </Badge>
            </LightMode>
          </Box>
        ) : null}
      </Box>
      <Text
        cursor={item.username ? "pointer" : undefined}
        onClick={
          item.username ? () => navigate(`/@${item.username}`) : undefined
        }
      >
        {item.title || item.username}
      </Text>
    </VStack>
  )
}
