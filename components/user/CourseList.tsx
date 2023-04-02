import CourseCard from './CourseCard'

const CourseList = ({ courses, name }: { courses: string[]; name: string }) => {
  return (
    <>
      <div className='mt-8'>
        <p className='text-2xl mb-4'>{name} Courses</p>

        {courses.length > 0 ? (
          <div className='flex flex-row gap-x-4 overflow-x-auto snap-x snap-mandatory'>
            {courses &&
              courses.map(code => (
                <CourseCard key={code + '-' + name} code={code} />
              ))}
          </div>
        ) : (
          <div>Nothing here.</div>
        )}
      </div>
    </>
  )
}

export default CourseList
