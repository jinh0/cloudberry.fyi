import subjectsData from '@utils/subjects.json'

export function displayCode(code: string) {
  return code?.replace('-', ' ').toUpperCase()
}

export function formatDesc(desc: string, code: string) {
  const subject = subjectsData[code.toUpperCase().split('-')[0]] + ' : '

  return desc.slice(0, subject.length) === subject
    ? desc.slice(subject.length)
    : desc
}

export function linkCode(code: string) {
  return code.replace(' ', '-').toLowerCase()
}
