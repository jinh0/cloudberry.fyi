import { CourseType } from '@typing'
import data from './courses.json'

const courses = data as unknown as CourseType[]

export const find = (code: string) => courses.find(x => x.code === code)