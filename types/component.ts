import { HTMLMotionProps } from "framer-motion"
import React from "react"

export interface MotionContainerProps extends HTMLMotionProps<"section"> {
  children: React.ReactNode
}

export interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export interface ImageContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  src: string
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode | string
  title?: string
  kind?: "primary" | "secondary" | "neutral"
  size?: "small" | "medium"
  width?: "full" | "fit"
}

export interface FilterProps {
  searchValue?: string
  setSearchValue?: (value: string) => void
  selectedTags?: string[]
  setSelectedTags?: (value: string[]) => void
  sortDateValue?: string
  setSortDateValue?: (value: string) => void
}
