import {
  ArrowSmallDownIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionSection from "components/Competition"
import { ButtonContainer, HeroContainer, Page } from "components/Container"
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
        <ButtonContainer>
          <Button
            icon={<ArrowUpTrayIcon className="h-[18px] w-[18px]" />}
            title="Unggah Lomba"
          />
          <Button
            icon={<ArrowSmallDownIcon className="h-[18px] w-[18px]" />}
            title="Cari Lomba"
            kind="secondary"
          />
        </ButtonContainer>
      </HeroContainer>
      <CompetitionSection />
    </Page>
  )
}

export default Home
