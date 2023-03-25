import Margin from '@components/Margin'
import VSBContext from '@contexts/course/VSBContext'
import useVSB from '@hooks/useVSB'
import { VSBCourse } from '@typing'
import { useState } from 'react'
import Blocks from './Blocks'
import ScheduleHeader from './ScheduleHeader'
import Timetable from './timetable/Timetable'

const VSBData = ({ vsb }: { vsb: VSBCourse }) => {
  const { course } = useVSB(vsb)
  const [comboNum, setComboNum] = useState(0)

  if (!vsb || !course.blocks || course.blocks.length === 0) return <></>

  return (
    <VSBContext.Provider value={{ course, comboNum, setComboNum }}>
      <div className='mt-12 mb-4'>
        <ScheduleHeader />
        <Margin y={4} />
        <Timetable />
        <Margin y={4} />
        <Blocks />
      </div>
    </VSBContext.Provider>
  )
}

export default VSBData
