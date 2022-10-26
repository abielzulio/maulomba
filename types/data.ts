export interface Image {
  id: number
  src: string | undefined
  name: string
}

export interface Competition {
  id: string
  title: string
  desc: string
  tags: string[]
  level: "Nasional" | "Internasional"
  deadline: string
  featured: boolean
  image: string
  likes: number
  views: number
  eo: string
  url: string
}
