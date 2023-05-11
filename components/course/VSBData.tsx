import VSBContext from '@contexts/course/VSBContext'
import { SemesterType, VSBCourse } from '@typing'
import { useState } from 'react'
import Blocks from './Blocks'
import ScheduleHeader from './ScheduleHeader'
import Timetable from './timetable/Timetable'

const VSBData = ({
  year,
  vsbs,
}: {
  year: number
  vsbs: Array<{ year: number; semester: SemesterType; vsb: VSBCourse }>
}) => {
  const semesters = vsbs.map(x => x.semester)
  const [semester, setSemester] = useState<SemesterType>(
    semesters.length === 0 ? null : semesters[0]
  )

  const [comboNum, setComboNum] = useState(0)

  if (vsbs.length === 0 || semesters.length === 0) return <></>

  const foundVsb = vsbs.find(x => x.semester === semester)

  if (!foundVsb) return <></>

  const course = foundVsb.vsb

  if (!course.blocks || course.blocks.length === 0) return <></>

  return (
    <VSBContext.Provider
      value={{ course, comboNum, setComboNum, semester, setSemester }}
    >
      <div className='mt-12 mb-4 space-y-4'>
        <ScheduleHeader year={year} semesters={semesters} />
        <Timetable />
        <Blocks />
      </div>
    </VSBContext.Provider>
  )
}

export default VSBData
