import {
  ArrowSmallDownIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionSection from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Hero from "components/Hero"
import useScrollPosition from "hooks/useScrollPosition"
import type { NextPage } from "next"

const Home: NextPage = () => {
  const scrollPosition = useScrollPosition()
  return (
    <Page>
      <HeroContainer style={{ filter: `blur(${scrollPosition / 25}px)` }}>
        <Hero
          title={["Cari kompetisi", "tanpa distraksi"]}
          desc={[
            "Cari, simpan, dan ikuti berbagai jenis kompetisi",
            "dengan mudah dan nyaman",
          ]}
        />
        <CTAContainer>
          <Button
            icon={<ArrowUpTrayIcon className="h-[18px] w-[18px]" />}
            title="Unggah lomba"
          />
          <div className="flex min-w-fit items-center gap-[10px] rounded-full p-[10px] text-sm font-semibold text-blue-500 transition">
            <ArrowSmallDownIcon className="h-[18px] w-[18px] animate-bounce" />
            <span>Cari lomba</span>
          </div>
        </CTAContainer>
      </HeroContainer>
      <CompetitionSection />
    </Page>
  )
}

export default Home
