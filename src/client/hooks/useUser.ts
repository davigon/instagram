import { useQuery, UseQueryResult } from "react-query"
import { User } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useUser = (username: string) => {
  const [session] = useLocalStorage("session", "")

  const userFetch = async () => {
    const response = await fetch(`/api/user?username=${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", session },
      credentials: "include",
    })
    if (response.status >= 300) throw Error("Usuario no encontrado.")
    return response.json()
  }

  const userQuery: UseQueryResult<User, Error> = useQuery(
    ["user", username],
    userFetch
  )

  return { userQuery }
}
