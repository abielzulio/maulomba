import { motion } from "framer-motion"
import NextImage from "next/image"
import { useState } from "react"
import { ContainerProps, MotionContainerProps } from "types/component"

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
      className={`min-w-screen relative flex min-h-fit flex-col ${className}`}
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
      <div className="flex flex-col gap-[20px] md:flex-row">
        {props.children}
      </div>
    </Container>
  )
}

export const ContentContainer = (props: ContainerProps) => {
  const { className = ``, children, ...rest } = props
  return (
    <Container className={`max-w-full ${className}`} {...rest}>
      {children}
    </Container>
  )
}

export const CTAContainer = (props: ContainerProps) => {
  const { children, ...rest } = props
  return (
    <div className="flex min-h-full flex-row gap-[20px] md:ml-auto" {...rest}>
      {children}
    </div>
  )
}

export const ImageContainer = ({
  src,
  className = "",
  animateOnHover = false,
}: {
  src: string
  className?: string
  animateOnHover?: boolean
}) => {
  const [paddingTop, setPaddingTop] = useState<string>(`0`)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  return (
    <div
      className={`relative ${className} ${
        isLoading ? `h-[100px] w-[100px]` : undefined
      }`}
      style={{ paddingTop }}
    >
      <NextImage
        src={src}
        layout="fill"
        objectFit="contain"
        className={`${
          animateOnHover ? `transition hover:scale-110` : undefined
        } ${
          isLoading
            ? `animate-pulse blur-2xl grayscale`
            : `animate-none blur-0 grayscale-0`
        }`}
        onLoadingComplete={() => setIsLoading(false)}
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
      className={`absolute z-10 h-min w-fit animate-pulse rounded-full py-[5px] px-[13px] backdrop-blur-md backdrop-filter group-hover:animate-none ${className} text-[12px] font-bold tracking-tight text-white`}
    >
      {props.children}
    </p>
  )
}
