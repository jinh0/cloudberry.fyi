import { InfiniteData } from '@tanstack/react-query'

export type SemesterOption = {
  id: number
  name: string
  value: 'fall' | 'winter' | 'fall|winter'
}

export type WaiterType = {
  uid: string
  email: string
  code: string
  crn: `${number}`
  ctime: Timestamp
  ftime: Timestamp
  status: 'pending' | 'completed'
}

export type SearchContextType = {
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  subjects: Subject[]
  setSubjects: Dispatch<SetStateAction<Subject[]>>
  semester: SemesterOption
  setSemester: Dispatch<SetStateAction<SemesterOption>>
  isLoading: boolean
  error: unknown
  data: InfiniteData<{
    results: CourseType[]
    nextCursor: number
    numOfResults: number
  }>
  refetch: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<{ results: CourseType[] }, unknown>>
  fetchNextPage: (options?: FetchNextPageOptions) => Promise<
    InfiniteQueryObserverResult<
      {
        results: CourseType[]
        nextCursor: number
      },
      unknown
    >
  >
  hasNextPage: boolean
}

export type Term = {
  term: 'fall' | 'winter' | 'summer'
  instructors: string[]
}

export type Note = {
  content: string
  links: Array<{ href: string; text: string }>
}

export type CourseType = {
  code: Uppercase<string>
  title: string
  faculty: string
  description: string
  department: string
  prerequisites: string[]
  credits: number
  notes: Note[]
  terms: Term[]
}

export type UserType = {
  id: string
  name: string
  email: string
  saved: string[] | null
  completed: string[] | null
  current: string[] | null
  degree?: DegreeCourse[]
}

export type SemesterType = 'fall' | 'winter' | 'summer'

export type DegreeCourse = {
  code: string
  title: string
  semester: SemesterType
  year: number
}

export type BlockType = { day: string; t1: number; t2: number }

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
  year: number
  semester: SemesterType
  code: Uppercase<string>
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

declare module 'public/full-data.json' {
  const value: CourseType[]
}

class Maybe<T> {
  _val: T
  ok: boolean

  constructor(val: T) {
    this._val = val
    this.ok = val === null || val === undefined ? true : false
  }

  static from<T>(val: T) {
    return new Maybe(val)
  }

  val(def: T) {
    return this._val ? this._val : def
  }

  map<U>(f: (val: T) => U): Maybe<U> {
    if (this._val === null || this._val === undefined) return new Maybe(null)

    return new Maybe(f(this._val))
  }
}
