import Day from '@components/course/timetable/Day'
import TimeLegend from '@components/course/timetable/TimeLegend'
import { VSBFullCourse } from '@typing'

export default function Timetable({ courses }: { courses: VSBFullCourse[] }) {
  const blocks = courses.flatMap(course =>
    course.blocks.map(x => ({ ...x, palette: course.palette }))
  )

  return (
    <div className={`w-full flex flex-row text-base h-[600px]`}>
      <TimeLegend />

      <Day num={1} blocks={blocks} />
      <Day num={2} blocks={blocks} />
      <Day num={3} blocks={blocks} />
      <Day num={4} blocks={blocks} />
      <Day num={5} blocks={blocks} />
    </div>
  )
}
