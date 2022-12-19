/**
 * /api/courses/index.ts: get course list with optional query
 */

import { CourseType } from '@typing'
import type { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'
import Fuse from 'fuse.js'
// import { create, insert, search as searchDb } from '@lyrasearch/lyra'
// import { Document } from 'flexsearch'

// const db = new Document({
//   document: {
//     id: 'id',
//     index: [
//       {
//         field: 'name',
//       },
//       {
//         field: 'code',
//       },
//     ],
//   },
// })

// courses.forEach(course => db.add({ ...course, id: course.code }))

const fuse = new Fuse<CourseType>(courses, {
  includeScore: true,
  keys: ['code', 'name'],
  isCaseSensitive: false,
})

// const db = create({
//   schema: {
//     code: 'string',
//     name: 'string',
//   },
// })

// for (const course of courses) {
//   insert(db, course)
// }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ results: CourseType[] } | { error: string }>
) {
  const { search, subjects, semester } = req.query as {
    search: string
    subjects: string
    semester: string
  }

  // If there is no query
  if (
    (!search || search === '') &&
    (!subjects || subjects === '') &&
    (!semester || semester === '')
  ) {
    return res.status(200).json({ results: courses.slice(0, 10) })
  }

  console.time('query')

  // const results = searchDb(db, {
  //   term: search,
  //   properties: ['code', 'name'],
  //   tolerance: 7,
  //   limit: 10,
  // }).hits

  // console.log(results)

  const results = {
    results: fuse
      .search(
        {
          $and: [
            // semesters filter
            // semester &&
            // semester !== 'fall|winter' && {
            // $or: semester
            // .split('|')
            // .map(x => ({ 'terms.term': `="${x}"` })),
            // },
            // subjects filter
            subjects && {
              $or: subjects
                .split(',')
                .map(subject => ({ code: `^="${subject}"` })),
            },
            // search text
            search && { $or: [{ code: search }, { name: search }] },
          ].filter(x => x),
        },
        { limit: 10 }
      )
      .map(x => x.item),
  }

  console.timeEnd('query')

  return res.status(200).json(results)
}
