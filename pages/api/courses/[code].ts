/**
 * [code].ts: Get individual course data by code
 */

import { CourseType } from '@typing'
import { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'

export const config = {
  runtime: 'edge',
}

export default function handler(req: NextApiRequest) {
  return new Response(
    JSON.stringify(courses.find(x => x.code.toLowerCase() === req.query.code)),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=1200, stale-while-revalidate=600',
      },
    }
  )
}
