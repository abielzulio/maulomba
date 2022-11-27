import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import { CompetitionSection } from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Head from "components/Head"
import Hero from "components/Hero"
import { UPLOAD_PATH } from "data/paths"
import { supabase } from "lib/supabase"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import NextLink from "next/link"

const HomePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>,
  React.ReactNode
> = ({ competitions }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
            <NextLink href={UPLOAD_PATH}>
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
        <CompetitionSection competitions={competitions} />
      </Page>
    </>
  )
}

export default HomePage

export const getStaticProps: GetStaticProps = async () => {
  const { data: competitions, error } = await supabase
    .from("competitions")
    .select("*")
    .filter("deadline_date", "gte", new Date().toISOString())

  if (error) {
    console.log(error)
  }

  return {
    props: {
      competitions,
    },
  }
}
