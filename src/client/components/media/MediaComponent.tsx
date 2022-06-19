import React from "react"
import { Image } from "@chakra-ui/react"
import { Media } from "../../../../types/types"

export const MediaComponent = ({ media }: { media: Media }) => {
  if (media.type === 0) {
    return (
      <Image
        src={"/api/cors/" + media.mediaUrl}
        alt={"image"}
        roundedTop="lg"
        loading={"lazy"}
      />
    )
  }

  if (media.type === 1) {
    return (
      <video
        src={"/api/cors/" + media.mediaUrl}
        poster={media.previewUrl ? "/api/cors/" + media.previewUrl : undefined}
        controls
        loop
      />
    )
  }

  return null
}
