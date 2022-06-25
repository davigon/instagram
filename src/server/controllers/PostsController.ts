import { Request, Response } from "express"
import { SessionManager } from "../utils/SessionManager"
import { MediaType, Post } from "../../../types/types"

export class PostsController {
  public static homePosts = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const homePostsResponse = client.feed.timeline()
      if (req.query.next) homePostsResponse.deserialize(String(req.query.next))
      const homePosts: Post[] = (await homePostsResponse.items()).map((i) => {
        return {
          id: i.id,
          username: i.user.username,
          medias:
            i.media_type === 1 || i.media_type === 2
              ? [
                  {
                    type:
                      i.media_type === 1 ? MediaType.Image : MediaType.Video,
                    id: i.id,
                    mediaUrl:
                      i.media_type === 1
                        ? i.image_versions2?.candidates[0].url
                        : i.video_versions && i.video_versions[0].url,
                    previewUrl:
                      i.media_type === 2
                        ? i.image_versions2?.candidates[0].url
                        : undefined,
                  },
                ]
              : i.carousel_media
              ? i.carousel_media.map((m) => {
                  return {
                    type:
                      m.media_type === 1 ? MediaType.Image : MediaType.Video,
                    id: m.id,
                    mediaUrl:
                      m.media_type === 1
                        ? m.image_versions2?.candidates[0].url
                        : // @ts-ignore
                          m.video_versions && m.video_versions[0].url,
                    previewUrl:
                      m.media_type === 2
                        ? m.image_versions2?.candidates[0].url
                        : undefined,
                  }
                })
              : [],
          caption: i.caption?.text || "",
          likes: i.like_count,
        }
      })
      res.send({
        homePosts,
        next: homePostsResponse.isMoreAvailable()
          ? homePostsResponse.serialize()
          : undefined,
      })
    } catch (e) {
      res.sendStatus(400)
    }
  }

  public static userPosts = async (req: Request, res: Response) => {
    try {
      const client = await SessionManager.deserializeSession(
        String(req.headers.session)
      )
      const userId = await client.user.getIdByUsername(
        String(req.query.username)
      )
      const userPostsResponse = client.feed.user(userId)
      if (req.query.next) userPostsResponse.deserialize(String(req.query.next))
      const userPosts: Post[] = (await userPostsResponse.items()).map((i) => {
        return {
          id: i.id,
          username: i.user.username,
          medias:
            i.media_type === 1 || i.media_type === 2
              ? [
                  {
                    type:
                      i.media_type === 1 ? MediaType.Image : MediaType.Video,
                    id: i.id,
                    mediaUrl:
                      i.media_type === 1
                        ? i.image_versions2?.candidates[0].url
                        : i.video_versions && i.video_versions[0].url,
                    previewUrl:
                      i.media_type === 2
                        ? i.image_versions2?.candidates[0].url
                        : undefined,
                  },
                ]
              : i.carousel_media
              ? i.carousel_media.map((m) => {
                  return {
                    type:
                      m.media_type === 1 ? MediaType.Image : MediaType.Video,
                    id: m.id,
                    mediaUrl:
                      m.media_type === 1
                        ? m.image_versions2?.candidates[0].url
                        : // @ts-ignore
                          m.video_versions && m.video_versions[0].url,
                    previewUrl:
                      m.media_type === 2
                        ? m.image_versions2?.candidates[0].url
                        : undefined,
                  }
                })
              : [],
          caption: i.caption?.text || "",
          likes: i.like_count,
        }
      })
      res.send({
        userPosts,
        next: userPostsResponse.isMoreAvailable()
          ? userPostsResponse.serialize()
          : undefined,
      })
    } catch (e) {
      res.sendStatus(400)
    }
  }
}
