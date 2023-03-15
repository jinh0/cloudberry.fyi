import useCourse from "@hooks/useCourse"
import Link from "next/link"


const CourseCard = ({ code }: { code: string }) => {
  const format = (code: string) => code?.replace('-', ' ').toUpperCase()

  const { data, isLoading } = useCourse(code)

  if (isLoading) {
    return (
      <div className='border rounded-lg p-2 mb-4'>
        <div className='w-full bg-gray-100 text-transparent select-none rounded-full animate-pulse'>
          XXX
        </div>
      </div>
    )
  }

  const course = data.result

  return (
    <Link href={`/courses/${code}`} className='flex flex-row gap-x-4 '>
      <div className='w-60 border rounded-lg p-2 px-4 flex-shrink-0 snap-start'>
        <p className='font-semibold'>{format(course.code)}</p>
        <p className=''>{course.name}</p>
      </div>
    </Link>
  )
}

export default CourseCard