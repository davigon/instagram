import React from "react"
import videojs, { VideoJsPlayerOptions } from "video.js"
import "video.js/dist/video-js.css"

export const VideoJsPlayer = ({
  id,
  options,
}: {
  id: string
  options: VideoJsPlayerOptions
}) => {
  const videoRef = React.useRef<HTMLDivElement | null>(null)
  const playerRef = React.useRef<videojs.Player | null>(null)

  React.useEffect(() => {
    console.log(playerRef.current)
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoEl = videoRef.current

      if (!videoEl) return

      const videoElement = videoEl.appendChild(
        document.createElement("video-js")
      )

      playerRef.current = videojs(videoElement, options)
    } else {
      console.log("load")
      const player = playerRef.current
      player.autoplay(options.autoplay || false)
      player.src(options.sources || [])
    }
  }, [id])

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current

    return () => {
      if (player) {
        console.log("dispose")
        player.dispose()
        playerRef.current = null
      }
    }
  }, [playerRef])

  return <div ref={videoRef} />
}
