/* Static data about product */

import { CURRENT_YEAR } from "data/date/year"

interface Product {
  name: string
  description: {
    short: string
    long: string
  }
  tagline: string
  keywords: string
  url: string
  img: string
  author: string
  favicon: string
}

export const product: Product = {
  name: "Maulomba",
  description: {
    short: `Portal Info Lomba ${CURRENT_YEAR}`,
    long: "Platform untuk mencari informasi berbagai jenis, partner, dan tim lomba sesuai kebutuhanmu dengan mudah dan nyaman",
  },
  tagline: "Cari kompetisi, tanpa distraksi",
  keywords: `info lomba ${CURRENT_YEAR}, lomba ${CURRENT_YEAR}, kompetisi ${CURRENT_YEAR}, lomba, lomba kuliah`,
  url: "https://mau-lomba.vercel.app",
  img: "/og.png",
  author: "Abiel Zulio M",
  favicon: "/favicon.png",
}
