import { VSBBlock, VSBTime } from '@typing'

function Day({ name, blocks }: { name: string; blocks: VSBTime[] }) {
  return (
    <div className='w-full h-full border-l'>
      <div className='h-8 p-1 border-b text-center'>{name.slice(0, 3)}</div>
    </div>
  )
}

function WeeklyView({
  blocks,
  height,
}: {
  blocks: VSBBlock[]
  height: number
}) {
  return (
    <div
      className='border rounded-xl flex flex-row'
      style={{
        height: `${height}rem`,
      }}
    >
      <Day name='Monday' blocks={[]} />
      <Day name='Tuesday' blocks={[]} />
      <Day name='Wednesday' blocks={[]} />
      <Day name='Thursday' blocks={[]} />
      <Day name='Friday' blocks={[]} />
    </div>
  )
}

export default WeeklyView
