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

export type VSBType = {
  code: string
  type: string
  section: string
  location: string
  remainingSeats: number
  waitlistRem: number
  waitlistCap: number
  schedule: Array<{ day: string; t1: number; t2: number }>
}

/**
 * "Safe" type: Forces you to check whether
 * the object exists or not (like strict null check)
 */
export type Safe<T extends Record> =
  | ({
      [K in keyof T]: T[K]
    } & { status: true })
  | { status: false }

/** React prop.children type */
export type Children = JSX.Element | string | Array<JSX.Element | string>

declare module 'utils/courses' {
  const value: Map<string, CourseType[]>
}
