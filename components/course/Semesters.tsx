import NotOffered from '@components/NotOffered'
import Semester from '@components/Semester'
import { Term } from '@typing'

const Semesters = ({ terms, year }: { terms: Term[]; year: number }) => {
  return (
    <div className='flex flex-col md:flex-row text-base flex-wrap gap-y-2'>
      {terms.length > 0 ? (
        terms.map((term, idx) => (
          <Semester key={idx} sem={term} showInstructor={true} year={year} />
        ))
      ) : (
        <NotOffered />
      )}
    </div>
  )
}

export default Semesters
