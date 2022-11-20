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
  registration_fee: "Gratis" | "Berbayar"
  level: "Nasional" | "Internasional"
  deadline_date: string
  deadline_time: string
  likes?: number
  views?: number
  img_url: string
  eo: string
  slug: string
  contact_url: string
  is_featured: boolean
  registration_url: string
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
