import { HTMLMotionProps } from "framer-motion"

export interface MotionContainerProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode
}

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export interface ImageContainerProps {
  src: string
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | string
  title?: string
  kind?: "primary" | "secondary"
  size?: "small" | "medium"
}

export interface FilterProps {
  searchValue?: string
  setSearchValue?: (value: string) => void
  selectedTags?: string[]
  setSelectedTags?: (value: string[]) => void
  sortDateValue?: string
  setSortDateValue?: (value: string) => void
}
