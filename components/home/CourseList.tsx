import { CourseType } from '@typing'
import Course from './Course'

import data from '@utils/courses.json'
import Fuse from 'fuse.js'
import { useContext, useEffect } from 'react'
import SearchContext from '@contexts/SearchContext'

const courses: CourseType[] = [
  {
    code: 'COMP 330',
    name: 'Theory of Computation',
    description:
      'This course covers the theory of computation, including finite automata, regular expressions, context-free grammars, pushdown automata, and Turing machines.',
    prerequisites: ['COMP 251'],
    terms: [
      {
        term: 'fall',
        instructors: ['Prakash Panangaden'],
      },
      {
        term: 'winter',
        instructors: ['Claude Crepeau'],
      },
    ],
  },
  {
    code: 'COMP 250',
    name: 'Introduction to Computer Science',
    description:
      'Mathematical tools (binary numbers, induction, recurrence relations, asymptotic complexity, establishing correctness of programs), Data structures (arrays, stacks, queues, linked lists, trees, binary trees, binary search trees, heaps, hash tables), Recursive and non-recursive algorithms (searching and sorting, tree and graph traversal). Abstract data types, inheritance. Selected topics.',
    prerequisites: [
      'Familiarity with a high level programming language and CEGEP level Math.',
    ],
    extra: [
      'Students with limited programming experience should take COMP 202 or equivalent before COMP 250. See COMP 202 Course Description for a list of topics.',
    ],
    terms: [
      {
        term: 'fall',
        instructors: ['Giulia Alberini'],
      },
      {
        term: 'winter',
        instructors: ['Giulia Alberini'],
      },
    ],
  },
  {
    code: 'MATH 235',
    name: 'Algebra 1',
    description:
      'Sets, functions and relations. Methods of proof. Complex numbers. Divisibility theory for integers and modular arithmetic. Divisibility theory for polynomials. Rings, ideals and quotient rings. Fields and construction of fields from polynomial rings. Groups, subgroups and cosets; group actions on sets.',
    prerequisites: ['MATH 133'],
    terms: [
      {
        term: 'fall',
        instructors: ['Daniel Wise'],
      },
    ],
  },
]

const fuse = new Fuse(courses, { keys: ['code', 'name'] })

const CourseList = () => {
  const { query } = useContext(SearchContext)

  const results = fuse.search(query)

  return (
    <div className="w-2/3 mt-10">
      <p className="text-gray-600 text-sm pb-4">
        Found {query === '' ? 3 : results.length} result
        {query !== '' && results.length > 1 ? 's' : ''} in 1ms.
      </p>
      <p className="border-b"></p>

      {query === ''
        ? courses.map((c, ind) => <Course course={c} key={ind} />)
        : fuse
            .search(query)
            .map((item, ind) => <Course course={item.item} key={ind} />)}
    </div>
  )
}

export default CourseList
