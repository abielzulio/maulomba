import { ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import { CompetitionSection } from "components/Competition"
import { CTAContainer, HeroContainer, Page } from "components/Container"
import Head from "components/Head"
import Hero from "components/Hero"
import { supabase } from "lib/supabase"
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import NextLink from "next/link"
import { Competition } from "types/data"

const competitions: Competition[] = [
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "SBE Student Challenge 3",
    eo: "SBE",
    tags: ["Design", "UI/UX"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: false,
    created_at: "2022-11-16T11:56:13.39688+00:00",
    link: "google.com",
    img: "https://studentcompetitions.com/wp-content/uploads/sites/135/2022/10/Affiche-2022-2023-77d0e5c109ebdd29c0c49506cf3e1170.jpg",
    deadline_date: "2022-11-22",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact: "wa.me/6283826361142",
  },
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "DCFX BLOG COMPETITION",
    eo: "DCFX",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: true,
    created_at: "2022-11-14T11:56:13.39688+00:00",
    link: "google.com",
    img: "/2.jpg",
    deadline_date: "2022-11-20",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact: "wa.me/6283826361142",
  },
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "East Asia Summit Hackathon on Combatting Marine Plastic",
    eo: "ASEAN",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: false,
    created_at: "2022-11-16T11:56:13.39688+00:00",
    link: "google.com",
    img: "/1.jpg",
    deadline_date: "2022-11-21",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact: "wa.me/6283826361142",
  },
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "Digital Campus Challenge",
    eo: "Gelanggang Mahasiswa Sastra Inggris Unpad",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: true,
    created_at: "2022-11-14T11:56:13.39688+00:00",
    link: "google.com",
    img: "/3.jpeg",
    deadline_date: "2022-11-22",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact: "wa.me/6283826361142",
  },
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "ChangeMakers Seed Funding 2023",
    eo: "StartupXS",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: false,
    created_at: "2022-11-17T11:56:13.39688+00:00",
    link: "google.com",
    img: "https://studentcompetitions.com/wp-content/uploads/sites/135/2022/10/2-86626816e6603347dbd5c152c4917027.jpg",
    deadline_date: "2022-11-20",
    deadline_time: "18:23:00",
    slug: "/pec-2022-padjajaran-english-competition-speech-story-telling-poetry-and-essay",
    contact: "wa.me/6283826361142",
  },
]

interface HomePageProps {
  competitions: Competition[]
}

const HomePage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>,
  React.ReactNode
> = ({ competitions }: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.table(competitions[0])
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

  if (error) {
    console.log(error)
  }

  return {
    props: {
      competitions,
    },
  }
}
