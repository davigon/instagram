import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import { TrayItem } from "../../../types/types"

export class StoriesController {
  public static highlightsTray = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const userId = await client.user.getIdByUsername(
        String(req.query.username)
      )
      const highlightsTrayResponse = await client.highlights.highlightsTray(
        userId
      )
      const highlightsTrayItems: TrayItem[] =
        highlightsTrayResponse.tray.map((i) => {
          return {
            id: i.id,
            title: i.title,
            coverUrl: i.cover_media.cropped_image_version.url,
          }
        })
      res.send(highlightsTrayItems)
    } catch (e) {
      res.sendStatus(400)
    }
  }
}
