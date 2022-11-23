import { BlockType, Safe, VSBType } from '@typing'

const minToStr = (time: number) => {
  const hours = Math.floor(time / 60)
  const minutes = time % 60

  return `${hours > 12 ? hours % 12 : hours}:${
    minutes < 10 ? '0' + String(minutes) : minutes
  } ${hours >= 12 ? 'PM' : 'AM'}`
}

const Block = ({ day, t1, t2 }: BlockType) => {
  const dayNumToWord = {
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday',
    7: 'Sunday',
  }

  return (
    <div>
      <span className=''>{dayNumToWord[day]}:</span> {minToStr(t1)} -{' '}
      {minToStr(t2)}
    </div>
  )
}

const VSBData = ({ data }: { data: Safe<VSBType> }) => {
  if (!data.isOk) return <></>

  const course = data.result

  return (
    <div className='mt-4'>
      <p>
        <span className='font-bold'>Location:</span> {course.location}
      </p>
      <p>
        {course.remainingSeats} {course.remainingSeats === 1 ? 'seat' : 'seats'}{' '}
        remaining
        {course.waitlistCap === 0 && '; there is no waitlist for this course.'}
      </p>

      <div className='mt-2'>
        {course.schedule.map((block, idx) => (
          <Block key={idx} {...block} />
        ))}
      </div>
    </div>
  )
}

export default VSBData
