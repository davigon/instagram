import React from "react"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import theme from "./theme"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Navbar />
          <main className="Main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
