import React from "react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import {
  Center,
  Flex,
  IconButton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
// @ts-ignore
import useMobileDetect from "use-mobile-detect-hook"

export const Tray = ({
  children,
  isLoading,
}: {
  children?: JSX.Element | JSX.Element[]
  isLoading: boolean
}) => {
  if (isLoading || children === undefined) {
    return (
      <Center>
        <Spinner thickness="4px" speed="0.65s" color="blue.500" size="lg" />
      </Center>
    )
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {children}
    </ScrollMenu>
  )
}

const LeftArrow = () => {
  const { isFirstItemVisible, isLastItemVisible, scrollPrev } =
    React.useContext(VisibilityContext)
  const detectMobile = useMobileDetect()

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      display={
        detectMobile.isMobile() || (isFirstItemVisible && isLastItemVisible)
          ? "none"
          : undefined
      }
    >
      <IconButton
        colorScheme={"whiteAlpha"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("black", "white")}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.100", "whiteAlpha.200"),
        }}
        aria-label="left arrow"
        icon={<ArrowBackIcon />}
        disabled={isFirstItemVisible}
        onClick={() => scrollPrev()}
      />
    </Flex>
  )
}

const RightArrow = () => {
  const { isFirstItemVisible, isLastItemVisible, scrollNext } =
    React.useContext(VisibilityContext)
  const detectMobile = useMobileDetect()

  return (
    <Flex
      alignItems={"center"}
      justifyContent={"center"}
      display={
        detectMobile.isMobile() || (isFirstItemVisible && isLastItemVisible)
          ? "none"
          : undefined
      }
    >
      <IconButton
        colorScheme={"whiteAlpha"}
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("black", "white")}
        _hover={{
          textDecoration: "none",
          bg: useColorModeValue("gray.100", "whiteAlpha.200"),
        }}
        aria-label="right arrow"
        icon={<ArrowForwardIcon />}
        disabled={isLastItemVisible}
        onClick={() => scrollNext()}
      />
    </Flex>
  )
}
