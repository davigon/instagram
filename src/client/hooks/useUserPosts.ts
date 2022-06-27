import { useState, useEffect } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { Post, PostsResponse } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useUserPosts = (username: string, allowed: boolean) => {
  const [session] = useLocalStorage("session", "")
  const [data, setData] = useState<Post[]>()
  const [next, setNext] = useState<string>()

  const url = next
    ? `/api/posts/user?username=${username}&next=${next}`
    : `/api/posts/user?username=${username}`

  useEffect(() => {
    setData(undefined)
    setNext(undefined)
  }, [username])

  const userPostsFetch = async () => {
    if (!next) setData([])
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", session },
      credentials: "include",
    })
    return response.json()
  }

  const userPostsQuery: UseQueryResult<PostsResponse, Error> = useQuery(
    ["userPosts", username],
    userPostsFetch,
    {
      enabled: allowed,
      onSuccess: (response: PostsResponse) => {
        setData((data ?? []).concat(response.posts))
        setNext(response.next)
      },
    }
  )

  const loadMorePosts = () => {
    userPostsQuery.refetch()
  }

  return {
    userPosts: data,
    loadMorePosts,
    hasMorePosts: userPostsQuery.data?.next !== undefined,
    isLoading: userPostsQuery.isLoading,
  }
}
