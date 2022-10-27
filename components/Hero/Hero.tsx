interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  hero_title: string[]
  hero_desc: string[]
}

const Hero = (props: HeroProps) => {
  const { hero_title, hero_desc, ...rest } = props
  return (
    <div className="flex flex-col gap-[20px]" {...rest}>
      <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
        {hero_title[0]}, <br />
        <span className="mr-auto bg-gradient-to-l from-blue-500 to-white bg-clip-text text-transparent">
          {hero_title[1]}
        </span>
      </h1>
      <p className="text-[14px] font-normal text-gray-50 text-opacity-80 md:text-[18px]">
        {hero_desc[0]} <br /> {hero_desc[1]}
      </p>
    </div>
  )
}

export default Hero
