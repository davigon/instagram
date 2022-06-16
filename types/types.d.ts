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
