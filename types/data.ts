export interface Image {
  id: number
  src: string | undefined
  name: string
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

export interface Image {
  id: number
  src: string | undefined
  name: string
}
