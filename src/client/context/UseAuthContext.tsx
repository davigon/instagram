import React, { useContext } from "react"
import { useAuth, UseAuthType } from "../hooks/useAuth"

export interface UseAuthContext {
  useGlobalAuth: UseAuthType
}

const getDefaultUseAuth = () => {
  return {
    login: (username: string, password: string) => {},
    isLoadingLogin: false,
    logout: () => {},
    isLoadingLogout: false,
    isLoggedIn: false,
    isLoading: false,
  }
}

const defaultVal = {
  useGlobalAuth: getDefaultUseAuth(),
} as UseAuthContext

const context = React.createContext(defaultVal)

const { Provider } = context

export const UseAuthContextWrapper = ({ children }: { children: any }) => {
  return <Provider value={{ useGlobalAuth: useAuth() }}>{children}</Provider>
}

export const useAuthContext = () => useContext(context)
