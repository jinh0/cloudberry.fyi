import { range } from './formatting'

export function courseLink(year: number, code: string) {
  return `/study/${range(year)}/courses/${code}`
}
