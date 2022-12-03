import SemesterSelect from './filters/SemesterSelect'
import SubjectsFilter from './filters/SubjectsFilter'

const Filters = () => {
  return (
    <div className='flex flex-row'>
      {/* <SemesterSelect /> */}
      <SubjectsFilter />
    </div>
  )
}

export default Filters
