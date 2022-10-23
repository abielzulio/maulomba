import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

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

const Filter = () => (
  <div className="flex min-h-min flex-col gap-[10px] rounded-xl border-[1.75px] border-white border-opacity-10 bg-gray-900 p-[20px] shadow-lg shadow-gray-900 md:flex-row md:gap-[30px]">
    <div className="flex w-full items-center gap-[10px] rounded-md border-[1.75px] border-white border-opacity-20 bg-white bg-opacity-5 py-[10px] px-[20px] text-sm text-white transition hover:border-opacity-50 focus:border-opacity-100 md:w-max">
      <MagnifyingGlassIcon className="h-[18px] w-[18px]" />
      <input
        className="w-min bg-transparent placeholder:text-white focus:outline-none"
        type="text"
        placeholder="Cari lomba..."
      />
    </div>
    <div className="flex flex-row gap-[20px] overflow-scroll">
      {filteroptions.map((option) => (
        <div className="flex items-center gap-[10px] text-sm">
          <input type="checkbox" />
          <p>{option.title}</p>
        </div>
      ))}
    </div>
  </div>
)

export default Filter
