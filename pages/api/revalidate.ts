import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await res.revalidate("/")

  const pathToRevalidate = `/lomba/${
    req.body?.record?.slug || req.body?.old_record?.slug
  }`
  await res.revalidate(pathToRevalidate)

  return res.send({ revalidated: true })
}

export default handler
