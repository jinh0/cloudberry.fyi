import VSBContext from '@contexts/course/VSBContext'
import { VSBBlock, VSBTime } from '@typing'
import { displayTime } from '@utils/formatting'
import Script from 'next/script'
import { createContext, useContext } from 'react'

const NUM_TO_DAY = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
}

const Block = ({ block }: { block: VSBTime & { name: string } }) => {
  const { height } = useContext(HeightContext)

  return (
    <div
      className='border rounded-lg relative'
      style={{
        top: `${Math.floor(((block.t2 - block.t1) / height) * 100)}%`,
      }}
    >
      <div>{block.name}</div>
      <div>
        {displayTime(block.t1)} - {displayTime(block.t2)}
      </div>
    </div>
  )
}

const Day = ({ num, blocks }: { num: number; blocks: VSBBlock[] }) => {
  const { height } = useContext(HeightContext)

  const todaysSchedule = blocks.flatMap(x =>
    x.schedule
      .filter(y => y.day === String(num + 1))
      .map(y => ({ ...y, name: x.display }))
  )

  return (
    <div className='w-1/5 h-full flex flex-col'>
      <div className='w-full text-center'>{NUM_TO_DAY[num][0]}</div>

      <div className={`w-full border flex-1`}>
        {todaysSchedule.map((x, idx) => (
          <Block key={idx} block={x} />
        ))}
      </div>
    </div>
  )
}

const HeightContext = createContext<{ height: number }>(null)

const Timetable = () => {
  const height = 400

  const { course, comboNum } = useContext(VSBContext)

  const chosen = course.blocks.filter(x =>
    course.combos[comboNum].includes(x.crn)
  )

  console.log(course, chosen)

  return (
    <HeightContext.Provider value={{ height }}>
      <div className={`w-full border flex flex-row text-base h-[400px]`}>
        <Day num={1} blocks={chosen} />
        <Day num={2} blocks={chosen} />
        <Day num={3} blocks={chosen} />
        <Day num={4} blocks={chosen} />
        <Day num={5} blocks={chosen} />
      </div>
    </HeightContext.Provider>
  )
}

export default Timetable
