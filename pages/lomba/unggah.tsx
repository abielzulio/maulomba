import { CompetitionUpload } from "components/Competition"
import { ContentContainer, Page } from "components/Container"
import { product } from "data/product"
import type { NextPage } from "next"
import NextLink from "next/link"
import Head from "components/Head"
import { HOME_PATH } from "data/paths"

const UploadCompetition: NextPage = () => (
  <>
    <Head title={"Unggah kompetisi | " + product.description.short} />
    <Page>
      <ContentContainer className="padding-x mx-auto w-full">
        <ContentContainer className="padding-y flex h-fit justify-between">
          <NextLink href={HOME_PATH}>
            <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
              Maulomba
            </a>
          </NextLink>
        </ContentContainer>
        <CompetitionUpload />
      </ContentContainer>
    </Page>
  </>
)

export default UploadCompetition
