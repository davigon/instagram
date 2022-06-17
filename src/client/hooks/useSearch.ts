import { useQuery, UseQueryResult } from "react-query"
import { SearchedUser } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useSearch = (username: string) => {
  const [session] = useLocalStorage("session", "")

  const searchFetch = async () => {
    const response = await fetch(`/api/search?username=${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", session },
      credentials: "include",
    })
    return response.json()
  }

  const searchQuery: UseQueryResult<SearchedUser[], Error> = useQuery(
    ["search", username],
    searchFetch,
    {
      enabled: username !== "",
    }
  )

  return { searchedUsers: searchQuery.data }
}
