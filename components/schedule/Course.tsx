import { Palette, VSBFullCourse } from '@typing'
import { CURRENT_YEAR } from '@utils/constants'
import { displayCode } from '@utils/formatting'
import Link from 'next/link'

export default function Course({
  course,
  palette,
}: {
  course: VSBFullCourse
  palette: Palette
}) {
  return (
    <div className='first:border-t border-b py-4'>
      <div
        className='border-l-4'
        style={{
          borderLeftColor: palette.fg1,
        }}
      >
        <div className='pl-3'>
          <div className='text-lg mb-2 border-b border-transparent hover:border-black transition w-fit'>
            <Link
              href={`/study/${CURRENT_YEAR}-${
                CURRENT_YEAR + 1
              }/courses/${course.code.toLowerCase()}`}
            >
              <span className='font-bold pr-2'>{displayCode(course.code)}</span>
              <span>{course.title}</span>
            </Link>
          </div>
          <div>{course.description}</div>
        </div>
      </div>
    </div>
  )
}
