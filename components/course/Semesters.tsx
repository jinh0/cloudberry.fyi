import NotOffered from '@components/NotOffered'
import Semester from '@components/Semester'
import { Term } from '@typing'

const Semesters = ({ terms }: { terms: Term[] }) => {
  return (
    <div className='flex flex-col md:flex-row text-base flex-wrap gap-y-2'>
      {terms.length > 0 ? (
        terms.map((term, idx) => (
          <Semester key={idx} sem={term} showInstructor={true} />
        ))
      ) : (
        <NotOffered />
      )}
    </div>
  )
}

export default Semesters
