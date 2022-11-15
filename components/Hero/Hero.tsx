interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  hero_title: string[]
  hero_desc?: string[]
}

const Hero = (props: HeroProps) => {
  const { hero_title, hero_desc, ...rest } = props
  return (
    <div
      className={`flex flex-col ${hero_desc ? `gap-[20px]` : `gap-[0px]`}`}
      {...rest}
    >
      <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
        {hero_title[0] && hero_title[0]}
        {hero_title[1] && (
          <>
            ,<br />
            <span className="mr-auto bg-gradient-to-l from-blue-500 to-white bg-clip-text text-transparent">
              {hero_title[1]}
            </span>
          </>
        )}
      </h1>
      {hero_desc && (
        <p className="text-[16px] font-normal text-gray-50 text-opacity-80 md:text-[18px]">
          {hero_desc[0]} <br className="hidden md:block" /> {hero_desc[1]}
        </p>
      )}
    </div>
  )
}

export default Hero
