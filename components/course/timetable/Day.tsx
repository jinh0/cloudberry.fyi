import { Palette, VSBBlock } from '@typing'
import Block from './Block'

const NUM_TO_DAY = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
}

const Day = ({
  num,
  blocks,
}: {
  num: number
  blocks: Array<VSBBlock & { palette: Palette }>
}) => {
  const todaysSchedule = blocks.flatMap(x =>
    x.schedule
      .filter(y => y.day === String(num + 1))
      .map(y => ({ ...y, name: x.display, palette: x.palette }))
  )

  return (
    <div className='w-1/5 h-full flex flex-col'>
      <div className='w-full text-center'>{NUM_TO_DAY[num][0]}</div>

      <div
        className='w-full border-r flex-1 relative'
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

export default Day
