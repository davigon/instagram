import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import { TrayItem, Story, MediaType } from "../../../types/types"

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
            broadcast: {
              url: i.dash_playback_url,
              frameUrl: i.cover_frame_url,
              views: i.viewer_count,
            },
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

  public static stories = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      let id: string | number = ""
      if (req.query.username) {
        id = await client.user.getIdByUsername(String(req.query.username))
      }
      if (req.query.id) {
        id = String(req.query.id)
      }
      const storiesResponse = await client.feed
        .reelsMedia({ userIds: [id] })
        .items()
      const stories: Story[] = storiesResponse.map((i) => {
        // @ts-ignore
        const song = i.story_music_stickers
          ? // @ts-ignore
            i.story_music_stickers[0].music_asset_info
          : undefined
        return {
          id: i.id,
          username: i.user.username || "",
          media: {
            type: i.media_type === 1 ? MediaType.Image : MediaType.Video,
            id: i.id,
            mediaUrl:
              i.media_type === 1
                ? i.image_versions2.candidates[0].url
                : i.video_versions[0].url,
            previewUrl:
              i.media_type === 2
                ? i.image_versions2.candidates[0].url
                : undefined,
          },
          song: song
            ? {
                title: song.title,
                artist: song.display_artist,
                songUrl: song.progressive_download_url,
              }
            : undefined,
          takenAt: i.taken_at,
        }
      })
      res.send(stories)
    } catch (e) {
      console.log(e)
      res.sendStatus(400)
    }
  }
}
