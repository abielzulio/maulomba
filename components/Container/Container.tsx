import { ContainerProps, ImageContainerProps } from "types/component"
import { useState } from "react"
import NextImage from "next/image"

const Container = (props: ContainerProps) => {
  const { className = `` } = props
  return (
    <section
      className={`flex w-fit flex-col justify-center ${className}`}
      {...props}
    >
      {props.children}
    </section>
  )
}

export const Page = (props: ContainerProps) => {
  const { className = `` } = props
  return (
    <section
      className={`min-w-screen relative flex min-h-screen flex-col px-[30px] md:px-[60px] ${className}`}
      {...props}
    >
      {props.children}
    </section>
  )
}

export const HeroContainer = (props: ContainerProps) => {
  return (
    <Container className="mt-[60px] mb-[30px] h-fit w-full" {...props}>
      <div className="flex flex-col gap-[20px]">{props.children}</div>
    </Container>
  )
}

export const ContentContainer = (props: ContainerProps) => {
  return (
    <Container className="mb-[60px] min-h-screen w-full" {...props}>
      {props.children}
    </Container>
  )
}

export const ButtonContainer = (props: ContainerProps) => (
  <div className="mt-[10px] flex flex-col gap-[20px] md:flex-row" {...props}>
    {props.children}
  </div>
)

export const ImageContainer = (props: ImageContainerProps) => {
  const [paddingTop, setPaddingTop] = useState(`0`)
  return (
    <div className="relative" style={{ paddingTop }}>
      <NextImage
        src={props.src}
        layout="fill"
        objectFit="contain"
        className="transition hover:scale-110"
        onLoad={({ target }) => {
          const { naturalWidth, naturalHeight } = target as HTMLImageElement
          setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`)
        }}
      />
    </div>
  )
}
