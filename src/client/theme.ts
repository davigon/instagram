import {
  type ThemeConfig,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"

const config: ThemeConfig = {
  initialColorMode: "system",
}

const theme = extendTheme(
  {
    config,
  },
  withDefaultColorScheme({ colorScheme: "blue" })
)

export default theme
