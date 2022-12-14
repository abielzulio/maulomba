import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"
import Button from "components/Button"
import { ContentContainer } from "components/Container"
import Filter from "components/Filter"
import { LayoutGroup, motion } from "framer-motion"
import { supabase, SUPABASE_BUCKET_BASE_URL } from "lib/supabase"
import { useEffect, useState } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { FilterProps } from "types/component"
import { Competition } from "types/data"
import { union } from "underscore"
import { getTotalMilisecond, toLocalGMTMilisecond } from "utils"
import CompetitionItem from "./CompetitionItem"

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
        <ArchiveBoxXMarkIcon width={24} height={24} />
        Lomba yang Anda cari tidak ada
        <button
          onClick={() =>
            handleClearFilter(props.searchValue, props.selectedTags)
          }
          className="mt-[10px] text-sm underline opacity-50 transition hover:opacity-80"
        >
          Hapus pencarian
        </button>
      </div>
    </motion.section>
  )
}

export const CompetitionSection = ({
  competitions,
}: {
  competitions: Competition[]
}) => {
  const [searchValue, setSearchValue] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortByValue, setSortByValue] = useState<string>("deadline")
  const [showCount, setShowCount] = useState<number>(12)

  const filteredCompetitions = competitions
    // Filter past competition by its deadline
    .filter(
      (competition) =>
        Date.parse(new Date(competition.deadline_date).toISOString()) +
          getTotalMilisecond(competition.deadline_time) >=
        toLocalGMTMilisecond(Date.now())
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

  const sortedCompetitions = filteredCompetitions
    // Sort by deadline
    .sort((a, b) => {
      switch (sortByValue) {
        // Sort by created_at
        case "baru":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
        // Sort by views_count
        case "populer":
          return b.views_count! - a.views_count!
        // Sort by deadline
        default:
          return (
            Number(new Date(a.deadline_date)) -
            Number(new Date(b.deadline_date))
          )
      }
    })
  // Sort by is_featured
  /*     .sort((a, b) => Number(b.is_featured) - Number(a.is_featured)) */

  // Show competitions based n showCount
  const slicedCompetitions = sortedCompetitions.slice(0, showCount)

  useEffect(() => {
    const savePastFeaturedCompetition = async () => {
      const { data: pastFeaturedCompetitions, error } = await supabase
        .from("competitions")
        .select("*")
        .filter("is_featured", "eq", true)
        .filter("deadline_date", "lte", new Date().toISOString())
      if (pastFeaturedCompetitions) {
        return pastFeaturedCompetitions?.forEach(
          async (pastFeaturedCompetition: Competition) => {
            const { data, error } = await supabase
              .from("past_featured_competitions")
              .insert(pastFeaturedCompetition)
              .select()
            if (error) {
              console.log(error)
            }
          }
        )
      }
      if (error) return console.log(error)
    }

    const deletePastCompetition = async () => {
      const { data: pastCompetitions, error } = await supabase
        .from("competitions")
        .select("*")
        .filter("is_featured", "eq", false)
        .filter("deadline_date", "lte", new Date().toISOString())
      if (error) {
        console.log(error)
      } else if (pastCompetitions) {
        pastCompetitions?.forEach(async (pastCompetition: Competition) => {
          const { data, error } = await supabase.storage
            .from("competition-img")
            .remove([
              pastCompetition.img_url.replace(
                SUPABASE_BUCKET_BASE_URL + "/competition-img/",
                ""
              ),
            ])
          if (error) {
            console.log(error)
          } else {
            const { data, error } = await supabase
              .from("competitions")
              .delete()
              .match({ uuid: pastCompetition.uuid })
            if (error) {
              console.log(error)
            }
          }
        })
      }
    }

    // Auto-save past featured competition to new db
    savePastFeaturedCompetition()

    // Auto-delete past competition db and img
    deletePastCompetition()
  }, [])

  // Show competition tags by its tags
  const competitionTags: string[] = union(
    filteredCompetitions.flatMap(({ tags }) => tags)
  )

  return (
    <ContentContainer>
      <Filter
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        sortByValue={sortByValue}
        setSortByValue={setSortByValue}
        tags={competitionTags}
      />
      {filteredCompetitions.length > 0 ? (
        <div className="flex flex-col gap-[30px]">
          <LayoutGroup>
            <ResponsiveMasonry
              className="padding-x"
              columnsCountBreakPoints={{ 350: 1, 640: 2, 900: 3, 1300: 4 }}
            >
              <Masonry columnsCount={4} gutter="20px">
                {slicedCompetitions.map((competition, id) => (
                  <CompetitionItem key={id} competition={competition} />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </LayoutGroup>
          {showCount < filteredCompetitions.length && (
            <div className="padding-x padding-y">
              <Button
                kind="neutral"
                size="medium"
                width="full"
                title={`Tampilkan ${
                  filteredCompetitions.length - showCount
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
