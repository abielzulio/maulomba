interface TagLabelProps {
  tag: string[]
}

export const FeaturedLabel = () => {
  return (
    <div className="absolute top-[10px] left-[10px] z-10 h-min w-min">
      <div className="h-min animate-pulse rounded-full bg-blue-600 py-[5px] px-[13px] backdrop-blur-md backdrop-filter group-hover:animate-none">
        <p className="text-[12px] font-bold tracking-tight text-white">
          Featured
        </p>
      </div>
    </div>
  )
}

export const DeadlineLabel = () => {
  return (
    <div className="absolute top-[10px] right-[10px] z-10 h-min w-min">
      <div className="h-min animate-pulse rounded-full bg-red-600 py-[5px] px-[13px] backdrop-blur-md backdrop-filter group-hover:animate-none">
        <p className="text-[12px] font-bold tracking-tight text-white">
          Deadline
        </p>
      </div>
    </div>
  )
}

export const TagLabel = (props: TagLabelProps) => {
  return (
    <div className="absolute bottom-[10px] left-[10px] z-10 h-min w-min">
      <div className="flex flex-row gap-[5px]">
        {props.tag.map((tag, id) => (
          <div className="h-min rounded-md bg-gray-900 bg-opacity-50 p-[5px] opacity-100 backdrop-blur-lg backdrop-filter transition xl:opacity-0 xl:group-hover:opacity-100">
            <p className="text-[12px] font-semibold">{tag}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
