import { useContext, useEffect, useState } from 'react'
import { Subject } from '@utils/subjects'
import SubjectsInput from './SubjectsInput'
import SelectedSubjects from './SelectedSubjects'
import SearchContext from '@contexts/SearchContext'

const SubjectsFilter = () => {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const { setSearch, search } = useContext(SearchContext)

  // Add new subject to search
  useEffect(() => {
    setSearch({
      ...search,
      subjects: subjects.map(x => x.code),
    })
  }, [setSearch, subjects])

  return (
    <>
      <SubjectsInput subjects={subjects} setSubjects={setSubjects} />
      <SelectedSubjects subjects={subjects} setSubjects={setSubjects} />
    </>
  )
}

export default SubjectsFilter
