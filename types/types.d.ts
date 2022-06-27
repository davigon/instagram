// declare modules here
declare module "*.jpg"
declare module "*.png"
declare module "*.svg"

export interface LoginResponse {
  session: string
}

export interface CurrentUser {
  username: string
  profilePicUrl: string
}

export interface User {
  username: string
  name: string
  biography: string
  mediaCount: number
  followingCount: number
  followerCount: number
  profilePicUrl: string
  hdProfilePicUrl: string
  currentUserAllowedToView: boolean
}

export interface SearchedUser {
  username: string
  name: string
  profilePicUrl: string
  isPrivate: boolean
  following: boolean
}

export interface Broadcast {
  url: string
  frameUrl: string
  views: number
}

export interface TrayItem {
  id: string
  title?: string
  coverUrl: string
  username?: string
  isSeen?: boolean
  isBestie?: boolean
  isHide?: boolean
  broadcast?: Broadcast
}

export const enum ContentType {
  Post,
  Story,
  HighlightStory,
  Broadcast,
}

export const enum MediaType {
  Image,
  Video,
}

export interface Media {
  type: MediaType
  id: string
  mediaUrl: string
  previewUrl?: string
}

export interface Song {
  title: string
  artist: string
  songUrl: string
}

export interface Story {
  id: string
  username: string
  media: Media
  song?: Song
  takenAt: number
}

export interface Post {
  id: string
  username: string
  medias: Media[]
  caption: string
  likes: number
  takenAt: number
}

export interface PostsResponse {
  posts: Post[]
  next?: string
}
