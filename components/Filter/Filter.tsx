import {
  ArrowsUpDownIcon,
  EyeIcon,
  EyeSlashIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline"
import { Chip, createStyles } from "@mantine/core"
import { SORT_FILTER_OPTIONS } from "data/options"
import { COLOR_BLUE_PRIMARY, COLOR_WHITE } from "data/style"
import { motion } from "framer-motion"
import { useState } from "react"
import { FilterProps } from "types/component"

interface TagFilterProps extends FilterProps {
  showTag?: boolean
  setShowTag?: (value: boolean) => void
  tags?: string[]
}

const TagFilterToggle = (props: TagFilterProps) => (
  <button
    onClick={() => props.setShowTag?.(!props.showTag)}
    className={`${
      props.showTag ? `!bg-opacity-0` : `!bg-opacity-5`
    } group relative ml-[10px] flex min-w-fit items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white py-[10px] px-[15px] text-sm text-white text-opacity-80 transition hover:border-opacity-50 focus:border-opacity-50 focus:bg-opacity-50`}
  >
    {props.showTag ? (
      <EyeSlashIcon
        width={18}
        height={18}
        className="opacity-50 transition group-hover:opacity-100"
      />
    ) : (
      <EyeIcon
        width={18}
        height={18}
        className="h-5 w-5 opacity-50 transition group-hover:opacity-100"
      />
    )}
    Kategori
    {props.selectedTags && props.selectedTags.length > 0 && (
      <span className="rounded-full bg-white/10 px-[6px] text-[10px] font-semibold">
        {props.selectedTags.length}
      </span>
    )}
  </button>
)

const SortFilter = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white/5 py-[10px] px-[15px] text-sm text-white text-opacity-80 transition hover:cursor-pointer hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50">
    <ArrowsUpDownIcon
      width={18}
      height={18}
      className="opacity-50 transition group-hover:opacity-100"
    />
    <select
      className="w-full bg-transparent"
      value={props.sortByValue}
      onChange={(e) => props.setSortByValue?.(e.target.value)}
    >
      {SORT_FILTER_OPTIONS.map(({ value, label }, id) => (
        <option key={id} value={value}>
          {label}
        </option>
      ))}
    </select>
  </div>
)

const SearchFiler = (props: FilterProps) => (
  <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white border-opacity-20 bg-white/0 py-[10px] pl-[15px] text-sm text-white transition hover:border-opacity-50 focus:border-[0.1px] focus:border-opacity-100">
    <MagnifyingGlassIcon
      width={18}
      height={18}
      className="opacity-50 transition group-hover:opacity-100"
    />
    <input
      className="w-full bg-transparent transition placeholder:text-white placeholder:text-opacity-50 focus:outline-none focus:placeholder:text-opacity-100"
      type="text"
      placeholder="Cari kompetisi..."
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
          borderColor: `${COLOR_BLUE_PRIMARY} !important`,
          opacity: 1,
          color: "white !important",
          backgroundColor: `${COLOR_BLUE_PRIMARY} !important`,
          borderOpacity: 1,
        },

        [`& .${getRef("iconWrapper")}`]: {
          color: theme.white,
        },
      },
      backgroundColor: "transparent !important",
      backgroundOpacity: "0.1 !important",
      color: COLOR_WHITE,
      borderColor: `${COLOR_WHITE} !important`,
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
    props.tags &&
    props.tags.filter((tag) => props.selectedTags?.indexOf(tag) === -1)
  // New array with selected tags prioritized and the rest from the unselected tags
  const sortedTags =
    unselectedTags && props.tags && unselectedTags.length > 0
      ? props.selectedTags?.concat(unselectedTags)
      : props.tags
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
              className="ml-[10px] flex h-full min-w-fit items-center gap-[5px] rounded-full border-[0.75px] border-white bg-white pt-[3px] pb-[4px] pl-[10px] pr-[12px] text-sm font-medium text-black opacity-50 transition hover:opacity-100"
              onClick={() => props.setSelectedTags?.([])}
            >
              <XMarkIcon width={18} height={18} /> Hapus semua
            </button>
          )}
          {sortedTags &&
            sortedTags.map((option, id) => (
              <Chip
                className="font-medium transition"
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
          <SortFilter
            sortByValue={props.sortByValue}
            setSortByValue={props.setSortByValue}
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
        tags={props.tags}
      />
      <span
        className={`padding-x h-[20px] w-full bg-gradient-to-b from-black to-transparent`}
      />
    </div>
  )
}

export default Filter
