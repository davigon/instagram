import React, { useContext } from "react"
import { useAuth, UseAuthType } from "../hooks/useAuth"

export interface UseGlobalAuth {
  hook: UseAuthType
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
  hook: getDefaultUseAuth(),
} as UseGlobalAuth

const context = React.createContext(defaultVal)

const { Provider } = context

export const UseGlobalAuthWrapper = ({ children }: { children: any }) => {
  return <Provider value={{ hook: useAuth() }}>{children}</Provider>
}

export const useGlobalAuth = () => {
  return useContext(context).hook
}
