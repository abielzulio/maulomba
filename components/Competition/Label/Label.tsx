import React from "react"
import { ContainerProps } from "types/component"

interface TagLabelProps {
  tag: string[]
}

const PillContainer = (props: ContainerProps) => {
  const { className = `` } = props
  return (
    <p
      className={`absolute z-10 h-min w-min animate-pulse rounded-full py-[5px] px-[13px] backdrop-blur-md backdrop-filter group-hover:animate-none ${className} text-[12px] font-bold tracking-tight text-white`}
    >
      {props.children}
    </p>
  )
}

export const FeaturedPill = () => {
  return (
    <PillContainer className="top-[10px] left-[10px] bg-blue-600">
      Featured
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

export const LevelLabel = () => {
  return (
    <p className="absolute bottom-[10px] left-[10px] z-10 h-fit w-fit rounded-md bg-black/80 p-[5px] text-[10px] font-semibold text-white backdrop-blur-lg backdrop-filter transition">
      Nasional
    </p>
  )
}

export const TagLabel = (props: TagLabelProps) => {
  const isMoreTags = props.tag.length > 2
  const TagLabelItem = (props: { children: React.ReactNode }) => (
    <p
      className="h-fit w-fit whitespace-nowrap rounded-md bg-white/10 p-[5px] text-[10px] font-semibold"
      {...props}
    >
      {props.children}
    </p>
  )
  return (
    <div className="flex flex-row flex-wrap gap-[5px]">
      {props.tag.slice(0, 2).map((tag, id) => (
        <TagLabelItem key={id}>{tag}</TagLabelItem>
      ))}
      {isMoreTags && <TagLabelItem>{`+${props.tag.length - 2}`}</TagLabelItem>}
    </div>
  )
}
