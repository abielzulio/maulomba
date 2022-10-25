import { ContentContainer, ImageContainer } from "components/Container"
import Filter from "components/Filter"
import NextLink from "next/link"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { DeadlineLabel, FeaturedLabel, TagLabel } from "./Label/Label"
import Marquee from "react-fast-marquee"
import { useEffect, useState } from "react"

const competition = [
  {
    title:
      "PEC 2022, Padjajaran English Competition (Speech, Story Telling, Poetry, and Essay)",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: [
      "Videography & Short Film",
      "Technology & Engineering",
      "Technology & Engineering",
    ],
    url: "https://www.google.com",
    img: "/1.jpg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/2.jpg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/3.jpeg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/3.jpeg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
  {
    title: "Hackathon 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/2.jpg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
  {
    title: "Gacky",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod.",
    tag: ["yes", "oke"],
    url: "https://www.google.com",
    img: "/1.jpg",
    eo: "Himpunan Mahasiswa Departemen Geografi Universitas Indonesia",
  },
]

const CompetitionSection = () => {
  const [searchValue, setSearchValue] = useState<string>("")
  return (
    <ContentContainer>
      <Filter searchValue={searchValue} setSearchValue={setSearchValue} />
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}
      >
        <Masonry columnsCount={4} gutter="30px">
          {competition
            .filter(
              (comp) =>
                comp.title.toLowerCase().includes(searchValue.toLowerCase())
              // || comp.desc.toLowerCase().includes(searchValue.toLowerCase())
              // || comp.tag.map((tag) => tag.toLowerCase()).includes(searchValue.toLowerCase())
            )
            .map((comp, id) => (
              <NextLink prefetch passHref href={comp.url} key={id}>
                <a className="group relative flex h-fit w-full flex-col gap-[20px]">
                  <div className="relative h-full w-full overflow-hidden rounded-md border-[1px] border-white border-opacity-30 shadow-2xl transition hover:shadow-blue-500/30">
                    <span className="absolute z-10 h-[100px] w-full bg-gradient-to-b from-gray-900/50 to-transparent" />
                    <FeaturedLabel />
                    <DeadlineLabel />
                    <TagLabel tag={comp.tag} />
                    <ImageContainer src={comp.img} />
                  </div>
                  <div className="flex flex-col gap-[5px]">
                    <div className="flex flex-row justify-between gap-[20px]">
                      <Marquee
                        play={comp.eo.length > 30}
                        pauseOnHover
                        gradientColor={[0, 0, 0]}
                        gradientWidth={10}
                        className="text-sm opacity-50"
                      >
                        <span className="px-[2px]">
                          {comp.eo.length > 30 ? comp.eo + "|" : comp.eo}
                        </span>
                      </Marquee>
                      <div className="flex flex-col text-right">
                        <p className="text-sm opacity-50">Nasional</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[3px]">
                      <p className="text-md font-semibold tracking-tight">
                        {comp.title}
                      </p>
                      <p className="text-sm opacity-50">
                        23 December 2022, 23:59
                      </p>
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
