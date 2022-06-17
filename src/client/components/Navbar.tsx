import React from "react"
import {
  useColorMode,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useBreakpointValue,
  HStack,
  Button,
  Menu,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { MdHomeFilled } from "react-icons/md"
import { Link as RouterLink } from "react-router-dom"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useGlobalAuth } from "../context/useGlobalAuth"
import { SearchInput } from "./search/SearchInput"

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isLoggedIn, logout } = useGlobalAuth()
  const { currentUserQuery } = useCurrentUser()

  return (
    <Box px={4}>
      <Flex h={"4rem"} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontWeight={"semibold"} display={{ base: "none", md: "flex" }}>
          Instagram
        </Box>
        <HStack spacing={4}>
          <IconButton
            size={"md"}
            colorScheme={"whiteAlpha"}
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black", "white")}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "whiteAlpha.200"),
            }}
            icon={<MdHomeFilled size={20} />}
            aria-label={"Home"}
            as={RouterLink}
            to={"/"}
          />
          {isLoggedIn ? <SearchInput /> : null}
          <IconButton
            size={"md"}
            colorScheme={"whiteAlpha"}
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black", "white")}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "whiteAlpha.200"),
            }}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            aria-label={"ColorMode"}
            onClick={toggleColorMode}
          />

          {isLoggedIn ? (
            <Box pr={useBreakpointValue({ base: 2, md: 0 })}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      currentUserQuery.data
                        ? `/api/cors/${currentUserQuery.data.profilePicUrl}`
                        : undefined
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as={RouterLink}
                    to={
                      currentUserQuery.data
                        ? `/@${currentUserQuery.data.username}`
                        : "#"
                    }
                  >
                    Perfil
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Cerrar sesión</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : null}
        </HStack>
      </Flex>
    </Box>
  )
}
