import React from "react"
import {
  Container,
  Badge,
  Box,
  IconButton,
  Image,
  LightMode,
} from "@chakra-ui/react"
import { Media } from "../../../../types/types"
import { Carousel } from "react-responsive-carousel"
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons"
// @ts-ignore
import useMobileDetect from "use-mobile-detect-hook"

export const MediaComponent = ({ medias }: { medias: Media[] }) => {
  const detectMobile = useMobileDetect()

  if (medias.length === 0) return null

  if (medias.length === 1 && medias[0].type === 0)
    return (
      <Container position={"relative"} padding={0}>
        <Image
          key={medias[0].mediaUrl}
          src={"/api/cors/" + medias[0].mediaUrl}
          alt={"image"}
          roundedTop="lg"
          loading={"lazy"}
        />
        <IconButton
          key={`external-button-${medias[0].mediaUrl}`}
          as={"a"}
          href={medias[0].mediaUrl}
          target={"_blank"}
          size={"xs"}
          colorScheme={"whiteAlpha"}
          color={"black"}
          aria-label="download"
          icon={<ExternalLinkIcon />}
          position={"absolute"}
          zIndex={2}
          top={15}
          right={15}
        />
      </Container>
    )

  if (medias.length === 1 && medias[0].type === 1)
    return (
      <Container position={"relative"} padding={0}>
        <video
          src={"/api/cors/" + medias[0].mediaUrl}
          poster={
            medias[0].previewUrl
              ? "/api/cors/" + medias[0].previewUrl
              : undefined
          }
          controls
          loop
        />
        <IconButton
          key={`external-button-${medias[0].mediaUrl}`}
          as={"a"}
          href={medias[0].mediaUrl}
          target={"_blank"}
          size={"xs"}
          colorScheme={"whiteAlpha"}
          color={"black"}
          aria-label="download"
          icon={<ExternalLinkIcon />}
          position={"absolute"}
          zIndex={2}
          top={15}
          right={15}
        />
      </Container>
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
            <Container position={"relative"} padding={0}>
              <Image
                key={i.id}
                src={"/api/cors/" + i.mediaUrl}
                alt={"image"}
                roundedTop="lg"
                loading={"lazy"}
              />
              <IconButton
                key={`external-button-${i.id}`}
                as={"a"}
                href={i.mediaUrl}
                target={"_blank"}
                size={"xs"}
                colorScheme={"whiteAlpha"}
                color={"black"}
                aria-label="download"
                icon={<ExternalLinkIcon />}
                position={"absolute"}
                zIndex={2}
                top={15}
                right={15}
              />
            </Container>
          ) : i.type === 1 ? (
            <Container position={"relative"} padding={0}>
              <video
                key={i.id}
                src={"/api/cors/" + i.mediaUrl}
                poster={i.previewUrl ? "/api/cors/" + i.previewUrl : undefined}
                controls
                loop
              />
              <IconButton
                key={`external-button-${i.id}`}
                as={"a"}
                href={i.mediaUrl}
                target={"_blank"}
                size={"xs"}
                colorScheme={"whiteAlpha"}
                color={"black"}
                aria-label="download"
                icon={<ExternalLinkIcon />}
                position={"absolute"}
                zIndex={2}
                top={15}
                right={15}
              />
            </Container>
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
