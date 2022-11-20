import {
  ChatBubbleLeftEllipsisIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import { ContentContainer, ImageContainer } from "components/Container"
import { TagLabel } from "components/Label"
import Link from "components/Link"
import sanitize from "sanitize-html"
import { Competition } from "types/data"
import { getFullDeadlineDateTime } from "utils"

interface CompetitionProps {
  competition: Competition
}

const CompetitionContent = ({ competition }: CompetitionProps) => {
  // Return an array with full date in string and isDeadlineToday in boolean
  const [deadlineWithDateAndTime] = getFullDeadlineDateTime(
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
      <ContentContainer className="padding-x padding-y mx-auto grid w-full grid-cols-1 gap-[30px] lg:grid-cols-3">
        {/* Competition image section */}
        {competition?.img && (
          <ContentContainer className="relative order-2 h-full lg:order-1">
            <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px]">
              <ImageContainer
                animateOnHover
                className="h-full w-full"
                src={competition?.img}
              />
            </ContentContainer>
          </ContentContainer>
        )}
        {/* Competition description section */}
        {sanitizedDescription && (
          <ContentContainer className="relative order-3 flex h-full flex-col gap-[20px] lg:order-2">
            <div
              className="flex h-full flex-col gap-[10px] rounded-md bg-gray-300/5 p-[20px]"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </ContentContainer>
        )}
        <ContentContainer className="order-1 h-full lg:order-3">
          <ContentContainer className="sticky top-[40px] flex flex-col gap-[20px] ">
            {/* Competition title section */}
            {competition?.title && (
              <h2 className="text-[24px] font-semibold">
                {competition?.title}
              </h2>
            )}
            {/* Competition event organizer section */}
            {competition?.eo && (
              <p className="text-base font-medium opacity-75">
                {competition?.eo}
              </p>
            )}
            {/* Competition CTA section */}
            <div className="flex gap-[10px]">
              {/* Competition contact section */}
              {competition?.contact && (
                <Link href={competition?.contact} newTab className="w-full">
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
              {competition?.link && (
                <Link href={competition?.link} newTab className="w-full">
                  <Button
                    icon={<PaperAirplaneIcon width={18} height={18} />}
                    title="Daftar"
                    kind="primary"
                    width="full"
                    size="medium"
                  />
                </Link>
              )}
            </div>
            {/* Competition deadline section */}
            {deadlineWithDateAndTime && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Deadline</p>
                <p className="font-semibold">{deadlineWithDateAndTime}</p>
              </div>
            )}
            {/* Competition registration fee information section */}
            {competition?.registration && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Pendaftaran</p>
                <p className="font-semibold">{competition?.registration}</p>
              </div>
            )}
            {/* Competition level section */}
            {competition?.level && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Tingkat</p>
                <p className="font-semibold">{competition?.level}</p>
              </div>
            )}
            {/* Competition category section */}
            {competition?.tags && (
              <div className="flex justify-between text-sm">
                <p className="opacity-50">Kategori</p>
                <TagLabel tag={competition?.tags} showAll />
              </div>
            )}
          </ContentContainer>
        </ContentContainer>
      </ContentContainer>
    )
  )
}

export default CompetitionContent
