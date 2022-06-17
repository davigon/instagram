import React from "react"
import {
  useDisclosure,
  useColorMode,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  HStack,
  Button,
  Stack,
  Menu,
  Avatar,
  MenuButton,
  MenuItem,
  MenuList,
  Link as ChakraLink,
} from "@chakra-ui/react"
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from "@chakra-ui/icons"
import { NavLink, Link as RouterLink } from "react-router-dom"
import { useCurrentUser } from "../hooks/useCurrentUser"
import { useGlobalAuth } from "../context/useGlobalAuth"

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { isLoggedIn, logout } = useGlobalAuth()
  const { currentUserQuery } = useCurrentUser()

  return (
    <Box px={4}>
      <Flex h={"4rem"} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          colorScheme={"whiteAlpha"}
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("black", "white")}
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.100", "whiteAlpha.200"),
          }}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          <Box fontWeight={"semibold"}>Instagram</Box>
          <NavigationLink
            key={"home"}
            name={"Inicio"}
            to={isLoggedIn ? "/home" : "/"}
          />
        </HStack>

        <HStack spacing={4}>
          <Button
            colorScheme={"whiteAlpha"}
            bg={useColorModeValue("white", "gray.800")}
            color={useColorModeValue("black", "white")}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "whiteAlpha.200"),
            }}
            size="sm"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          {isLoggedIn ? (
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
          ) : null}
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            <NavigationLink
              key={"home"}
              name={"Inicio"}
              to={isLoggedIn ? "/home" : "/"}
              onClick={onClose}
            />
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

type NavigationLinkProps = {
  name: string
  to: string
  onClick?: () => void
}

const NavigationLink = (props: NavigationLinkProps) => {
  return (
    <ChakraLink
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.100", "whiteAlpha.200"),
      }}
      as={NavLink}
      to={props.to}
      onClick={props.onClick}
    >
      {props.name}
    </ChakraLink>
  )
}
