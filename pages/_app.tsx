import Head from "components/Head"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import { MantineProvider } from "@mantine/core"
import Footer from "components/Footer"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Head />
      <Component {...pageProps} />
      <Footer />
    </MantineProvider>
  )
}

export default MyApp
