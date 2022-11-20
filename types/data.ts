export interface Image {
  id: number
  data: string
  src: string
  name: string
  type: string
  mime: string
}

export interface Competition {
  uuid: string
  id: number
  title: string
  description: string
  tags: string[]
  registration: "Gratis" | "Berbayar"
  level: "Nasional" | "Internasional" | undefined
  deadline_date: string
  deadline_time: string
  img: string
  likes?: number
  views?: number
  eo: string
  slug: string
  contact: string
  is_featured: boolean
  link: string
  created_at: string
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
