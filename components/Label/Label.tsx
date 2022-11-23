import React from "react"

interface TagLabelProps {
  tags: string[]
  showAll?: boolean
  align?: "left" | "right"
}

interface LevelLabelProps {
  level: string
}

export const LevelLabel = (props: LevelLabelProps) => {
  return (
    <p className="absolute bottom-[10px] left-[10px] z-10 h-fit w-fit rounded-md bg-black p-[5px] text-[10px] font-semibold text-white opacity-80 backdrop-blur-lg backdrop-filter transition">
      {props.level}
    </p>
  )
}

export const TagLabel = ({
  tags,
  showAll = false,
  align = "left",
}: TagLabelProps) => {
  const isMoreTags = tags.length > 2
  const TagLabelItem = (props: { children: React.ReactNode }) => (
    <p
      className="h-fit w-fit whitespace-nowrap rounded-md bg-white/10 p-[5px] text-[12px] font-semibold opacity-80"
      {...props}
    >
      {props.children}
    </p>
  )
  return (
    <div
      className={`flex flex-row flex-wrap gap-[5px] ${
        align === "right" ? `justify-end` : `justify-start`
      }`}
    >
      {tags.slice(0, showAll ? tags.length : 2).map((tag, id) => (
        <TagLabelItem key={id}>{tag}</TagLabelItem>
      ))}
      {!showAll && isMoreTags && (
        <TagLabelItem>{`+${tags.length - 2}`}</TagLabelItem>
      )}
    </div>
  )
}
