import { VSBTime } from '@typing'
import { displayTime } from '@utils/formatting'

const Block = ({ block }: { block: VSBTime & { name: string } }) => {
  return (
    <div
      className='bg-pink-50 px-2 py-1 absolute w-full text-sm'
      style={{
        top: `${Math.floor(((block.t1 - 480) / 780) * 100)}%`,
        height: `${((block.t2 - block.t1) / 780) * 100}%`,
      }}
    >
      <div className='text-pink-700 font-bold'>{block.name}</div>
      <div className='text-pink-600'>
        {displayTime(block.t1)}{' '}
        <span className='hidden lg:inline-block'>
          &minus; {displayTime(block.t2)}
        </span>
      </div>
    </div>
  )
}

export default Block
