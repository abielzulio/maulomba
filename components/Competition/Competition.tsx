import { ContentContainer, ImageContainer } from "components/Container"
import Filter from "components/Filter"
import NextLink from "next/link"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { DeadlineLabel, FeaturedLabel, TagLabel } from "./Label/Label"

const competition = [
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "yaaaa"],
    url: "https://www.google.com",
    img: "/1.jpg",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/2.jpg",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/3.jpeg",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/3.jpeg",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/2.jpg",
  },
  {
    title: "Gacky",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/1.jpg",
  },
]

const CompetitionSection = () => {
  return (
    <ContentContainer>
      <Filter />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
      >
        <Masonry columnsCount={4} gutter="30px">
          {competition.map((comp, id) => (
            <NextLink prefetch passHref href={comp.url} key={id}>
              <a className="group relative flex h-fit w-full flex-col gap-[20px]">
                <div className="relative h-full w-full overflow-hidden rounded-md border-[1px] border-white border-opacity-30 shadow-2xl transition hover:shadow-blue-500/30">
                  <span className="absolute z-10 h-[100px] w-full bg-gradient-to-b from-gray-900/50 to-transparent" />
                  <FeaturedLabel />
                  <DeadlineLabel />
                  <TagLabel tag={comp.tag} />
                  <ImageContainer src={comp.img} />
                </div>
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <p className="text-sm opacity-50">
                      Himpunan Mahasiswa Departemen Geografi Universitas
                      Indonesia
                    </p>
                    <p className="text-md font-semibold tracking-tight">
                      {comp.title}
                    </p>
                    <p className="mt-[3px] text-sm opacity-50">
                      23 December 2022, 23:59
                    </p>
                  </div>
                  <div className="flex flex-col text-right">
                    <p className="text-sm opacity-50">Nasional</p>
                  </div>
                </div>
              </a>
            </NextLink>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </ContentContainer>
  )
}

export default CompetitionSection
