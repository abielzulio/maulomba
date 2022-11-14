export interface Image {
  id: number
  data: string
  src: string
  name: string
  type: string
  mime: string
}

export interface Competition {
  id?: number
  title: string
  description: string
  tags: string[]
  isFree?: boolean
  level: "Nasional" | "Internasional" | undefined
  deadline: string
  featured?: boolean
  image: string
  likes?: number
  views?: number
  eo: string
  url: string
}

export interface CompressResult {
  data: string
  prefix: string
  elapsedTimeInSeconds: number
  alt: string
  initialSizeInMb: number
  endSizeInMb: number
  ext: string
  quality: number
  endWidthInPx: number
  endHeightInPx: number
  initialWidthInPx: number
  initialHeightInPx: number
  sizeReducedInPercent: number
  iterations: number
}
