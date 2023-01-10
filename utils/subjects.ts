import subjectsData from '@utils/subjects.json'

export type Subject = {
  code: Uppercase<string>
  title: string
}

const subjects: Subject[] = Object.entries(
  subjectsData as Record<Uppercase<string>, string>
).map(([code, title]: [code: Uppercase<string>, title: string]) => ({
  code,
  title,
}))

export default subjects
