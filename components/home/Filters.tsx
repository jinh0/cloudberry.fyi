import SemesterSelect from './filters/SemesterSelect'
import SubjectsFilter from './filters/SubjectsFilter'

const Filters = () => {
  return (
    <div className='flex flex-row flex-wrap gap-y-2'>
      {/* <SemesterSelect /> */}
      <SubjectsFilter />
    </div>
  )
}

export default Filters
