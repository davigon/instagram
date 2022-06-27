import { useState } from "react"
import { useQuery, UseQueryResult } from "react-query"
import { Post, PostsResponse } from "../../../types/types"
import { useLocalStorage } from "./useLocalStorage"

export const useHomePosts = () => {
  const [session] = useLocalStorage("session", "")
  const [data, setData] = useState<Post[]>()
  const [next, setNext] = useState<string>()

  const url = next ? `/api/posts/home?next=${next}` : `/api/posts/home`

  const homePostsFetch = async () => {
    if (!next) setData([])
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", session },
      credentials: "include",
    })
    return response.json()
  }

  const homePostsQuery: UseQueryResult<PostsResponse, Error> = useQuery(
    ["homePosts"],
    homePostsFetch,
    {
      onSuccess: (response: PostsResponse) => {
        setData((data ?? []).concat(response.posts))
        setNext(response.next)
      },
    }
  )

  const loadMorePosts = () => {
    homePostsQuery.refetch()
  }

  return {
    homePosts: data,
    loadMorePosts,
    hasMorePosts: homePostsQuery.data?.next !== undefined,
    isLoading: homePostsQuery.isLoading,
  }
}
