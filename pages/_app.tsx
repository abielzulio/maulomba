import Head from "components/Head"
import type { AppProps } from "next/app"
import "../styles/globals.css"
import { MantineProvider } from "@mantine/core"
import Footer from "components/Footer"
import Script from "next/script"
import { useRouter } from "next/router"
import { useEffect } from "react"
import * as gtag from "lib/gtag"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-94DZGE8HM1"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-94DZGE8HM1', {
page_path: window.location.pathname,
});
`,
        }}
      />
      <MantineProvider>
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
    </>
  )
}

export default MyApp
