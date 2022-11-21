import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import Button from "components/Button"
import { ContentContainer, Page } from "components/Container"
import Head from "components/Head"
import { product } from "data/product"
import { useWindowDimension } from "hooks/useWindowDimension"
import NextLink from "next/link"

const NotFound = () => {
  const screenWidth = useWindowDimension()
  const isMobile = screenWidth < 640
  return (
    <>
      <Head
        title={"Halaman tidak dapat ditemukan | " + product.description.short}
      />
      <Page>
        <ContentContainer className="padding-x padding-y flex h-fit items-center justify-between">
          <NextLink href="/">
            <a className="font-medium tracking-tight text-white opacity-50 transition hover:opacity-100">
              Maulomba
            </a>
          </NextLink>
        </ContentContainer>
        <ContentContainer className="padding-y padding-x flex min-h-fit w-full flex-col items-center justify-center gap-[30px] text-center">
          <div className="flex flex-col gap-[10px] text-white">
            <h1 className="text-[36px] font-semibold tracking-tight md:text-[54px]">
              Maaf
            </h1>
            <p className="text-[16px] font-normal text-gray-50 text-opacity-80 md:text-[18px]">
              Halaman yang Anda cari tidak dapat ditemukan
            </p>
          </div>
          <div
            className={`flex gap-[15px] ${
              isMobile ? `w-full flex-col-reverse` : `w-fit flex-row`
            }`}
          >
            <NextLink href="/kirim-lomba">
              <Button
                icon={<ArrowUpTrayIcon width={18} height={18} />}
                title="Unggah lomba"
                label="Gratis!"
                kind="secondary"
                size="medium"
                width={isMobile ? "full" : "fit"}
              />
            </NextLink>
            <NextLink href="/">
              <Button
                icon={<MagnifyingGlassIcon width={18} height={18} />}
                title="Cari lomba"
                kind="primary"
                size="medium"
                width={isMobile ? "full" : "fit"}
              />
            </NextLink>
          </div>
        </ContentContainer>
      </Page>
    </>
  )
}

export default NotFound
