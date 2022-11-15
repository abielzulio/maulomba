import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import { ContentContainer, ImageContainer, Page } from "components/Container"
import { TagLabel } from "components/Label"
import type { NextPage } from "next"
import NextLink from "next/link"
import sanitize from "sanitize-html"

const CompetitionPage: NextPage = () => {
  const competition = {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    eo: "Gelanggang Mahasiswa Sastra Inggris Unpad",
    tags: ["Design", "Writting", "Business"],
    description: `<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>`,
    registration: "Gratis",
    level: "Nasional",
    is_premium: false,
    link: "https://google.com",
    img: "/1.jpg",
    contact: "https://wa.me/6283826361142",
  }

  const sanitizeOptions = {
    allowedClasses: {
      a: ["link"],
    },
  }
  return (
    <Page>
      <ContentContainer className="padding-x padding-y flex h-fit justify-between">
        <NextLink href="/">
          <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
            Maulomba
          </a>
        </NextLink>
      </ContentContainer>
      <ContentContainer className="padding-x padding-y mx-auto grid w-full grid-cols-1 gap-[30px] xl:grid-cols-3">
        <ContentContainer className="h-full">
          <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px]">
            {competition.title && (
              <h2 className="text-[18px] font-semibold md:text-[24px]">
                {competition.title}
              </h2>
            )}
            {competition.eo && (
              <p className="text-base font-medium opacity-75">
                {competition.eo}
              </p>
            )}
            <div className="flex gap-[10px]">
              {competition.contact && (
                <NextLink href={competition.contact}>
                  <Button
                    icon={<ChatBubbleLeftEllipsisIcon width={18} height={18} />}
                    title="Narahubung"
                    kind="secondary"
                    width="full"
                    size="medium"
                  />
                </NextLink>
              )}
              {competition.link && (
                <NextLink href={competition.link}>
                  <Button
                    icon={<PaperAirplaneIcon width={18} height={18} />}
                    title="Daftar"
                    kind="primary"
                    width="full"
                    size="medium"
                  />
                </NextLink>
              )}
            </div>

            {competition.registration && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Pendaftaran</p>
                <p className="font-semibold">{competition.registration}</p>
              </div>
            )}
            {competition.level && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Tingkat</p>
                <p className="font-semibold">{competition.level}</p>
              </div>
            )}
            {competition.tags && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Kategori</p>
                <TagLabel tag={competition.tags} showAll />
              </div>
            )}
          </ContentContainer>
        </ContentContainer>
        {competition.description && (
          <ContentContainer className="flex flex-col gap-[20px]">
            <div
              className="flex flex-col gap-[10px] rounded-md bg-gray-300/5 p-[20px]"
              key={Math.random()}
              dangerouslySetInnerHTML={{
                __html: sanitize(competition.description, sanitizeOptions),
              }}
            />
          </ContentContainer>
        )}
        {competition.img && (
          <ContentContainer className="h-full">
            <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px]">
              <ImageContainer
                animateOnHover
                className="h-full w-full"
                src={competition.img}
              />
            </ContentContainer>
          </ContentContainer>
        )}
      </ContentContainer>
    </Page>
  )
}

export default CompetitionPage
