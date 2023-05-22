import { Palette, VSBTime } from '@typing'
import { displayTime } from '@utils/formatting'

const Block = ({
  block,
}: {
  block: VSBTime & { name: string } & { palette: Palette }
}) => {
  return (
    <div
      className='px-2 py-1 absolute w-full text-sm overflow-auto'
      style={{
        top: `${Math.floor(((block.t1 - 480) / 780) * 100)}%`,
        height: `${((block.t2 - block.t1) / 780) * 100}%`,
        backgroundColor: block.palette.bg,
      }}
    >
      <div className='font-bold' style={{ color: block.palette.fg1 }}>
        {block.name}
      </div>
      {block.t2 - block.t1 > 50 && (
        <div className='overflow-auto' style={{ color: block.palette.fg2 }}>
          {displayTime(block.t1)} &minus; {displayTime(block.t2)}
        </div>
      )}
    </div>
  )
}

export default Block
