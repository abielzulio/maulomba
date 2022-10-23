interface HeroProps {
  title: string[]
  desc: string[]
}

const Hero = (props: HeroProps) => {
  const { title, desc } = props
  return (
    <>
      <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
        {title[0]}, <br />
        <span className="mr-auto bg-gradient-to-l from-blue-500 to-white bg-clip-text text-transparent">
          {title[0]}
        </span>
      </h1>
      <p className="text-[14px] font-medium text-gray-50 text-opacity-80 md:text-[18px]">
        {desc[0]} <br /> {desc[1]}
      </p>
    </>
  )
}

export default Hero
