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
      const highlightsTrayItems: TrayItem[] = highlightsTrayResponse.tray.map(
        (i) => {
          return {
            id: i.id,
            title: i.title,
            coverUrl: i.cover_media.cropped_image_version.url,
          }
        }
      )
      res.send(highlightsTrayItems)
    } catch (e) {
      res.sendStatus(400)
    }
  }

  public static storiesTray = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const storiesTrayResponse = await client.feed.reelsTray().request()
      const broadcastsTrayItems: TrayItem[] =
        storiesTrayResponse.broadcasts.map((i) => {
          return {
            id: i.id,
            coverUrl: i.broadcast_owner.profile_pic_url,
            username: i.broadcast_owner.username,
            isBroadcast: true,
            broadcastUrl: i.dash_playback_url,
          }
        })
      const storiesTrayItems: TrayItem[] = storiesTrayResponse.tray.map((i) => {
        return {
          id: String(i.user.pk),
          coverUrl: i.user.profile_pic_url || "",
          username: i.user.username || "",
          isSeen: i.seen >= i.latest_reel_media,
          isBestie: i.has_besties_media,
          isHide: i.hide_from_feed_unit,
        }
      })
      res.send(broadcastsTrayItems.concat(storiesTrayItems))
    } catch (e) {
      res.sendStatus(400)
    }
  }
}
