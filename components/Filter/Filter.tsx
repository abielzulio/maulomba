import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

const filteroptions = [
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
}

const Filter = (props: FilterProps) => {
  return (
    <div className="sticky top-[0px] z-20 flex w-full flex-col">
      <span className="-mb-[10px] h-[40px] w-full bg-black" />
      <div className="flex min-h-min flex-col gap-[10px] bg-black pb-[20px] md:flex-row md:gap-[30px]">
        <div className="group flex w-full items-center gap-[10px] rounded-md border-[0.5px] border-white/10 bg-white/5 py-[10px] px-[20px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100 focus:bg-opacity-50 md:w-max">
          <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
          <input
            className="w-min bg-transparent transition placeholder:text-white placeholder:text-opacity-50 focus:outline-none focus:placeholder:text-opacity-100"
            type="text"
            placeholder="Cari lomba..."
            defaultValue={props.searchValue}
            onChange={(e) => props.setSearchValue(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-[20px]">
          {filteroptions.map((option) => (
            <div className="flex items-center gap-[10px] text-sm">
              <input type="checkbox" />
              <p>{option.title}</p>
            </div>
          ))}
        </div>
      </div>
      <span className="h-[20px] w-full bg-gradient-to-b from-black to-transparent" />
    </div>
  )
}

export default Filter
