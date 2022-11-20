import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionContent from "components/Competition/CompetitionContent"
import { ContentContainer, Page } from "components/Container"
import Head from "components/Head"
import { product } from "data/product"
import { supabase } from "lib/supabase"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import NextLink from "next/link"
import { ParsedUrlQuery } from "querystring"
import { Competition } from "types/data"
import { useWindowDimension } from "hooks/useWindowDimension"

interface CompetitionPageProps {
  competition: Competition
}

interface Params extends ParsedUrlQuery {
  slug: string
}

const CompetitionPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>,
  React.ReactNode
> = ({ competition }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const screenWidth = useWindowDimension()
  const isMobile = screenWidth < 640
  return (
    <>
      <Head
        title={competition.title + " | " + product.description.short}
        description={competition.description.slice(0, 160)}
        author={competition.eo}
      />
      <Page>
        <ContentContainer className="padding-x padding-y flex h-fit items-center justify-between">
          <NextLink href="/">
            <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
              Maulomba
            </a>
          </NextLink>
          <NextLink href="/kirim-lomba">
            <Button
              icon={<ArrowUpTrayIcon className="h-4 w-4" />}
              title={isMobile ? undefined : "Unggah lomba"}
              label={isMobile ? undefined : "Gratis!"}
              kind="secondary"
              size={isMobile ? "small" : "medium"}
              width="fit"
            />
          </NextLink>
        </ContentContainer>
        <CompetitionContent competition={competition} />
      </Page>
    </>
  )
}

export default CompetitionPage

export const getStaticProps: GetStaticProps<
  CompetitionPageProps,
  Params
> = async ({ params }) => {
  const { data: competition, error } = await supabase
    .from("competitions")
    .select("*")
    .eq("slug", params?.slug)
    .single()

  if (error) {
    console.log(error)
  }

  return {
    props: {
      competition,
    },
  }
}

export const getStaticPaths = async () => {
  const { data: competitions, error } = await supabase
    .from("competitions")
    .select("slug")

  if (error) {
    console.log(error)
  }

  const paths = competitions?.map((competition) => ({
    params: { slug: competition?.slug },
  }))

  return {
    paths,
    fallback: true,
  }
}
