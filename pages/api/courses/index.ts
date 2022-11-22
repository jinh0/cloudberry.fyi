/**
 * /api/courses/index.ts: get course list with optional query
 */

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
  res: NextApiResponse<{ results: CourseType[] } | { error: string }>
) {
  const { search } = req.query as { search: string }

  if (!search || search === '')
    return res.status(200).json({ results: courses.slice(0, 100) })

  return res.status(200).json({
    results: fuse.search(search, { limit: 20 }).map(x => x.item),
  })
}
