import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline"
import { Chip } from "@mantine/core"

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
  searchValue: string
  setSearchValue: (value: string) => void
  tagValue: string[]
  setTagValue: (value: string[]) => void
  sortValue: string
  setSortValue: (value: string) => void
}

const Filter = (props: FilterProps) => {
  return (
    <div className="sticky top-[0px] z-20 flex w-full flex-col">
      <span className="padding-x -mb-[10px] h-[30px] w-full bg-black" />
      <div className="padding-x flex min-h-min flex-col gap-[10px] bg-black sm:flex-row md:items-center md:gap-[20px]">
        <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white/10 bg-white/5 py-[10px] px-[15px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50">
          <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
          <input
            className="w-full bg-transparent transition placeholder:text-white placeholder:text-opacity-50 focus:outline-none focus:placeholder:text-opacity-100"
            type="text"
            placeholder="Cari lomba..."
            defaultValue={props.searchValue}
            onChange={(e) => props.setSearchValue(e.target.value)}
          />
        </div>
        <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white/10 bg-white/5 py-[10px] px-[15px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50">
          <CalendarIcon className="h-[18px] w-[18px]" />
          <select
            className="w-full bg-transparent"
            value={props.sortValue}
            onChange={(e) => props.setSortValue(e.target.value)}
            defaultValue="deadline"
          >
            <option value="deadline">Deadline terdekat</option>
            <option value="baru">Lomba terbaru</option>
          </select>
        </div>
      </div>
      <div className="h-min w-full bg-black">
        <Chip.Group
          value={props.tagValue}
          onChange={props.setTagValue}
          multiple
          className="margin-x my-auto flex flex-nowrap overflow-scroll bg-black pb-[15px]"
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
              }}
              value={option.title}
              key={id}
            >
              {option.title}
            </Chip>
          ))}
        </Chip.Group>
      </div>
      <span className="padding-x h-[10px] w-full bg-gradient-to-b from-black to-transparent" />
    </div>
  )
}

export default Filter
