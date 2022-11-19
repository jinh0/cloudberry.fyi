export type CourseType = {
  code: string
  name: string
  description: string
  prerequisites: string[]
  extra?: string[]
  terms: Array<{
    term: 'fall' | 'winter'
    instructors: string[]
  }>
}

export type UserType = {
  id: string
  name: string
  email: string
  saved: string[] | null
  completed: string[] | null
  current: string[] | null
}

/** Helper type for React children prop */
export type Children = JSX.Element | string | Array<JSX.Element | string>

declare module 'utils/courses' {
  const value: Map<string, CourseType[]>
}
