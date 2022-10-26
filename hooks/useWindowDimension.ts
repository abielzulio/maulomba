import { useEffect, useState } from "react"

export const useWindowDimension = () => {
  const [windowDimension, setWindowDimension] = useState<number>(0)

  const handleResize = () => {
    setWindowDimension(window.innerWidth)
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleResize()
    }

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize)
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize)
      }
    }
  }, [])

  return windowDimension
}

export const handleMobile = (windowDimension: number) => {
  return windowDimension < 640
}
