import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import { CompetitionSection } from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Head from "components/Head"
import Hero from "components/Hero"
import type { NextPage } from "next"
import NextLink from "next/link"

const Home: NextPage = () => {
  return (
    <>
      <Head />
      <Page>
        <HeroContainer>
          <Hero
            hero={{
              title: ["Cari kompetisi", "tanpa distraksi"],
              desc: [
                "Cari, simpan, dan ikuti berbagai jenis kompetisi",
                "dengan mudah dan nyaman",
              ],
            }}
          />
          <CTAContainer>
            <NextLink href="/kirim-lomba">
              <Button
                icon={<ArrowUpTrayIcon width={18} height={18} />}
                title="Unggah lomba"
                label="Gratis!"
                kind="primary"
                size="medium"
                width="full"
                className="sticky top-[20px] mr-auto"
              />
            </NextLink>
          </CTAContainer>
        </HeroContainer>
        <CompetitionSection />
      </Page>
    </>
  )
}

export default Home
