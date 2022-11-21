import subjectsData from '@utils/subjects.json'

export type Subject = {
  code: string
  title: string
}

const subjects: Subject[] = Object.entries(
  subjectsData as Record<string, string>
).map(([code, title]) => ({ code, title }))

export default subjects
