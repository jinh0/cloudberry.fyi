export type Term = {
  term: 'fall' | 'winter'
  instructors: string[]
}

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

export type BlockType = { day: string; t1: number; t2: number }

export type VSBType = {
  code: string
  type: string
  section: string
  location: string
  crn: string
  remainingSeats: number
  waitlistRem: number
  waitlistCap: number
  schedule: Array<BlockType>
}

export type VSBTime = {
  day: string
  t1: number
  t2: number
}

export type VSBBlock = {
  type: string
  teachers: string[]
  locations: string[]
  display: string
  section: string
  crn: string
  campus: string
  remainingSeats: number
  waitlistRem: number
  waitlistCap: number
  schedule: VSBTime[]
}

export type VSBCourse = {
  code: string
  blocks: VSBBlock[]
  combos: string[][]
}

/**
 * "Safe" type: Forces you to check whether
 * the object exists or not (like strict null check)
 */
export type Ok<T> = { isOk: true; result: T }
export type Err<T> = { isOk: false }

export type Safe<T> = Ok<T> | Err<T>

/** React prop.children type */
export type Children = JSX.Element | string | Array<JSX.Element | string>

declare module 'utils/courses' {
  const value: Map<string, CourseType[]>
}
