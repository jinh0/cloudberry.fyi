import subjectsData from '@utils/subjects.json'

export function capitalize(s: string) {
  return s.length === 0 ? '' : s[0].toUpperCase() + s.slice(1)
}

export function displayCode(code: string) {
  return code?.replace('-', ' ').toUpperCase()
}

export function range(year: number) {
  return `${year}-${year + 1}`
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

// Minutes -> 10:23 AM
export function displayTime(time: number) {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  return `${hours > 12 ? hours % 12 : hours}:${
    minutes < 10 ? '0' + String(minutes) : minutes
  } ${hours >= 12 ? 'PM' : 'AM'}`
}
