import { VSBCourse } from '@typing'
import data from './vsb-info.json'

const vsbCourses = data as VSBCourse[]

export const NUM_TO_DAY = {
  2: 'Monday',
  3: 'Tuesday',
  4: 'Wednesday',
  5: 'Thursday',
  6: 'Friday',
  0: 'Saturday',
  1: 'Sunday',
}

export default vsbCourses
