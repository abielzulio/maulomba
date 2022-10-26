import {
  MagnifyingGlassIcon,
  TagIcon,
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline"
import { Chip } from "@mantine/core"
import { handleMobile, useWindowDimension } from "hooks/useWindowDimension"
import { useState } from "react"
import { motion } from "framer-motion"

const filteroptions = [
  { title: "Videography & Short Film" },
  { title: "Technology & Engineering" },
  { title: "UI/UX" },
  { title: "Frontend" },
  { title: "Backend" },
  { title: "Fullstack" },
  { title: "Mobile" },
  { title: "DevOps" },
  { title: "Data Science" },
  { title: "Machine Learning" },
]

interface FilterProps {
  searchValue?: string
  setSearchValue?: (value: string) => void
  tagValue?: string[]
  setTagValue?: (value: string[]) => void
  sortDateValue?: string
  setSortDateValue?: (value: string) => void
}

interface TagFilterProps extends FilterProps {
  showTag?: boolean
  setShowTag?: (value: boolean) => void
}

const TagFilterToggle = (props: TagFilterProps) => (
  <button
    onClick={() => props.setShowTag?.(!props.showTag)}
    className={`${
      props.showTag ? `!bg-opacity-0` : `!bg-opacity-5`
    } group relative ml-[10px] flex min-w-fit items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white py-[10px] px-[15px] text-sm text-white text-opacity-80 transition hover:border-opacity-50 focus:border-opacity-50 focus:bg-opacity-50`}
  >
    {props.showTag ? (
      <EyeSlashIcon className="h-[18px] w-[18px] opacity-50 transition group-hover:opacity-100" />
    ) : (
      <EyeIcon className="h-[18px] w-[18px] opacity-50 transition group-hover:opacity-100" />
    )}
    Kategori
    <span className="rounded-full bg-white/10 px-[6px] text-[10px]">
      {props.tagValue && props.tagValue.length > 1
        ? props.tagValue.length - 1
        : null}
    </span>
  </button>
)

const DateFilter = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-10 bg-white/5 py-[10px] px-[15px] text-sm text-white text-opacity-80 transition hover:cursor-pointer hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50">
    <CalendarIcon className="h-[18px] w-[18px] opacity-50 transition group-hover:opacity-100" />
    <select
      className="w-full bg-transparent"
      value={props.sortDateValue}
      onChange={(e) => props.setSortDateValue?.(e.target.value)}
      defaultValue="deadline"
    >
      <option value="deadline">Deadline terdekat</option>
      <option value="baru">Lomba terbaru</option>
    </select>
  </div>
)

const SearchFiler = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white/0 py-[10px] pl-[15px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100">
    <MagnifyingGlassIcon className="h-[18px] w-[18px] opacity-50 transition group-hover:opacity-100" />
    <input
      className="w-full bg-transparent transition placeholder:text-white placeholder:text-opacity-50 focus:outline-none focus:placeholder:text-opacity-100"
      type="text"
      placeholder="Cari lomba..."
      defaultValue={props.searchValue}
      onChange={(e) => props.setSearchValue?.(e.target.value)}
    />
  </div>
)

const TagFilter = (props: TagFilterProps) => (
  <motion.div
    className="h-min w-full bg-black"
    animate={{ opacity: 1 }}
    initial={{ opacity: 0 }}
    exit={{ opacity: 0 }}
    transition={{ delay: 0.25 }}
    style={{ display: props.showTag ? "block" : "none" }}
  >
    <Chip.Group
      value={props.tagValue}
      onChange={props.setTagValue}
      multiple
      className="margin-x my-auto flex flex-nowrap gap-[3px] overflow-scroll bg-black pb-[15px]"
    >
      {filteroptions.map((option, id) => (
        <Chip
          className="font-medium"
          styles={{
            label: {
              backgroundColor: "#0f3058 !important",
              backgroundOpacity: "0.1 !important",
              color: "#0090ff",
              borderColor: "transparent !important",
              borderWidth: "1.75px !important",
            },
            checkIcon: {
              borderColor: "white !important",
            },
            root: {
              display: "contents",
            },
          }}
          value={option.title}
          key={id}
        >
          {option.title}
        </Chip>
      ))}
    </Chip.Group>
  </motion.div>
)

const Filter = (props: FilterProps) => {
  const [showTag, setShowTag] = useState<boolean>(true)
  const isMobile: boolean = handleMobile(useWindowDimension())
  return (
    <div className="sticky top-[0px] z-20 flex w-full flex-col">
      <span className="padding-x -mb-[10px] h-[30px] w-full bg-black" />
      <div className="padding-x flex min-h-min flex-col gap-[10px] bg-black pb-[20px] sm:flex-row md:items-center md:gap-[20px]">
        <SearchFiler
          searchValue={props.searchValue}
          setSearchValue={props.setSearchValue}
        />
        <div className="flex w-full">
          <DateFilter
            sortDateValue={props.sortDateValue}
            setSortDateValue={props.setSortDateValue}
          />
          <TagFilterToggle
            showTag={showTag}
            setShowTag={setShowTag}
            tagValue={props.tagValue}
          />
        </div>
      </div>
      <TagFilter
        showTag={showTag}
        tagValue={props.tagValue}
        setTagValue={props.setTagValue}
      />
      <span
        className={`padding-x ${
          isMobile ? `h-[40px]` : `h-[20px]`
        } w-full bg-gradient-to-b from-black to-transparent`}
      />
    </div>
  )
}

export default Filter
