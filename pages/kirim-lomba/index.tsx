import { CompetitionUpload } from "components/Competition"
import { ContentContainer, Page } from "components/Container"
import type { NextPage } from "next"
import NextLink from "next/link"

const UploadCompetition: NextPage = () => (
  <Page>
    <ContentContainer className="padding-x mx-auto w-full md:w-[1000px]">
      <ContentContainer className="padding-y flex h-fit justify-between">
        <NextLink href="/">
          <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
            Maulomba
          </a>
        </NextLink>
      </ContentContainer>
      <CompetitionUpload />
    </ContentContainer>
  </Page>
)

export default UploadCompetition
