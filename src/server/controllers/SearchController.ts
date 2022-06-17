import { Request, Response } from "express"
import { SearchedUser } from "../../../types/types"
import { SessionManager } from "../utils/SessionManager"

export class SearchController {
  public static search = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const username = String(req.query.username)
      const searchResponse = await client.user.search(username)
      const searchedUsers: SearchedUser[] = searchResponse.users.map((u) => {
        return {
          username: u.username,
          name: u.full_name,
          profilePicUrl: u.profile_pic_url,
          isPrivate: u.is_private,
          following: u.friendship_status.following,
        }
      })
      res.send(searchedUsers)
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  }
}
