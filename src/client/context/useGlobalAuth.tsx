import React, { useContext } from "react"
import { LoginRequest, useAuth, UseAuthType } from "../hooks/useAuth"

export interface UseGlobalAuth {
  hook: UseAuthType
}

const getDefaultUseAuth = () => {
  return {
    login: (loginRequest: LoginRequest) => {},
    twoFactorData: undefined,
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
