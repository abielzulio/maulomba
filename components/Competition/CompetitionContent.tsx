import {
  ChatBubbleLeftEllipsisIcon,
  EyeIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import { ContentContainer, ImageContainer } from "components/Container"
import { TagLabel } from "components/Label"
import Link from "components/Link"
import { supabase } from "lib/supabase"
import { useEffect, useState } from "react"
import sanitize from "sanitize-html"
import { Competition } from "types/data"
import { getFullDeadlineDateTime } from "utils"

interface CompetitionProps {
  competition: Competition
}

const CompetitionContent = ({ competition }: CompetitionProps) => {
  const [viewsCount, setViewsCount] = useState<string>("0")
  const [registerCount, setRegisterCount] = useState<string>("0")

  const getViewsCount = async (uuid: string) => {
    const { data: views_count, error } = await supabase.rpc("get_views_count", {
      item_uuid: uuid,
    })
    if (views_count) {
      setViewsCount(Number(views_count).toLocaleString())
    } else {
      console.log(error)
    }
  }

  const getRegisterCount = async (uuid: string) => {
    const { data: register_count, error } = await supabase.rpc(
      "get_register_count",
      {
        item_uuid: uuid,
      }
    )
    if (register_count) {
      setRegisterCount(Number(register_count).toLocaleString())
    } else {
      console.log(error)
    }
  }

  const incrementRegisterCount = async (uuid: string) => {
    const { data, error } = await supabase.rpc("increment_register_count", {
      item_uuid: uuid,
      increment_num: 1,
    })
  }

  const incrementViewsCount = async (uuid: string) => {
    const { data, error } = await supabase.rpc("increment_views_count", {
      item_uuid: uuid,
      increment_num: 1,
    })
  }

  useEffect(() => {
    incrementViewsCount(competition.uuid)
  }, [])

  useEffect(() => {
    getViewsCount(competition.uuid)
    getRegisterCount(competition.uuid)
  }, [competition?.uuid])

  // Return an array with full date in string and isDeadlineToday in boolean
  const deadlineWithDateAndTime = getFullDeadlineDateTime(
    competition?.deadline_date,
    competition?.deadline_time
  )

  // Sanitize HTML options
  const sanitizeOptions = {
    allowedClasses: {
      a: ["link"],
    },
  }

  // Sanitize description HTML
  const sanitizedDescription = sanitize(
    competition?.description,
    sanitizeOptions
  )

  return (
    competition && (
      <ContentContainer className="padding-x padding-y mx-auto grid h-full min-w-full grid-cols-1 gap-[30px] text-white xl:mb-[30px] xl:grid-cols-3 ">
        {/* Competition image section */}
        {competition.img_url && (
          <ContentContainer className="relative order-2 h-full xl:order-1">
            <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px]">
              <ImageContainer
                animateOnHover
                className="h-full w-full"
                src={competition.img_url}
              />
            </ContentContainer>
          </ContentContainer>
        )}
        {/* Competition description section */}
        {sanitizedDescription && (
          <ContentContainer className="relative order-3 flex h-full flex-col gap-[20px] xl:order-2">
            <div
              className="flex h-full flex-col gap-[10px] rounded-md bg-gray-300/5 p-[20px]"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </ContentContainer>
        )}
        <ContentContainer className="order-1 h-full xl:order-3">
          <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px] ">
            {/* Competition title section */}
            {competition.title && (
              <h2 className="text-[24px] font-semibold">{competition.title}</h2>
            )}
            {/* Competition event organizer section */}
            {competition.event_organizer && (
              <p className="text-base font-medium opacity-75">
                {competition.event_organizer}
              </p>
            )}
            {/* Competition CTA section */}
            <div className="flex gap-[10px]">
              {/* Competition contact section */}
              {competition.contact_url && (
                <Link href={competition?.contact_url} newTab className="w-full">
                  <Button
                    icon={<ChatBubbleLeftEllipsisIcon width={18} height={18} />}
                    title="Narahubung"
                    kind="secondary"
                    width="full"
                    size="medium"
                  />
                </Link>
              )}
              {/* Competition registration link section */}
              {competition.registration_url && (
                <Link
                  href={competition.registration_url}
                  newTab
                  className="w-full"
                >
                  <Button
                    icon={<PaperAirplaneIcon width={18} height={18} />}
                    title="Daftar"
                    kind="primary"
                    width="full"
                    size="medium"
                    onClick={() => incrementRegisterCount(competition.uuid)}
                  />
                </Link>
              )}
            </div>
            {/* Competition deadline section */}
            {competition?.deadline_date && competition?.deadline_time && (
              <div className="flex justify-between gap-[10px] text-sm">
                <p className="opacity-50">Deadline</p>
                <p className="font-semibold">{deadlineWithDateAndTime}</p>
              </div>
            )}
            {/* Competition registration fee information section */}
            {competition.registration_fee && (
              <div className="flex justify-between gap-[10px] text-sm">
                <p className="opacity-50">Pendaftaran</p>
                <p className="font-semibold">{competition.registration_fee}</p>
              </div>
            )}
            {/* Competition level section */}
            {competition.level && (
              <div className="flex justify-between gap-[10px] text-sm">
                <p className="opacity-50">Tingkat</p>
                <p className="font-semibold">{competition?.level}</p>
              </div>
            )}
            {/* Competition category section */}
            {competition.tags && (
              <div className="flex justify-between gap-[10px] text-sm">
                <p className="opacity-50">Kategori</p>
                <TagLabel tags={competition.tags} showAll align="right" />
              </div>
            )}
            <div className="flex flex-col gap-[10px] text-sm opacity-30">
              <p className="flex gap-[10px]">
                <EyeIcon width={16} height={16} />
                {viewsCount} kali dilihat
              </p>
              <p className="flex gap-[10px]">
                <PaperAirplaneIcon width={16} height={16} />
                {registerCount} orang klik mendaftar
              </p>
            </div>
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    )
  )
}

export default CompetitionContent
