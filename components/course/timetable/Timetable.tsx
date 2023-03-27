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

  console.log('height', Math.floor(((block.t2 - block.t1) / 720) * 100))
  console.log(block.t2, block.t1)

  return (
    <div
      className='bg-pink-50 px-2 py-1 absolute w-full text-sm'
      style={{
        top: `${Math.floor(((block.t1 - 480) / 780) * 100)}%`,
        height: `${((block.t2 - block.t1) / 780) * 100}%`,
      }}
    >
      <div className='text-pink-700 font-bold'>{block.name}</div>
      <div className='text-pink-500'>
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

      <div
        className={`w-full border-r flex-1 relative
      `}
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            #ffffff 0%,
            #ffffff ${100 / 13 - 0.2}%,
            #eeeeee ${100 / 13 - 0.2}%,
            #eeeeee ${100 / 13}%
          )`,
        }}
      >
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
      <div className={`w-full flex flex-row text-base h-[500px]`}>
        <div className='flex flex-col pr-1 text-gray-500'>
          <div className='w-full text-center text-transparent'>12:00</div>
          <div className='relative h-full top-0'>
            {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(
              (x, idx) => (
                <div
                  key={idx}
                  style={{
                    top: `${(idx / 13) * 100}%`,
                  }}
                  className='absolute w-fit -mt-3'
                >
                  {x}:00
                </div>
              )
            )}
          </div>
        </div>

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
