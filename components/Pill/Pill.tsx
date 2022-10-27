import { STRING_FEATUED_PILL } from "data/string"
import { PillContainer } from "components/Container"

export const FeaturedPill = () => {
  return (
    <PillContainer className="top-[10px] left-[10px] bg-blue-600">
      {STRING_FEATUED_PILL}
    </PillContainer>
  )
}

export const DeadlinePill = () => {
  return (
    <PillContainer className="top-[10px] right-[10px] bg-red-600">
      Deadline
    </PillContainer>
  )
}
