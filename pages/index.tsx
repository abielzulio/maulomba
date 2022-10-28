import { ArrowUpTrayIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import { CompetitionSection } from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Hero from "components/Hero"
import useScrollPosition from "hooks/useScrollPosition"
import type { NextPage } from "next"
import NextLink from "next/link"
import { useWindowDimension } from "hooks/useWindowDimension"

const Home: NextPage = () => {
  const scrollPosition = useScrollPosition()
  const isMobile = useWindowDimension() < 640
  return (
    <Page>
      <HeroContainer>
        <Hero
          hero_title={["Cari kompetisi", "tanpa distraksi"]}
          hero_desc={[
            "Cari, simpan, dan ikuti berbagai jenis kompetisi",
            "dengan mudah dan nyaman",
          ]}
          style={{ filter: `blur(${scrollPosition / 25}px)` }}
        />
        <CTAContainer>
          <NextLink href="/kirim-lomba">
            <Button
              icon={<ArrowUpTrayIcon className="h-4 w-4" />}
              title={!isMobile ? "Unggah lomba" : ""}
              kind="primary"
              className="sticky top-[20px]"
            />
          </NextLink>
          <NextLink href="/masuk">
            <Button
              icon={<UserIcon className="h-4 w-4" />}
              kind="secondary"
              className="sticky top-[20px]"
            />
          </NextLink>
        </CTAContainer>
      </HeroContainer>
      <CompetitionSection />
    </Page>
  )
}

export default Home
