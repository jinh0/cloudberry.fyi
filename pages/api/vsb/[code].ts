/**
 * [code].ts: Get individual VSB data by code
 */

import { Safe, VSBCourse } from '@typing'
import { getCourse } from '@utils/vsbScraper'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VSBCourse>
) {
  const { code } = req.query

  const vsbData = await getCourse(code as string)

  if (!vsbData.isOk) return res.status(400)

  return res.status(200).json(vsbData.result)
}
