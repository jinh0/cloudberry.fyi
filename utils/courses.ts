/**
 * /utils/courses.ts: Course list
 *
 * WARN: This is not to be non-chalantly imported in a component,
 * since it is ~6 MB of data, which is too much for a website to load
 * onto a client.
 */

import { CourseType } from '@typing'
import data from './course-data.json'

const courses = data as CourseType[]
export default courses
