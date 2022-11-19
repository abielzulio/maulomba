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
              "linear-gradient(to bottom right, #0d1116 75%, #0a2442)",
            width: "100%",
            height: "100%",
            gap: 40,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            width="600"
            height="630"
            src="https://mau-lomba.vercel.app/1.jpg"
            style={{ objectFit: "cover", height: "100%", width: "100%" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              gap: 40,
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <h1 style={{ fontSize: 45, fontWeight: 600 }}>
              {hasTitle.toString()}
            </h1>
            {/*             <p style={{ fontSize: 35, opacity: 0.5 }}>{eo}</p> */}
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
