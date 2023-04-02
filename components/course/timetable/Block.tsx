import { VSBTime } from '@typing'
import { displayTime } from '@utils/formatting'

const Block = ({ block }: { block: VSBTime & { name: string } }) => {
  return (
    <div
      className='bg-pink-50 px-2 py-1 absolute w-full text-sm overflow-auto'
      style={{
        top: `${Math.floor(((block.t1 - 480) / 780) * 100)}%`,
        height: `${((block.t2 - block.t1) / 780) * 100}%`,
      }}
    >
      <div className='text-pink-700 font-bold'>{block.name}</div>
      {block.t2 - block.t1 > 50 && (
        <div className='text-pink-600 overflow-auto whitespace-nowrap'>
          {displayTime(block.t1)} &minus; {displayTime(block.t2)}
        </div>
      )}
    </div>
  )
}

export default Block
