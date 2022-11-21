import { product } from "data/product"
import NextHead from "next/head"

interface HeadProps {
  title?: string
  description?: string
  keywords?: string
  img?: string
  url?: string
  author?: string
  favicon?: string
}

const Head = (props: HeadProps) => {
  const {
    title = product.name + " | " + product.description.short,
    description = product.description.long,
    keywords = product.keywords,
    img = product.url + product.img,
    url = product.url,
    author = product.author,
    favicon = product.url + product.favicon,
  } = props
  return (
    <NextHead>
      <link rel="shortcut icon" href={favicon} />
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta property="og:image" content={img} />
      <meta name="og:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </NextHead>
  )
}

export default Head
