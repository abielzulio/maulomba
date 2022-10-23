import { ContainerProps } from "types/component"

const Container = (props: ContainerProps) => {
  const { className = `` } = props
  return (
    <section
      className={`flex w-full flex-col justify-center ${className}`}
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
    <Container className="my-[60px] h-fit w-full" {...props}>
      <div className="flex flex-col gap-[20px]">{props.children}</div>
    </Container>
  )
}

export const ContentContainer = (props: ContainerProps) => {
  return (
    <Container className="min-h-screen w-fit" {...props}>
      {props.children}
    </Container>
  )
}

export const ButtonContainer = (props: ContainerProps) => (
  <div className="mt-[10px] flex flex-col gap-[20px] md:flex-row" {...props}>
    {props.children}
  </div>
)
