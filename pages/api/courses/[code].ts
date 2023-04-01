/**
 * [code].ts: Get individual course data by code
 */

import { CourseType } from '@typing'
import { NextApiRequest, NextApiResponse } from 'next'
import courses from '@public/course-data.json'

export async function getStaticPaths() {
  return {
    paths: courses.map(({ code }) => ({
      params: { code: code.toLowerCase() },
    })),
    fallback: false,
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { status: number; result: CourseType } | { status: number; error: string }
  >
) {
  return res.status(200).json({
    status: 200,
    result: (courses as any).find(
      course => course.code.toLowerCase() === req.query.code
    ),
  })
}
