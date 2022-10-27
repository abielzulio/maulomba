interface HeroProps {
  title: string[]
  desc: string[]
}

const Hero = (props: HeroProps) => {
  const { title, desc } = props
  return (
    <div className="flex flex-col gap-[20px]">
      <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
        {title[0]}, <br />
        <span className="mr-auto bg-gradient-to-l from-blue-500 to-white bg-clip-text text-transparent">
          {title[1]}
        </span>
      </h1>
      <p className="text-[14px] font-normal text-gray-50 text-opacity-80 md:text-[18px]">
        {desc[0]} <br /> {desc[1]}
      </p>
    </div>
  )
}

export default Hero
