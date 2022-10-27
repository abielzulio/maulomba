import {
  CalendarIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Chip, createStyles } from "@mantine/core"
import { COMPETITION_FILTER_OPTIONS, DATE_FILTER_OPTIONS } from "data/options"
import {
  STRING_CATEGORY_TOGGLE_BUTTON,
  STRING_SEARCH_FILTER_PLACEHOLDER,
} from "data/string"
import { motion } from "framer-motion"
import { useState } from "react"
import { FilterProps } from "types/component"

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
      <EyeSlashIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
    ) : (
      <EyeIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
    )}
    {STRING_CATEGORY_TOGGLE_BUTTON}
    {props.selectedTags && props.selectedTags.length > 0 && (
      <span className="rounded-full bg-white/10 px-[6px] text-[10px] font-semibold">
        {props.selectedTags.length}
      </span>
    )}
  </button>
)

const DateFilter = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white/5 py-[10px] px-[15px] text-sm text-white text-opacity-80 transition hover:cursor-pointer hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50">
    <CalendarIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
    <select
      className="w-full bg-transparent"
      value={props.sortDateValue}
      onChange={(e) => props.setSortDateValue?.(e.target.value)}
    >
      <option value="deadline">{DATE_FILTER_OPTIONS[0]}</option>
      <option value="baru">{DATE_FILTER_OPTIONS[1]}</option>
    </select>
  </div>
)

const SearchFiler = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white/0 py-[10px] pl-[15px] text-sm text-white transition hover:border-opacity-50 focus:border-[0.1px] focus:border-opacity-100">
    <MagnifyingGlassIcon className="h-5 w-5 opacity-50 transition group-hover:opacity-100" />
    <input
      className="w-full bg-transparent transition placeholder:text-white placeholder:text-opacity-50 focus:outline-none focus:placeholder:text-opacity-100"
      type="text"
      placeholder={STRING_SEARCH_FILTER_PLACEHOLDER}
      value={props.searchValue}
      onChange={(e) => props.setSearchValue?.(e.target.value)}
    />
  </div>
)

const TagFilter = (props: TagFilterProps) => {
  // Mantine chip styling
  const useStyles = createStyles((theme, _params, getRef) => ({
    iconWrapper: {
      ref: getRef("iconWrapper"),
    },
    label: {
      "&[data-checked]": {
        "&, &:hover": {
          borderColor: "#0070F3 !important",
          opacity: 1,
          color: "white !important",
          backgroundColor: "#0070F3 !important",
          borderOpacity: 1,
        },

        [`& .${getRef("iconWrapper")}`]: {
          color: theme.white,
        },
      },
      backgroundColor: "transparent !important",
      backgroundOpacity: "0.1 !important",
      color: "white",
      borderColor: "white !important",
      opacity: 0.5,
      borderWidth: "0.5px",
      borderOpacity: 0 + "!important",
      "&:hover": {
        borderOpacity: 0.5,
        opacity: 0.8,
      },
    },
    checkIcon: {
      color: "white !important",
    },
    // A fix to consistent Mantine chip style accross browsers
    root: {
      display: "contents",
    },
  }))
  const { classes } = useStyles()
  // Array of unselected tags
  const unselectedTags =
    props.selectedTags &&
    COMPETITION_FILTER_OPTIONS &&
    COMPETITION_FILTER_OPTIONS.filter(
      (tag) => props.selectedTags?.indexOf(tag) === -1
    )
  // New array with selected tags prioritized and the rest from the unselected tags
  const sortedTags =
    unselectedTags && COMPETITION_FILTER_OPTIONS && unselectedTags.length > 0
      ? props.selectedTags?.concat(unselectedTags)
      : COMPETITION_FILTER_OPTIONS
  return (
    <motion.div
      className="h-min w-full bg-black"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.25 }}
      style={{ display: props.showTag ? "block" : "none" }}
    >
      <div className="margin-x relative my-auto bg-black">
        {/* Left side gradient */}
        <span className="absolute bottom-[10px] z-10 h-full w-[30px] bg-gradient-to-r from-[#0d1116] to-transparent" />
        {/* Right side gradient */}
        <span className="absolute right-[0px] bottom-[10px] z-10 h-full w-[30px] bg-gradient-to-l from-[#0d1116] to-transparent" />
        <Chip.Group
          value={props.selectedTags}
          onChange={props.setSelectedTags}
          multiple
          className={`flex flex-nowrap gap-[3px] overflow-scroll px-[10px] pb-[15px]`}
        >
          {props.selectedTags && props.selectedTags.length > 0 && (
            <button
              className="mx-auto ml-[10px] flex h-full min-w-fit items-center gap-[5px] rounded-full border-[0.75px] border-white pt-[3px] pb-[4px] pl-[10px] pr-[12px] text-sm font-medium text-white opacity-50 transition hover:opacity-100"
              onClick={() => props.setSelectedTags?.([])}
            >
              <XMarkIcon className="h-4 w-4" /> Hapus semua
            </button>
          )}
          {sortedTags &&
            sortedTags.map((option, id) => (
              <Chip
                className="font-medium"
                styles={{}}
                value={option}
                classNames={classes}
                key={id}
              >
                {option}
              </Chip>
            ))}
        </Chip.Group>
      </div>
    </motion.div>
  )
}

const Filter = (props: FilterProps) => {
  const [showTag, setShowTag] = useState<boolean>(true)
  return (
    <div className="sticky top-[0px] z-20 flex w-full flex-col">
      <span className="padding-x -mb-[10px] h-[30px] w-full bg-black" />
      <div
        className={`padding-x flex min-h-min flex-col gap-[10px] bg-black ${
          showTag ? `pb-[20px]` : `pb-[10px]`
        } sm:flex-row md:items-center md:gap-[20px]`}
      >
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
            selectedTags={props.selectedTags}
          />
        </div>
      </div>
      <TagFilter
        showTag={showTag}
        selectedTags={props.selectedTags}
        setSelectedTags={props.setSelectedTags}
      />
      <span
        className={`padding-x h-[20px] w-full bg-gradient-to-b from-black to-transparent`}
      />
    </div>
  )
}

export default Filter
