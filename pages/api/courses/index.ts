import { CourseType } from '@typing'
import type { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'
import Fuse from 'fuse.js'

const fuse = new Fuse<CourseType>(courses, {
  includeScore: true,
  keys: ['code', 'name'],
  isCaseSensitive: false,
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | { status: number; results: CourseType[] }
    | { status: number; error: string }
  >
) {
  if (req.query.search) {
    const { search } = req.query as { search: string }

    if (search === '')
      return res
        .status(200)
        .json({ status: 200, results: courses.slice(0, 100) })

    return res.status(200).json({
      status: 200,
      results: fuse.search(search, { limit: 20 }).map(x => x.item),
    })
  }

  return res.status(200).json({ status: 200, results: courses.slice(0, 100) })
}
