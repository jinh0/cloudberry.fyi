import VSBContext from '@contexts/course/VSBContext'
import TimeLegend from './TimeLegend'
import Day from './Day'
import { createContext, useContext } from 'react'
import { COURSE_COLORS } from '@utils/colors'

const Timetable = () => {
  const { course, comboNum } = useContext(VSBContext)

  const chosen = course.blocks
    .filter(x => course.combos[comboNum].includes(x.crn))
    .map(x => ({ ...x, palette: COURSE_COLORS[0] }))

  return (
    <div className={`w-full flex flex-row text-base h-[500px]`}>
      <TimeLegend />

      <Day num={1} blocks={chosen} />
      <Day num={2} blocks={chosen} />
      <Day num={3} blocks={chosen} />
      <Day num={4} blocks={chosen} />
      <Day num={5} blocks={chosen} />
    </div>
  )
}

export default Timetable
