import { VSBBlock, VSBTime } from '@typing'

const Schedule = ({ blocks }: { blocks: VSBBlock[] }) => {
  return (
    <div className='border rounded-xl h-[32rem] flex flex-row justify-evenly'>
      <ScheduleTime />
      <ScheduleBlocks blocks={blocks.flatMap(block => block.schedule)} />
    </div>
  )
}

const ScheduleTime = () => {
  return (
    <div className='flex flex-col pt-8 h-[30.5rem] justify-between'>
      <div>8:00</div>
      <div>9:00</div>
      <div>10:00</div>
      <div>11:00</div>
      <div>12:00</div>
      <div>1:00</div>
      <div>2:00</div>
      <div>3:00</div>
      <div>4:00</div>
      <div>5:00</div>
      <div>6:00</div>
    </div>
  )
}

const DayBody = ({ time }: { time?: VSBTime }) => {
  if (!time) return <></>

  return (
    <div className='h-full relative'>
      <div
        className={`bg-blue-500 text-white p-1 rounded-lg top-4 h-16 absolute w-full`}
      >
        <p>
          {minToStr(time.t1)} - {minToStr(time.t2)}
        </p>
      </div>
    </div>
  )
}

const Day = ({ name, block }: { name: string; block?: VSBTime }) => {
  return (
    <div className='w-full h-full border-l'>
      <div className='h-8 p-1 border-b text-center'>{name.slice(0, 3)}</div>
      <DayBody time={block} />
    </div>
  )
}

const ScheduleBlocks = ({ blocks }: { blocks: VSBTime[] }) => {
  return (
    <div className='flex flex-row w-full'>
      <Day name='Monday' block={blocks.find(block => block.day === '2')} />
      <Day name='Tuesday' block={blocks.find(block => block.day === '3')} />
      <Day name='Wednesday' block={blocks.find(block => block.day === '4')} />
      <Day name='Thursday' block={blocks.find(block => block.day === '5')} />
      <Day name='Friday' block={blocks.find(block => block.day === '6')} />
    </div>
  )
}

const minToStr = (time: number) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  return `${hours > 12 ? hours % 12 : hours}:${
    minutes < 10 ? '0' + String(minutes) : minutes
  } ${hours >= 12 ? 'PM' : 'AM'}`
}

export default Schedule
