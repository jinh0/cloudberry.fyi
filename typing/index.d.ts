export type CourseType = {
  code: string
  name: string
  description: string
  prerequisites: string[]
  extra?: string[]
  terms: Array<{
    term: 'fall' | 'winter',
    instructors: string[]
  }>
}

declare module 'utils/courses' {
  const value: Map<string, CourseType[]>
}