import { useQuery, UseQueryResult } from "react-query"
import { TrayItem } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useStoriesTray = () => {
  const [session] = useLocalStorage("session", "")

  const storiesTrayFetch = async () => {
    const response = await fetch(
      `/api/stories/storiesTray`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json", session },
        credentials: "include",
      }
    )
    return response.json()
  }

  const storiesTrayQuery: UseQueryResult<TrayItem[], Error> =
    useQuery(["storiesTray"], storiesTrayFetch)

  return {
    storiesTray: storiesTrayQuery.data,
    isLoading: storiesTrayQuery.isLoading,
  }
}
