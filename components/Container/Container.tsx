import {
  ContainerProps,
  ImageContainerProps,
  MotionContainerProps,
} from "types/component"
import { useState } from "react"
import NextImage from "next/image"
import { motion } from "framer-motion"

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

export const Page = (props: MotionContainerProps) => {
  const { className = `` } = props
  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.25 }}
      className={`min-w-screen relative flex min-h-screen flex-col ${className}`}
      {...props}
    >
      {props.children}
    </motion.section>
  )
}

export const HeroContainer = (props: ContainerProps) => {
  return (
    <Container
      className="padding-x mt-[30px] mb-[15px] h-fit w-full md:mt-[40px] md:mb-[30px]"
      {...props}
    >
      <div className="flex flex-col gap-[20px]">{props.children}</div>
    </Container>
  )
}

export const ContentContainer = (props: ContainerProps) => {
  return (
    <Container className="mb-[60px] min-h-fit w-full" {...props}>
      {props.children}
    </Container>
  )
}

export const CTAContainer = (props: ContainerProps) => (
  <div className="mt-[10px] mr-auto flex gap-[10px] md:gap-[20px]" {...props}>
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
