const TimeLegend = () => {
  return (
    <div className='flex flex-col pr-1 text-gray-500'>
      <div className='w-full text-center text-transparent'>12:00</div>
      <div className='relative h-full top-0'>
        {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((x, idx) => (
          <div
            key={idx}
            style={{
              top: `${(idx / 13) * 100}%`,
            }}
            className='absolute w-fit -mt-3'
          >
            {x}:00
          </div>
        ))}
      </div>
    </div>
  )
}

export default TimeLegend
