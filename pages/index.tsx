import { ArrowUpTrayIcon, UserIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionSection from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Hero from "components/Hero"
import useScrollPosition from "hooks/useScrollPosition"
import type { NextPage } from "next"
import NextLink from "next/link"

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
          <NextLink href="/kirim-lomba">
            <Button
              icon={<ArrowUpTrayIcon className="h-3 w-3" />}
              title="Unggah lomba"
              className="sticky top-[20px]"
            />
          </NextLink>
          <NextLink href="/masuk">
            <Button
              icon={<UserIcon className="h-3 w-3" />}
              title="Masuk"
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
