import { CourseType } from '@typing'
import Course from './Course'

import data from '@utils/courses.json'

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

const CourseList = () => {
  return (
    <div className="w-2/3 mt-10">
      <p className="text-gray-600 text-sm border-b pb-4">
        Found 69 results in 7ms.
      </p>

      {courses.map((course, ind) => (
        <Course course={course} key={ind} />
      ))}
    </div>
  )
}

export default CourseList
