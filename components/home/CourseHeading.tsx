import Link from 'next/link'

const CourseHeading = ({ code, name }) => {
  return (
    <Link href={`/courses/${code.replace(' ', '-').toLowerCase()}`}>
      <div className='mb-4 flex flex-row items-center'>
        <h1 className='text-2xl cursor-pointer w-full'>
          <span className='font-semibold mr-2'>{code.replace('-', ' ')}</span>
          <span className=''>{name}</span>
        </h1>
      </div>
    </Link>
  )
}

export default CourseHeading
