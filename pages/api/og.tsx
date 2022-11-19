import { ImageResponse } from "@vercel/og"
import { NextRequest } from "next/server"

export const config = {
  runtime: "experimental-edge",
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const title: string = searchParams?.get("title") || ""
    const eo: string = searchParams?.get("eo") || ""
    const hasTitle = searchParams.has("title")
    /*   const tags = searchParams.get("tags") */
    /* const img = searchParams.get("img") */

    /*     if (!title || !eo) {
      return new ImageResponse(
        (
          <img
            width="1200"
            height="630"
            // change to actual domain
            src="https://mau-lomba.vercel.app/og.png"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
        ),
        {
          width: 1200,
          height: 630,
        }
      )
    }
 */
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            color: "#f0f6fc",
            backgroundImage:
              "linear-gradient(to bottom right, #0d1116 30%, #0a2442)",
            width: 1200,
            height: 630,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width="500"
            height="630"
            src="https://mau-lomba.vercel.app/1.jpg"
            style={{ objectFit: "cover", height: "100%" }}
          />
          <div
            style={{
              width: 650,
              display: "flex",
              flexDirection: "column",
              paddingLeft: 40,
              paddingRight: 20,
            }}
          >
            <span
              style={{
                fontSize: 50,
                fontWeight: 600,
                wordBreak: "break-word",
                width: "100%",
              }}
            >
              {title}
            </span>
            <p style={{ fontSize: 35, paddingTop: 30, opacity: 0.5 }}>{eo}</p>
            {/*           <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 30,
            }}
          >
            {tags &&
              tags.map((tag) => (
                <p
                  style={{
                    backgroundColor: "#1f2428",
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    fontSize: 30,
                    fontWeight: 500,
                    borderRadius: "0.375rem",
                  }}
                >
                  {tag}
                </p>
              ))}
          </div> */}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500,
    })
  }
}
