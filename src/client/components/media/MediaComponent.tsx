import React from "react"
import { Badge, Box, IconButton, Image, LightMode } from "@chakra-ui/react"
import { Media } from "../../../../types/types"
import { Carousel } from "react-responsive-carousel"
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons"
// @ts-ignore
import useMobileDetect from "use-mobile-detect-hook"

export const MediaComponent = ({ medias }: { medias: Media[] }) => {
  const detectMobile = useMobileDetect()

  if (medias.length === 0) return null

  if (medias.length === 1 && medias[0].type === 0)
    return (
      <Image
        src={"/api/cors/" + medias[0].mediaUrl}
        alt={"image"}
        roundedTop="lg"
        loading={"lazy"}
      />
    )

  if (medias.length === 1 && medias[0].type === 1)
    return (
      <video
        src={"/api/cors/" + medias[0].mediaUrl}
        poster={
          medias[0].previewUrl ? "/api/cors/" + medias[0].previewUrl : undefined
        }
        controls
        loop
      />
    )

  return (
    <Box>
      <Carousel
        showArrows={!detectMobile.isMobile()}
        showThumbs={false}
        showIndicators={true}
        showStatus={false}
        emulateTouch={true}
        statusFormatter={(current, total) => `${current}/${total}`}
        renderArrowPrev={(clickHandler, hasPrev, label) => (
          <LeftArrow
            clickHandler={clickHandler}
            hasPrev={hasPrev}
            label={label}
          />
        )}
        renderArrowNext={(clickHandler, hasNext, label) => (
          <RightArrow
            clickHandler={clickHandler}
            hasNext={hasNext}
            label={label}
          />
        )}
        renderIndicator={(clickHandler, isSelected, index, label) =>
          isSelected ? (
            <LightMode>
              <Badge colorScheme={"whiteAlpha"}>{`${index + 1}/${
                medias.length
              }`}</Badge>
            </LightMode>
          ) : null
        }
      >
        {medias.map((i) => {
          return i.type === 0 ? (
            <img
              key={i.id}
              src={"/api/cors/" + i.mediaUrl}
              alt={"image"}
              loading={"lazy"}
            />
          ) : i.type === 1 ? (
            <video
              key={i.id}
              src={"/api/cors/" + i.mediaUrl}
              poster={i.previewUrl ? "/api/cors/" + i.previewUrl : undefined}
              controls
              loop
            />
          ) : (
            <></>
          )
        })}
      </Carousel>
    </Box>
  )
}

const LeftArrow = ({
  clickHandler,
  hasPrev,
  label,
}: {
  clickHandler: () => void
  hasPrev: boolean
  label: string
}) => {
  return hasPrev ? (
    <LightMode>
      <IconButton
        size={"sm"}
        colorScheme={"whiteAlpha"}
        color={"black"}
        aria-label="left arrow"
        icon={<ArrowBackIcon />}
        position={"absolute"}
        zIndex={1}
        top={"calc(50% - 15px)"}
        left={15}
        onClick={clickHandler}
      />
    </LightMode>
  ) : null
}

const RightArrow = ({
  clickHandler,
  hasNext,
  label,
}: {
  clickHandler: () => void
  hasNext: boolean
  label: string
}) => {
  return hasNext ? (
    <LightMode>
      <IconButton
        size={"sm"}
        colorScheme={"whiteAlpha"}
        color={"black"}
        aria-label="right arrow"
        icon={<ArrowForwardIcon />}
        position={"absolute"}
        zIndex={2}
        top={"calc(50% - 15px)"}
        right={15}
        onClick={clickHandler}
      />
    </LightMode>
  ) : null
}
