import React from "react"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { BasicPage } from "./pages/BasicPage"
import { LoginPage } from "./pages/LoginPage"
import { PreHomePage } from "./pages/PreHomePage"
import { HomePage } from "./pages/HomePage"
import { UserPage } from "./pages/UserPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import theme from "./theme"
import { QueryClient, QueryClientProvider } from "react-query"
import { UseGlobalAuthWrapper, useGlobalAuth } from "./context/useGlobalAuth"

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
        <UseGlobalAuthWrapper>
          <div className="App">
            <Navbar />
            <main className="Main">
              <Routes>
                <Route
                  path="/"
                  element={
                    <PreAuthorizeRoute>
                      <PreHomePage />
                    </PreAuthorizeRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/@:username"
                  element={
                    <ProtectedRoute>
                      <UserPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PreAuthorizeRoute>
                      <LoginPage />
                    </PreAuthorizeRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </UseGlobalAuthWrapper>
      </QueryClientProvider>
    </ChakraProvider>
  )
}

const PreAuthorizeRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useGlobalAuth()

  if (isLoading) return <BasicPage />

  if (isLoggedIn) return <Navigate to="/home" replace />

  return children
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useGlobalAuth()

  if (isLoading) return <BasicPage />

  if (!isLoggedIn) return <Navigate to="/login" replace />

  return children
}
