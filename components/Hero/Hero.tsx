interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  hero: {
    title: string[]
    desc: string[]
  }
}

const Hero = (props: HeroProps) => {
  const { hero, ...rest } = props
  return (
    <div
      className={`flex flex-col ${hero.desc ? `gap-[20px]` : `gap-[0px]`}`}
      {...rest}
    >
      <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
        {hero.title[0] && <span className="text-white">{hero.title[0]}</span>}
        {hero.title[1] && (
          <>
            ,<br />
            <span className="mr-auto bg-gradient-to-l from-blue-500 to-white bg-clip-text text-transparent">
              {hero.title[1]}
            </span>
          </>
        )}
      </h1>
      {hero.desc && (
        <p className="text-[16px] font-normal text-gray-50 text-opacity-80 md:text-[18px]">
          {hero.desc[0]} <br className="hidden md:block" /> {hero.desc[1]}
        </p>
      )}
    </div>
  )
}

export default Hero
