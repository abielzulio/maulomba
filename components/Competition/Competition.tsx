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

const competition: Competition[] = [
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tags: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    image: "/1.jpg",
    eo: "ASEAN",
    level: "Nasional",
    likes: 1000,
    views: 1000,
    deadline: "23 Desember 2022, 23:59",
    featured: true,
    id: 1,
  },
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tags: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    image: "/2.jpg",
    eo: "ASEAN",
    level: "Nasional",
    likes: 1000,
    views: 1000,
    deadline: "23 Desember 2022, 23:59",
    featured: true,
    id: 2,
  },
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tags: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    image: "/3.jpeg",
    eo: "ASEAN",
    level: "Nasional",
    likes: 1000,
    views: 1000,
    deadline: "23 Desember 2022, 23:59",
    featured: true,
    id: 2,
  },
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tags: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    image: "/1.jpg",
    eo: "ASEAN",
    level: "Nasional",
    likes: 1000,
    views: 1000,
    deadline: "23 Desember 2022, 23:59",
    featured: true,
    id: 2,
  },
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tags: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    image: "/1.jpg",
    eo: "ASEAN",
    level: "Nasional",
    likes: 1000,
    views: 1000,
    deadline: "23 Desember 2022, 23:59",
    featured: true,
    id: 2,
  },
]

const LikeViewSection = (props: { likes: number; views: number }) => (
  <div className="flex items-center justify-between gap-[10px] text-[12px] font-semibold tracking-tighter">
    <div className="flex items-center gap-[3px] opacity-50">
      <EyeIcon className="h-[12px] w-[12px]" />
      <span>{props.views}</span>
    </div>
    <div className="flex items-center gap-[3px] opacity-50">
      <HeartIcon className="h-[12px] w-[12px]" />
      <span>{props.likes}</span>
    </div>
  </div>
)

const CompetitionItem = ({ competition }: { competition: Competition }) =>
  competition && (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      layout
      className="group relative flex h-fit w-full flex-col gap-[15px]"
    >
      <div className="relative flex h-full w-full">
        <button
          onClick={() => alert(competition.id)}
          className="absolute bottom-[10px] right-[10px] z-10 h-fit w-fit rounded-md bg-black/100 p-[5px] text-[10px] font-semibold text-white backdrop-blur-lg backdrop-filter transition hover:text-red-500"
        >
          <HeartIcon className="h-[14px] w-[14px]" />
        </button>
        <NextLink passHref href={competition.url} className="relative">
          {/* Competition image compositioned */}
          <a className="relative h-full w-full overflow-hidden rounded-md border-[1px] border-white border-opacity-30 shadow-2xl transition md:hover:shadow-blue-500/30">
            {/* Layers on-top competition image */}
            <span className="absolute z-10 h-[100px] w-full bg-gradient-to-b from-gray-900/60 to-transparent" />
            {competition.featured && <FeaturedPill />}
            {competition.deadline && <DeadlinePill />}
            {competition.level && <LevelLabel level={competition.level} />}
            {/* Button to like a competition item */}

            {/* Main competition image */}
            {competition.image && <ImageContainer src={competition.image} />}
          </a>
        </NextLink>
      </div>
      {/* Competition information section */}
      <div className="flex flex-col gap-[5px]">
        {/* Competition tags */}
        {competition.tags && <TagLabel tag={competition.tags} />}
        <div className="flex justify-between gap-[20px]">
          {/* Competiton deadline */}
          {competition.deadline && (
            <p className="text-sm opacity-50">{competition.deadline}</p>
          )}
          {/* Competition likes and views */}
          {competition.likes && competition.views && (
            <LikeViewSection
              likes={competition.likes}
              views={competition.views}
            />
          )}
        </div>
        <NextLink passHref href={competition.url} className="relative">
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

const CompetitionSection = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [tagValue, setTagValue] = useState<string[]>([""])
  const [sortDateValue, setSortDateValue] = useState<string>("deadline")
  /* Filter by title and desc */
  /* Filter by tags */
  const filteredCompetition = competition
    .filter(
      (competition) =>
        competition.title.toLowerCase().includes(searchValue.toLowerCase())
      // || comp.desc.toLowerCase().includes(searchValue.toLowerCase())
    )
    .filter((competition) =>
      tagValue.length > 1
        ? competition.tags.find((tag) => tagValue.includes(tag))
        : true
    )

  const handleClearFilter = (searchValue: string, tagValue: string[]) => {
    if (searchValue) {
      setSearchValue("")
    }
    if (tagValue.length > 1) {
      setTagValue([""])
    }
  }
  return (
    <ContentContainer>
      <Filter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        tagValue={tagValue}
        setTagValue={setTagValue}
        sortDateValue={sortDateValue}
        setSortDateValue={setSortDateValue}
      />
      {filteredCompetition.length > 0 ? (
        <ResponsiveMasonry
          className="padding-x"
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
        >
          <Masonry columnsCount={4} gutter="20px">
            {filteredCompetition.map((competition, id, arr) => (
              <CompetitionItem key={id} competition={competition} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <motion.section
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="padding-x flex py-[30px] text-center"
        >
          <div className="mx-auto flex flex-col items-center gap-[10px] opacity-80">
            <ArchiveBoxXMarkIcon className="h-[24px] w-[24px]" />
            Lomba yang Anda cari tidak ada
            <button
              onClick={() => handleClearFilter(searchValue, tagValue)}
              className="mt-[10px] text-sm underline opacity-50 transition hover:opacity-80"
            >
              Hapus penyaringan
            </button>
          </div>
        </motion.section>
      )}
    </ContentContainer>
  )
}

export default CompetitionSection
