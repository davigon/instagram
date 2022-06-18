import { useQuery, UseQueryResult } from "react-query"
import { TrayItem } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useHighlightsTray = (username: string, allowed: boolean) => {
  const [session] = useLocalStorage("session", "")

  const highlightsTrayFetch = async () => {
    const response = await fetch(
      `/api/stories/highlightsTray?username=${username}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", session },
        credentials: "include",
      }
    )
    return response.json()
  }

  const highlightsTrayQuery: UseQueryResult<TrayItem[], Error> =
    useQuery(["highlightsTray", username], highlightsTrayFetch, {
      enabled: allowed,
    })

  return {
    highlightsTray: highlightsTrayQuery.data,
    isLoading: highlightsTrayQuery.isLoading,
  }
}
