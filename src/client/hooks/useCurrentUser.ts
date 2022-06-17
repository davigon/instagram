import { useQuery, UseQueryResult } from "react-query"
import { CurrentUser } from "../../../types/types"
import { useAuthContext } from "../context/UseAuthContext"
import { useLocalStorage } from "./useLocalStorage"

export const useCurrentUser = () => {
  const [session] = useLocalStorage("session", "")
  const { useGlobalAuth } = useAuthContext()
  const { isLoggedIn, isLoading } = useGlobalAuth

  const currentUserFetch = async () => {
    const response = await fetch(`/api/user/currentUser`, {
      method: "GET",
      headers: { "Content-Type": "application/json", session },
      credentials: "include",
    })
    return response.json()
  }

  const currentUserQuery: UseQueryResult<CurrentUser, Error> = useQuery(
    ["currentUser"],
    currentUserFetch,
    {
      enabled: isLoggedIn && !isLoading,
    }
  )

  return { currentUserQuery }
}
