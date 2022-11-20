import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import CompetitionContent from "components/Competition/CompetitionContent"
import { ContentContainer, Page } from "components/Container"
import Head from "components/Head"
import { product } from "data/product"
import { useWindowDimension } from "hooks/useWindowDimension"
import type { NextPage } from "next"
import NextLink from "next/link"
import { Competition } from "types/data"

const CompetitionPage: NextPage = () => {
  const screenWidth = useWindowDimension()
  const isMobile = screenWidth < 640
  const competition: Competition = {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    event_organizer: "Gelanggang Mahasiswa Sastra Inggris Unpad",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration_fee: "Gratis",
    level: "Nasional",
    is_featured: false,
    created_at: "2022-11-16T11:56:13.39688+00:00",
    registration_url: "google.com",
    img_url: "https://mau-lomba.vercel.app/1.jpg",
    deadline_date: "2022-11-16",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact_url: "wa.me/6283826361142",
  }

  const stringStripper = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\W+/g, "%20")
      .replace(/[-]+$/, "")
  }

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
