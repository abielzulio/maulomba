import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid"
import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"
import { ContentContainer, ImageContainer } from "components/Container"
import Filter from "components/Filter"
import { motion } from "framer-motion"
import NextLink from "next/link"
import { useState } from "react"
import Marquee from "react-fast-marquee"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { Competition } from "types/data"
import { LevelLabel, TagLabel } from "components/Label"
import { FeaturedPill, DeadlinePill } from "components/Pill"
import { FilterProps } from "types/component"
import {
  STRING_CLEAR_FILTERED_COMPETITON_BUTTON,
  STRING_FILTERED_COMPETITON_IS_NOT_FOUND,
} from "data/string"
import { getFullDeadlineDateTime } from "utils"
import Button from "components/Button"

const competition: Competition[] = [
  {
    uuid: "c1129863-59cc-47c6-861c-b72539306c24",
    id: 15,
    title: "SBE Student Challenge 3",
    eo: "SBE",
    tags: ["Design", "Writing", "Business"],
    description:
      '<p>Following the pandemic, things are now improving gradually and starting to return to normal. Nonetheless, the urge to overcome the obstacle as well as the consequences of the pandemic, is real. This year, Padjajaran English Competition 2022 is finally back! With the theme “Rage against the Dying of the Light” which the goal is to encourage participants to express themselves and evaluate the issues that they face during the pandemic.</p><p></p><p></p><p>We are opening the registration for the varsity level and the high school level. Introducing all the categories:</p><p></p><p>High school level:</p><p>📚 Story Telling</p><p>🎤 Speech</p><p>Varsity level:</p><p>📜 Poetry Reading</p><p>📝 Essay</p><p></p><p>Further information and details, please visit:</p><p><a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>What are you waiting for? Express your rage in this competition! Follow us on:</p><p>Line: @swr5937x</p><p>Instagram: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://instagram.com/pec_unpad">instagram.com/pec_unpad</a></p><p>Linkedin:<a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="www.linkedin.com/company/padjadjaran-English-competition/">www.linkedin.com/company/padjadjaran-English-competition/</a></p><p>Website: <a target="_blank" rel="noopener noreferrer nofollow" class="link link" href="http://gemasi.fib.unpad.ac.id">gemasi.fib.unpad.ac.id</a></p><p></p><p>#Padjadjaran #English #Competition #EnglishCompetition #InfoLomba #Lomba #Unpad #SastraI nggris #Storytelling #PoetryReading #Essay #Speech #Puisi #Resilience</p>',
    registration: "Gratis",
    level: "Nasional",
    is_featured: false,
    created_at: "2022-11-16T11:56:13.39688+00:00",
    link: "google.com",
    img: "https://studentcompetitions.com/wp-content/uploads/sites/135/2022/10/Affiche-2022-2023-77d0e5c109ebdd29c0c49506cf3e1170.jpg",
    deadline_date: "2022-11-18",
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
    deadline_date: "2022-11-18",
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
    deadline_date: "2022-11-20",
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
    deadline_date: "2022-11-17",
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

const LikeViewSection = (props: { likes: number; views: number }) => (
  <div className="flex items-center justify-between gap-[10px] text-[12px] font-semibold tracking-tighter">
    <div className="flex items-center gap-[3px] opacity-50">
      <EyeIcon className="h-3 w-3" />
      <span>{props.views}</span>
    </div>
    <div className="flex items-center gap-[3px] opacity-50">
      <HeartIcon className="h-3 w-3" />
      <span>{props.likes}</span>
    </div>
  </div>
)

const CompetitionNotFound = (props: FilterProps) => {
  const handleClearFilter = (
    searchValue: string | undefined,
    selectedTags: string[] | undefined
  ) => {
    if (searchValue && searchValue) {
      props.setSearchValue?.("")
    }
    if (selectedTags && selectedTags.length > 0) {
      props.setSelectedTags?.([])
    }
  }
  return (
    <motion.section
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      className="padding-x flex py-[30px] text-center"
    >
      <div className="mx-auto flex flex-col items-center gap-[10px] opacity-80">
        <ArchiveBoxXMarkIcon className="h-[24px] w-[24px]" />
        {STRING_FILTERED_COMPETITON_IS_NOT_FOUND}
        <button
          onClick={() =>
            handleClearFilter(props.searchValue, props.selectedTags)
          }
          className="mt-[10px] text-sm underline opacity-50 transition hover:opacity-80"
        >
          {STRING_CLEAR_FILTERED_COMPETITON_BUTTON}
        </button>
      </div>
    </motion.section>
  )
}

const CompetitionItem = ({ competition }: { competition: Competition }) => {
  const [deadlineWithDateAndTime, isDeadlineToday] = getFullDeadlineDateTime(
    competition.deadline_date,
    competition.deadline_time
  )

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="group relative flex h-fit w-full flex-col gap-[15px]"
    >
      <div className="relative flex h-full w-full">
        {/*         <button
          onClick={() => alert(competition.id)}
          className="absolute bottom-[10px] right-[10px] z-10 h-fit w-fit rounded-md bg-black/100 p-[5px] text-[10px] font-semibold text-white backdrop-blur-lg backdrop-filter transition hover:text-red-500"
        >
          <HeartIcon className="h-4 w-4" />
        </button> */}
        <NextLink passHref href={`/lomba`} className="relative">
          {/* Competition image compositioned */}
          <a className="relative h-full w-full overflow-hidden rounded-md border-[1px] border-white border-opacity-30 shadow-2xl transition md:hover:shadow-blue-500/30">
            {/* Layers on-top competition image */}
            <span className="absolute z-10 h-[100px] w-full bg-gradient-to-b from-gray-900/60 to-transparent" />
            {competition.is_featured && <FeaturedPill />}
            {isDeadlineToday && <DeadlinePill />}
            {competition.level && <LevelLabel level={competition.level} />}
            {/* Button to like a competition item */}

            {/* Main competition image */}
            {competition.img && (
              <ImageContainer src={competition.img} animateOnHover={true} />
            )}
          </a>
        </NextLink>
      </div>
      {/* Competition information section */}
      <div className="flex flex-col gap-[5px]">
        {/* Competition tags */}
        {competition.tags && <TagLabel tag={competition.tags} />}
        <div className="flex justify-between gap-[20px]">
          {/* Competiton deadline */}
          {deadlineWithDateAndTime && (
            <p className="text-sm opacity-50">{deadlineWithDateAndTime}</p>
          )}
          {/* Competition likes and views */}
          {competition.likes && competition.views && (
            <LikeViewSection
              likes={competition.likes}
              views={competition.views}
            />
          )}
        </div>
        <NextLink passHref href={competition.slug} className="relative">
          <a className="flex flex-col gap-[3px]">
            {/* Competition title */}
            {competition.title && competition.title.length > 30 ? (
              <Marquee
                pauseOnHover
                gradientColor={[13, 17, 22]}
                gradientWidth={20}
                className="text-md font-semibold tracking-tight hover:underline"
              >
                <p className="px-[2px]">{competition.title} |</p>
              </Marquee>
            ) : (
              <p className="text-md font-semibold tracking-tight">
                {competition.title}
              </p>
            )}
            {/* Competition organizer title */}
            {competition.eo && competition.eo.length > 30 ? (
              <Marquee
                pauseOnHover
                gradientColor={[13, 17, 22]}
                gradientWidth={20}
                className="text-sm opacity-50"
              >
                <p className="px-[2px]">{competition.eo} |</p>
              </Marquee>
            ) : (
              <span className="px-[2px] text-[12px] opacity-50">
                {competition.eo}
              </span>
            )}
          </a>
        </NextLink>
      </div>
    </motion.div>
  )
}

export const CompetitionSection = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortDateValue, setSortDateValue] = useState<string>("deadline")
  const [showCount, setShowCount] = useState<number>(4)

  const filteredCompetition = competition
    // Filter past competition by its deadline
    .filter(
      (competition) =>
        new Date(competition.deadline_date).getDate() >= new Date().getDate()
    )
    // Filter by title and description
    .filter(
      (competition) =>
        competition.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        competition.description
          .toLowerCase()
          .includes(searchValue.toLowerCase())
    )
    // Filter by tags
    .filter((competition) =>
      selectedTags.length > 0
        ? competition.tags.find((tag) => selectedTags.includes(tag))
        : true
    )

  const sortedCompetition = filteredCompetition
    // Sort by deadline
    .sort((a, b) => {
      if (sortDateValue === "deadline") {
        return (
          new Date(a.deadline_date).getTime() -
          new Date(b.deadline_date).getTime()
        )
      } else {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      }
    })
    // Sort by is_featured
    .sort((a, b) => Number(b.is_featured) - Number(a.is_featured))

  // Show competitions based n showCount
  const slicedCompetition = sortedCompetition.slice(0, showCount)

  return (
    <ContentContainer className="mb-[60px]">
      <Filter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sortDateValue={sortDateValue}
        setSortDateValue={setSortDateValue}
      />
      {filteredCompetition.length > 0 ? (
        <div className="flex flex-col gap-[30px]">
          <ResponsiveMasonry
            className="padding-x"
            columnsCountBreakPoints={{ 350: 1, 640: 2, 900: 3, 1300: 4 }}
          >
            <Masonry columnsCount={4} gutter="20px">
              {slicedCompetition.map((competition, id) => (
                <CompetitionItem key={id} competition={competition} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
          {showCount < filteredCompetition.length && (
            <div className="padding-x padding-y">
              <Button
                kind="neutral"
                size="medium"
                width="full"
                title={`Tampilkan ${
                  filteredCompetition.length - showCount
                } kompetisi lainnya`}
                onClick={() => setShowCount(showCount + 4)}
              />
            </div>
          )}
        </div>
      ) : (
        <CompetitionNotFound
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      )}
    </ContentContainer>
  )
}
