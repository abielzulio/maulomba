import { EyeIcon, HeartIcon } from "@heroicons/react/24/solid"
import { ImageContainer } from "components/Container"
import { LevelLabel, TagLabel } from "components/Label"
import { DeadlinePill, FeaturedPill } from "components/Pill"
import { motion } from "framer-motion"
import { supabase } from "lib/supabase"
import NextLink from "next/link"
import { useEffect, useState } from "react"
import Marquee from "react-fast-marquee"
import { Competition } from "types/data"
import { getFullDeadlineDateTime } from "utils"

const LikeViewSection = ({
  uuid,
}: {
  likes?: number
  views?: number
  uuid: string
}) => {
  const [viewsCount, setViewsCount] = useState<string>("0")
  const getViews = async (uuid: string) => {
    const { data: views, error } = await supabase.rpc("get_views", {
      item_uuid: uuid,
    })
    if (views) {
      setViewsCount(Number(views).toLocaleString())
    } else {
      console.log(error)
    }
  }

  useEffect(() => {
    getViews(uuid)
  }, [uuid])

  return (
    <div className="flex items-center justify-between gap-[10px] text-[12px] font-semibold tracking-tighter">
      {viewsCount && (
        <motion.div
          animate={{ opacity: 0.5 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0.5 }}
          className="flex items-center gap-[3px] opacity-50"
        >
          <EyeIcon className="h-3 w-3" />
          <span>{viewsCount}</span>
        </motion.div>
      )}
      {/*       {likes && (
        <div className="flex items-center gap-[3px] opacity-50">
          <HeartIcon className="h-3 w-3" />
          <span>{likes}</span>
        </div>
      )} */}
    </div>
  )
}

const CompetitionItem = ({ competition }: { competition: Competition }) => {
  const [deadlineWithDateAndTime, isDeadlineToday] = getFullDeadlineDateTime(
    competition.deadline_date,
    competition.deadline_time
  )

  const incrementViews = async (uuid: string) => {
    const { data, error } = await supabase.rpc("increment_view", {
      item_uuid: uuid,
      increment_num: 1,
    })
  }

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
        <NextLink
          passHref
          href={`/lomba/${competition.slug}`}
          className="relative"
        >
          {/* Competition image compositioned */}
          <a
            onClick={() => incrementViews(competition.uuid)}
            className="relative h-full w-full overflow-hidden rounded-md border-[1px] border-white border-opacity-30 shadow-2xl transition md:hover:shadow-blue-500/30"
          >
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
          <LikeViewSection uuid={competition?.uuid} />
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

export default CompetitionItem
