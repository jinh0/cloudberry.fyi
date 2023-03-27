import { VSBTime } from '@typing'
import { displayTime } from '@utils/formatting'
import { useContext } from 'react'
import { HeightContext } from './Timetable'

const Block = ({ block }: { block: VSBTime & { name: string } }) => {
  const { height } = useContext(HeightContext)

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

export default Block
