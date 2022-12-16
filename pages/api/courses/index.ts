/**
 * /api/courses/index.ts: get course list with optional query
 */

import { CourseType } from '@typing'
import type { NextApiRequest, NextApiResponse } from 'next'
import courses from 'utils/courses'
import Fuse from 'fuse.js'
import { create, insert, search as searchDb } from '@lyrasearch/lyra'

const fuse = new Fuse<CourseType>(courses, {
  includeScore: true,
  keys: ['code', 'name', 'terms.term'],
  isCaseSensitive: false,
})

const db = create({
  schema: {
    code: 'string',
    name: 'string',
  },
})

// insert(db, courses[0])

for (const course of courses) {
  insert(db, course)
}
// insertBatch(db, courses, { batchSize: 15000 })

// console.log(db.docs)

const movieDB = create({
  schema: {
    title: 'string',
    director: 'string',
    plot: 'string',
    year: 'number',
    isFavorite: 'boolean',
  },
})

insert(movieDB, {
  title: 'The prestige',
  director: 'Christopher Nolan',
  plot: 'Two friends and fellow magicians become bitter enemies after a sudden tragedy. As they devote themselves to this rivalry, they make sacrifices that bring them fame but with terrible consequences.',
  year: 2006,
  isFavorite: true,
})

insert(movieDB, {
  title: 'Big Fish',
  director: 'Tim Burton',
  plot: 'Will Bloom returns home to care for his dying father, who had a penchant for telling unbelievable stories. After he passes away, Will tries to find out if his tales were really true.',
  year: 2004,
  isFavorite: true,
})

insert(movieDB, {
  title: "Harry Potter and the Philosopher's Stone",
  director: 'Chris Columbus',
  plot: 'Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him.',
  year: 2001,
  isFavorite: false,
})

// console.log(movieDB.docs)

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

  const results = {
    results: searchDb(db, {
      term: search,
      properties: ['code', 'name'],
      tolerance: 5,
    }).hits.map(x => x.document),
  } as { results: CourseType[] }

  // const results = {
  //   results: fuse
  //     .search(
  //       {
  //         $and: [
  //           // semesters filter
  //           semester &&
  //             semester !== 'fall|winter' && {
  //               $or: semester
  //                 .split('|')
  //                 .map(x => ({ 'terms.term': `="${x}"` })),
  //             },
  //           // subjects filter
  //           subjects && {
  //             $or: subjects
  //               .split(',')
  //               .map(subject => ({ code: `^="${subject}"` })),
  //           },
  //           // search text
  //           search && { $or: [{ code: search }, { name: search }] },
  //         ].filter(x => x),
  //       },
  //       { limit: 10 }
  //     )
  //     .map(x => x.item),
  // }

  console.timeEnd('query')

  return res.status(200).json(results)
}
