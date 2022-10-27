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
      className="padding-x mt-[20px] mb-[10px] h-fit w-full md:mt-[40px] md:mb-[20px]"
      {...props}
    >
      <div className="flex flex-row gap-[20px]">{props.children}</div>
    </Container>
  )
}

export const ContentContainer = (props: ContainerProps) => {
  return (
    <Container className="min-h-fit w-full" {...props}>
      {props.children}
    </Container>
  )
}

export const CTAContainer = ({ children, ...rest }: ContainerProps) => (
  <div
    className="ml-auto flex min-h-full flex-col gap-[10px] sm:flex-row md:gap-[20px]"
    {...rest}
  >
    {children}
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

export const PillContainer = (props: ContainerProps) => {
  const { className = `` } = props
  return (
    <p
      className={`absolute z-10 h-min w-min animate-pulse rounded-full py-[5px] px-[13px] backdrop-blur-md backdrop-filter group-hover:animate-none ${className} text-[12px] font-bold tracking-tight text-white`}
    >
      {props.children}
    </p>
  )
}
