import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import { User, CurrentUser } from "../../../types/types"

export class UserController {
  public static user = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const userId = await client.user.getIdByUsername(
        String(req.query.username)
      )
      const infoResponse = await client.user.info(userId)
      const friendshipResponse = await client.friendship.show(userId)
      const user: User = {
        username: infoResponse.username,
        name: infoResponse.full_name,
        biography: infoResponse.biography,
        mediaCount: infoResponse.media_count,
        followingCount: infoResponse.following_count,
        followerCount: infoResponse.follower_count,
        profilePicUrl: infoResponse.profile_pic_url,
        hdProfilePicUrl: infoResponse.hd_profile_pic_url_info.url,
        currentUserAllowedToView:
          friendshipResponse.following ||
          !friendshipResponse.is_private ||
          (await client.account.currentUser()).username ===
            infoResponse.username,
      }
      res.send(user)
    } catch (e) {
      res.sendStatus(400)
    }
  }

  public static currentUser = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const currentUserResponse = await client.account.currentUser()
      const currentUser: CurrentUser = {
        username: currentUserResponse.username,
        profilePicUrl: currentUserResponse.profile_pic_url,
      }
      res.send(currentUser)
    } catch (e) {
      res.sendStatus(400)
    }
  }
}
