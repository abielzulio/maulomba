import Head from "components/Head"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import { MantineProvider } from "@mantine/core"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Head />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
